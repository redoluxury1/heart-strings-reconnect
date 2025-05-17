
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

  // Simplified login function with basic retry logic and better debugging
  const attemptDevModeLogin = async (
    email: string, 
    password: string, 
    signInFunction: (email: string, password: string) => Promise<{ error: any | null }>
  ): Promise<boolean> => {
    try {
      console.log("Starting dev mode login attempt for:", email);
      
      // First attempt
      const { error } = await signInFunction(email, password);
      
      if (!error) {
        console.log("Login successful on first attempt!");
        return true;
      }
      
      console.log("First login attempt failed:", error.message);
      
      // Provide detailed error message
      let errorMessage = "Initial login attempt failed";
      if (error.message.includes("Invalid login credentials")) {
        errorMessage += ": Email or password doesn't match our records";
      }
      
      toast({
        title: errorMessage,
        description: "Waiting briefly before trying again...",
      });
      
      // Wait and try again
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Second attempt
      console.log("Attempting second login try for:", email);
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
      console.error("Dev mode login failed:", error);
      return false;
    }
  };

  return { isLoading, setIsLoading, attemptDevModeLogin };
};
