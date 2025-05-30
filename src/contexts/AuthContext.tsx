
import React, { useState, useEffect, useContext, createContext } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../integrations/supabase/client';

interface AuthContextProps {
  user: User | null;
  relationship: Relationship | null;
  loading: boolean;
  signIn: (email: string, password?: string) => Promise<{ error: any; data?: any }>;
  signUp: (email: string, password?: string, name?: string, disableEmailConfirmation?: boolean) => Promise<{ error: any; data?: any }>;
  signOut: () => Promise<void>;
  updateUserMetadata: (metadata: any) => Promise<void>;
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
  updateUserMetadata: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [relationship, setRelationship] = useState<Relationship | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext - initializing auth state check");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("AuthContext - auth state change:", event, { session: !!session });
        
        if (session?.user) {
          setUser(session.user);
          // Load relationship data in background - don't wait for it
          loadUserRelationship(session.user.id);
        } else {
          setUser(null);
          setRelationship(null);
        }
        
        // CRITICAL: Always set loading to false after we know the auth state
        console.log("AuthContext - setting loading to false after auth state change");
        setLoading(false);
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
          // Load relationship data in background - don't wait for it
          loadUserRelationship(session.user.id);
        }
      } catch (error) {
        console.error("Error in auth initialization:", error);
      } finally {
        // CRITICAL: Always set loading to false after initial check
        console.log("AuthContext - setting loading to false after initial auth check");
        setLoading(false);
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
      console.log("AuthContext - attempting sign in for:", email, "with password:", !!password);
      
      if (password) {
        // Email/password login
        const { error, data } = await supabase.auth.signInWithPassword({ 
          email, 
          password 
        });
        
        if (error) {
          console.error("Sign in error:", error);
          
          // Provide more specific error messaging
          if (error.message.includes("email not confirmed")) {
            return { 
              error: {
                ...error,
                message: "Please check your email and click the confirmation link before logging in. If you don't see it, check your spam folder."
              }
            };
          }
        }
        
        console.log("Sign in result:", { error: !!error, data: !!data });
        return { error, data };
      } else {
        // Magic link login
        console.log("Sending magic link to:", email);
        const { error } = await supabase.auth.signInWithOtp({ email });
        if (error) {
          console.error("Magic link error:", error);
          return { error };
        }
        alert('Check your email for the magic link to sign in.');
        return { error: null };
      }
    } catch (error: any) {
      console.error("Sign in exception:", error);
      return { error };
    }
  };

  const signUp = async (email: string, password?: string, name?: string, disableEmailConfirmation: boolean = false) => {
    try {
      console.log("AuthContext - attempting sign up for:", email, "with name:", name, "disable email:", disableEmailConfirmation);
      
      const signUpData: any = { 
        email,
        options: {}
      };
      
      if (password) signUpData.password = password;
      if (name) signUpData.options.data = { name };
      
      // If we want to disable Supabase's email confirmation and use our custom system
      if (disableEmailConfirmation) {
        // Set a custom redirect URL that won't be used, effectively disabling Supabase emails
        signUpData.options.emailRedirectTo = `${window.location.origin}/auth/verify`;
      }
      
      const { error, data } = await supabase.auth.signUp(signUpData);
      
      if (error) {
        console.error("Sign up error:", error);
      } else {
        console.log("Sign up successful:", { 
          user: !!data.user, 
          session: !!data.session,
          needsConfirmation: !data.session && data.user && !data.user.email_confirmed_at
        });
      }
      
      return { error, data };
    } catch (error: any) {
      console.error("Sign up exception:", error);
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

  const updateUserMetadata = async (metadata: any) => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: metadata
      });
      
      if (error) {
        console.error("Error updating user metadata:", error);
        throw error;
      }
    } catch (error: any) {
      console.error('Error updating user metadata:', error.message);
      throw error;
    }
  };

  const value: AuthContextProps = {
    user,
    relationship,
    loading,
    signIn,
    signUp,
    signOut,
    updateUserMetadata,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
