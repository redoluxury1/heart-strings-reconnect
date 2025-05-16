
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

  // Helper function to attempt login with exponential backoff
  const attemptDevModeLogin = async (
    email: string, 
    password: string, 
    signInFunction: (email: string, password: string) => Promise<{ error: any | null }>
  ): Promise<boolean> => {
    try {
      const maxAttempts = 3;
      const delay = (attempt: number) => Math.min(2000 * Math.pow(2, attempt), 10000); // Exponential backoff capped at 10 seconds
      
      console.log("Starting dev mode login sequence");
      
      for (let attempt = 0; attempt < maxAttempts; attempt++) {
        console.log(`Dev mode login attempt ${attempt + 1} of ${maxAttempts}`);
        
        const { error } = await signInFunction(email, password);
        
        if (!error) {
          console.log("Dev mode login successful!");
          return true;
        }
        
        console.log(`Dev mode login attempt ${attempt + 1} failed:`, error.message);
        
        if (attempt < maxAttempts - 1) {
          const waitTime = delay(attempt);
          toast({
            title: `Login attempt ${attempt + 1} failed`,
            description: `Retrying in ${waitTime / 1000} seconds...`,
          });
          
          // Wait and try again
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }
      }
      
      throw new Error("Maximum login attempts reached");
    } catch (error: any) {
      console.error("Dev mode login failed after multiple attempts:", error);
      return false;
    }
  };

  return { isLoading, setIsLoading, attemptDevModeLogin };
};
