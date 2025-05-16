
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-16">
        <ContentContainer>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-cormorant font-bold text-[#1E2A38] mb-8">Privacy Policy</h1>
            
            <div className="prose prose-slate max-w-none">
              <p className="text-lg mb-6">
                Last Updated: May 16, 2025
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We collect information to provide better services to all our users. The types of information we collect include:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Information you provide to us (such as your name, email address, etc.)</li>
                <li>Information we get from your use of our services</li>
                <li>Information provided by your partner (with your consent)</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Information</h2>
              <p className="mb-4">
                We use the information we collect to provide, maintain, protect and improve our services, 
                to develop new ones, and to protect Bridge For Couples and our users. We also use this 
                information to offer you tailored content – like giving you more relevant relationship insights.
              </p>
              
              <h2 className="text-2xl font-semibold mb-4">3. Information We Share</h2>
              <p className="mb-4">
                We do not share personal information with companies, organizations and individuals outside of 
                Bridge For Couples unless one of the following circumstances applies:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>With your consent</li>
                <li>For external processing</li>
                <li>For legal reasons</li>
              </ul>
              
              <h2 className="text-2xl font-semibold mb-4">4. Information Security</h2>
              <p className="mb-4">
                We work hard to protect Bridge For Couples and our users from unauthorized access to or 
                unauthorized alteration, disclosure or destruction of information we hold. In particular:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>We encrypt many of our services using SSL</li>
                <li>We review our information collection, storage and processing practices, including physical security measures, to guard against unauthorized access to systems</li>
                <li>We restrict access to personal information to Bridge For Couples employees, contractors and agents who need to know that information in order to process it for us, and who are subject to strict contractual confidentiality obligations</li>
              </ul>
            </div>
            
            <div className="mt-10 text-center">
              <Link to="/auth">
                <Button className="rounded-full bg-[#1E2A38] hover:bg-[#1E2A38]/90 text-white">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        </ContentContainer>
      </main>
      
      <Footer showCTA={false} />
    </div>
  );
};

export default Privacy;
