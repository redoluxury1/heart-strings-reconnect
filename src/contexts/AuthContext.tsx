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
    
    let initialLoadComplete = false;
    
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("AuthContext - auth state change:", event, { session: !!session });
        
        if (session?.user) {
          setUser(session.user);
          // Load relationship data but don't let it block the loading state
          try {
            await loadUserRelationship(session.user.id);
          } catch (error) {
            console.error("Error loading relationship in auth state change:", error);
          }
        } else {
          setUser(null);
          setRelationship(null);
        }
        
        // Only set loading to false if this isn't the initial load
        if (initialLoadComplete) {
          setLoading(false);
        }
      }
    );

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log("AuthContext - getSession completed", { session: !!session, error });
        
        if (error) {
          console.error("Error getting session:", error);
        } else if (session?.user) {
          setUser(session.user);
          try {
            await loadUserRelationship(session.user.id);
          } catch (error) {
            console.error("Error loading relationship in initialization:", error);
          }
        }
      } catch (error) {
        console.error("Error in auth initialization:", error);
      } finally {
        // Mark initial load as complete and set loading to false
        initialLoadComplete = true;
        setLoading(false);
        console.log("AuthContext - initial auth load complete, loading set to false");
      }
    };

    initializeAuth();

    return () => subscription.unsubscribe();
  }, []);

  const loadUserRelationship = async (userId: string) => {
    console.log("AuthContext - loading user relationship for:", userId);
    
    try {
      const { data, error } = await supabase
        .from('relationships')
        .select('*')
        .or(`user_id.eq.${userId},partner_id.eq.${userId}`)
        .maybeSingle();

      console.log("AuthContext - relationship query result", { data: !!data, error });

      if (error) {
        console.error("Error loading relationship:", error);
        return;
      }
      
      if (data) {
        // Map the database relationship to our interface
        const mappedRelationship: Relationship = {
          id: data.id,
          partner1_id: data.user_id,
          partner2_id: data.partner_id,
          status: data.status,
          created_at: data.created_at
        };
        setRelationship(mappedRelationship);
      } else {
        setRelationship(null);
      }
    } catch (error) {
      console.error("Error in loadUserRelationship:", error);
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
