
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ContentContainer from '@/components/common/ContentContainer';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
}

const AuthLayout = ({ children, title, description }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-16">
        <ContentContainer>
          <div className="max-w-md mx-auto">
            <Card className="border-2 border-[#D36B4B]/20 shadow-lg">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="font-cormorant text-3xl text-[#1E2A38]">
                  {title}
                </CardTitle>
                
                <CardDescription className="text-[#1E2A38]/80 text-base">
                  {description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                {/* Form content will be injected here */}
                {children}
              </CardContent>
              
              <CardFooter className="flex justify-center text-xs text-center text-[#1E2A38]/60 px-6">
                By continuing, you agree to our <Link to="/terms" className="underline hover:text-[#D36B4B]">Terms of Service</Link> and <Link to="/privacy" className="underline hover:text-[#D36B4B]">Privacy Policy</Link>
              </CardFooter>
            </Card>
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default AuthLayout;
