
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { getProfile, getRelationship, createRelationship } from '@/services/supabase';
import type { UserProfile, Relationship } from '@/types/relationship';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  relationship: Relationship | null;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any | null, data: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any | null }>;
  signOut: () => Promise<void>;
  loading: boolean;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile | null>>;
  setRelationship: React.Dispatch<React.SetStateAction<Relationship | null>>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session ? "Session exists" : "No session");
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session) {
          setProfile(null);
          setRelationship(null);
        } else if (session.user) {
          // Use setTimeout to prevent potential deadlocks with Supabase auth
          setTimeout(() => {
            loadUserData(session.user.id);
          }, 0);
        }
      }
    );

    // Then fetch initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Initial session check:", session ? "Session exists" : "No session");
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        loadUserData(session.user.id);
      } else {
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // When the user changes, load their profile and relationship data
  const loadUserData = async (userId: string) => {
    console.log("Loading user data for:", userId);
    setLoading(true);
    
    try {
      // Load user profile
      const userProfile = await getProfile(userId);
      console.log("User profile loaded:", userProfile);
      setProfile(userProfile);
      
      // Load or create relationship
      let userRelationship = await getRelationship(userId);
      
      if (!userRelationship) {
        console.log("No relationship found, creating one");
        // Create new relationship if user doesn't have one
        userRelationship = await createRelationship(userId);
      }
      
      console.log("Relationship data:", userRelationship);
      setRelationship(userRelationship);
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    console.log("Signing up user:", email);
    const response = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        // Set data that will be accessible in the user meta data
        data: {
          name: name || email.split('@')[0], // Use provided name or fallback to email prefix
        }
      }
    });
    
    console.log("Signup response:", response.error ? "Error" : "Success");
    return response;
  };

  const signIn = async (email: string, password: string) => {
    console.log("Signing in user:", email);
    const response = await supabase.auth.signInWithPassword({ email, password });
    console.log("Sign in response:", response.error ? "Error" : "Success");
    return response;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    profile,
    relationship,
    signUp,
    signIn,
    signOut,
    loading,
    setProfile,
    setRelationship,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
