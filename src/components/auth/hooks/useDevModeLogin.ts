
import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

type DevModeLoginResult = {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  attemptDevModeLogin: (
    email: string, 
    password: string, 
    signInFunction: (email: string, password: string) => Promise<{ error: any | null }>
  ) => Promise<boolean>;
};

export const useDevModeLogin = (): DevModeLoginResult => {
  const [isLoading, setIsLoading] = useState(false);

  // Simplified login function with basic retry logic
  const attemptDevModeLogin = async (
    email: string, 
    password: string, 
    signInFunction: (email: string, password: string) => Promise<{ error: any | null }>
  ): Promise<boolean> => {
    try {
      console.log("Starting login attempt for:", email);
      
      // First attempt
      const { error } = await signInFunction(email, password);
      
      if (!error) {
        console.log("Login successful on first attempt!");
        return true;
      }
      
      console.log("First login attempt failed:", error.message);
      
      // Wait 2 seconds before second attempt
      toast({
        title: "Initial login attempt failed",
        description: "Waiting briefly before trying again...",
      });
      
      // Wait and try again
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Second attempt
      const secondAttempt = await signInFunction(email, password);
      
      if (!secondAttempt.error) {
        console.log("Login successful on second attempt!");
        return true;
      }
      
      console.log("Second login attempt also failed:", secondAttempt.error.message);
      toast({
        title: "Login failed",
        description: "Could not log in automatically. Please try logging in manually.",
        variant: "destructive"
      });
      
      return false;
    } catch (error: any) {
      console.error("Login failed:", error);
      return false;
    }
  };

  return { isLoading, setIsLoading, attemptDevModeLogin };
};
