
import React, { useState, useEffect, useContext, createContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';

interface AuthContextProps {
  user: User | null;
  relationship: Relationship | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: any; data?: any }>;
  signUp: (email: string, password?: string, name?: string) => Promise<{ error: any; data?: any }>;
  signOut: () => Promise<void>;
}

interface Relationship {
  id: string;
  partner1_id: string;
  partner2_id: string;
  status: string;
  created_at: string;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  relationship: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null }),
  signOut: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext - initializing auth state check");
    const startTime = Date.now();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      const loadTime = Date.now() - startTime;
      console.log(`AuthContext - getSession completed in ${loadTime}ms`, { session: !!session, error });
      
      if (error) {
        console.error("Error getting session:", error);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        setUser(session.user);
        loadUserRelationship(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("AuthContext - auth state change:", event, { session: !!session });
        
        if (session?.user) {
          setUser(session.user);
          await loadUserRelationship(session.user.id);
        } else {
          setUser(null);
          setRelationship(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserRelationship = async (userId: string) => {
    console.log("AuthContext - loading user relationship for:", userId);
    const relationshipStartTime = Date.now();
    
    try {
      const { data, error } = await supabase
        .from('relationships')
        .select('*')
        .or(`partner1_id.eq.${userId},partner2_id.eq.${userId}`)
        .maybeSingle();

      const relationshipLoadTime = Date.now() - relationshipStartTime;
      console.log(`AuthContext - relationship loaded in ${relationshipLoadTime}ms`, { data: !!data, error });

      if (error) {
        console.error("Error loading relationship:", error);
      } else if (data) {
        // Map the database relationship to our interface
        const mappedRelationship: Relationship = {
          id: data.id,
          partner1_id: data.user_id || data.partner1_id,
          partner2_id: data.partner_id || data.partner2_id,
          status: data.status,
          created_at: data.created_at
        };
        setRelationship(mappedRelationship);
      }
    } catch (error) {
      console.error("Error in loadUserRelationship:", error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password?: string) => {
    try {
      if (password) {
        // Email/password login
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        return { error, data };
      } else {
        // Magic link login
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) return { error };
        alert('Check your email for the magic link to sign in.');
        return { error: null };
      }
    } catch (error: any) {
      return { error };
    }
  };

  const signUp = async (email: string, password?: string, name?: string) => {
    try {
      const signUpData: any = { email };
      if (password) signUpData.password = password;
      if (name) signUpData.options = { data: { name } };
      
      const { error, data } = await supabase.auth.signUp(signUpData);
      return { error, data };
    } catch (error: any) {
      return { error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      console.error('Error signing out:', error.message);
    }
  };

  const value: AuthContextProps = {
    user,
    relationship,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
