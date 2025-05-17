
import React, { createContext, useState, useEffect, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';
import { getProfile, getRelationship } from '../services/supabase';
import type { UserProfile, Relationship } from '@/types/relationship';
import { getCoupleByUserId } from '../services/couples';
import { getUserMeta } from '../services/userMeta';
import type { Couple, UserMeta } from '@/types/couple';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  relationship: Relationship | null;
  couple: Couple | null;
  userMeta: UserMeta | null;
  loading: boolean;
  signUp: (email: string, password: string, name?: string) => Promise<{ error: Error | null, data: any }>;
  signIn: (email: string, password: string) => Promise<{ error: Error | null, data: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: Error | null, data: any }>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [couple, setCouple] = useState<Couple | null>(null);
  const [userMeta, setUserMeta] = useState<UserMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up the auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await loadUserData(currentSession.user.id);
      } else {
        // Clear all user-related state when signing out
        setProfile(null);
        setRelationship(null);
        setCouple(null);
        setUserMeta(null);
      }
    });

    // Check if user is already signed in
    supabase.auth.getSession().then(async ({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        await loadUserData(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const loadUserData = async (userId: string) => {
    // Load user profile
    const userProfile = await getProfile(userId);
    setProfile(userProfile);

    // Load relationship data
    const userRelationship = await getRelationship(userId);
    setRelationship(userRelationship);

    // Load couple data if user is part of a couple
    if (userProfile?.couple_id) {
      const coupleData = await getCoupleByUserId(userId);
      setCouple(coupleData);
    }

    // Load user meta
    const meta = await getUserMeta(userId);
    setUserMeta(meta);
  };

  // Sign up function
  const signUp = async (email: string, password: string, name?: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          usage_mode: 'solo',  // Default to solo mode
          role: 'individual'    // Default to individual role
        }
      }
    });
    
    return { data, error };
  };

  // Sign in function
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    return { data, error };
  };

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Reset password function
  const resetPassword = async (email: string) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password',
    });
    
    return { data, error };
  };

  // Update profile function
  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      const updatedProfile = await updateProfile(user.id, updates);
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const value = {
    user,
    session,
    profile,
    relationship,
    couple,
    userMeta,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
