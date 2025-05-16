
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

  // Simplified login function with clearer logging and more effective retry strategy
  const attemptDevModeLogin = async (
    email: string, 
    password: string, 
    signInFunction: (email: string, password: string) => Promise<{ error: any | null }>
  ): Promise<boolean> => {
    try {
      const maxAttempts = 3; // Reduced to 3 attempts to avoid overloading
      const baseDelay = 2000; // Start with 2 seconds
      
      console.log("Starting login attempt for:", email);
      
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        console.log(`Login attempt ${attempt + 1} of ${maxAttempts}`);
        
        const { error } = await signInFunction(email, password);
        
        if (!error) {
          console.log("Login successful!");
          return true;
        }
        
        console.log(`Login attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt < maxAttempts - 1) {
          const waitTime = baseDelay * (attempt + 1); // Simple linear increase
          toast({
            title: `Login attempt ${attempt + 1} failed`,
            description: `Retrying in ${Math.round(waitTime / 1000)} seconds...`,
          });
          
          // Wait and try again
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
      
      throw new Error("Maximum login attempts reached");
    } catch (error: any) {
      console.error("Login failed after multiple attempts:", error);
      return false;
    }
  };

  return { isLoading, setIsLoading, attemptDevModeLogin };
};
