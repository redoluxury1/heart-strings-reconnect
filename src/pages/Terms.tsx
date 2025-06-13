
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ContentContainer from '../components/common/ContentContainer';
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="min-h-screen bg-[#FAF6F1] flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-8 md:py-16">
        <ContentContainer>
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-cormorant font-bold text-[#1E2A38] mb-8">Terms of Service</h1>
            
            <div className="prose prose-slate max-w-none space-y-6">
              <p className="text-lg mb-6">
                <strong>Last Updated:</strong> December 13, 2024
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm">
                  <strong>Service Provider:</strong><br />
                  Matthew Bridges<br />
                  Email: hello@bridgeforcouples.com<br />
                  These terms govern your use of the Bridge For Couples application and services.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                <p className="mb-4">
                  By downloading, installing, or using the Bridge For Couples application ("Service"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, do not use our Service.
                </p>
                <p className="mb-4">
                  These Terms constitute a legally binding agreement between you and Matthew Bridges ("we," "us," or "our").
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
                <p className="mb-4">
                  Bridge For Couples is a relationship enhancement application that provides tools, assessments, and resources to help couples improve their communication and strengthen their relationships. Our Service includes:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Relationship assessment tools and quizzes</li>
                  <li>Communication improvement exercises</li>
                  <li>Conflict resolution tools</li>
                  <li>Personal journaling features</li>
                  <li>Educational content and insights</li>
                  <li>Progress tracking and analytics</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Eligibility and Account Registration</h2>
                <p className="mb-4">
                  You must be at least 17 years old to use our Service. By using our Service, you represent and warrant that you meet this age requirement.
                </p>
                <p className="mb-4">
                  You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Subscription Terms and Billing</h2>
                
                <h3 className="text-xl font-medium mb-3">Subscription Plans</h3>
                <p className="mb-4">Bridge For Couples offers premium subscription plans with access to advanced features. Subscription details and pricing are displayed in the app and on our website.</p>

                <h3 className="text-xl font-medium mb-3">Payment and Billing</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Subscriptions are processed through the App Store (iOS) or Google Play Store (Android)</li>
                  <li>Payment will be charged to your App Store or Google Play account</li>
                  <li>Subscriptions automatically renew unless canceled at least 24 hours before the end of the current period</li>
                  <li>Your account will be charged for renewal within 24 hours prior to the end of the current period</li>
                  <li>You can manage and cancel subscriptions through your App Store or Google Play account settings</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Free Trials</h3>
                <p className="mb-4">Free trials, if offered, will automatically convert to paid subscriptions unless canceled before the trial period ends. You can cancel anytime during the free trial period without charge.</p>

                <h3 className="text-xl font-medium mb-3">Refunds</h3>
                <p className="mb-4">Refund requests are subject to the App Store or Google Play Store refund policies. We do not provide direct refunds for subscriptions purchased through these platforms.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. User Conduct and Acceptable Use</h2>
                <p className="mb-4">You agree not to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Use the Service for any unlawful purpose or in violation of these Terms</li>
                  <li>Share your account credentials with others</li>
                  <li>Attempt to reverse engineer, decompile, or hack the Service</li>
                  <li>Upload or transmit harmful, offensive, or inappropriate content</li>
                  <li>Interfere with or disrupt the Service or servers</li>
                  <li>Use automated systems to access the Service</li>
                  <li>Violate any applicable laws or regulations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Content and Intellectual Property</h2>
                
                <h3 className="text-xl font-medium mb-3">Our Content</h3>
                <p className="mb-4">The Service and its content, including but not limited to text, graphics, images, assessments, and software, are owned by Matthew Bridges and are protected by copyright, trademark, and other intellectual property laws.</p>

                <h3 className="text-xl font-medium mb-3">Your Content</h3>
                <p className="mb-4">You retain ownership of any content you create or upload to the Service ("User Content"). By using the Service, you grant us a limited, non-exclusive license to use, store, and process your User Content solely to provide the Service to you.</p>

                <h3 className="text-xl font-medium mb-3">License to Use</h3>
                <p className="mb-4">We grant you a limited, non-exclusive, non-transferable license to use the Service for personal, non-commercial purposes in accordance with these Terms.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Privacy</h2>
                <p className="mb-4">
                  Your privacy is important to us. Our <Link to="/privacy" className="text-[#D36B4B] hover:underline">Privacy Policy</Link> explains how we collect, use, and protect your personal information. By using our Service, you agree to our privacy practices as described in the Privacy Policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Professional Disclaimer</h2>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <p className="font-semibold mb-2">IMPORTANT DISCLAIMER:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Bridge For Couples is NOT a substitute for professional therapy, counseling, or medical advice</li>
                    <li>Our Service provides educational tools and resources for relationship improvement</li>
                    <li>If you are experiencing serious relationship problems, domestic violence, or mental health issues, please seek professional help immediately</li>
                    <li>We are not licensed therapists, counselors, or medical professionals</li>
                    <li>The content provided is for informational purposes only</li>
                  </ul>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. Service Availability and Modifications</h2>
                <p className="mb-4">
                  We strive to maintain the Service but do not guarantee continuous, uninterrupted access. We may:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Suspend or discontinue the Service at any time</li>
                  <li>Modify features, functionality, or pricing</li>
                  <li>Perform maintenance that may temporarily limit access</li>
                  <li>Update these Terms with reasonable notice</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
                <p className="mb-4">
                  Either party may terminate your access to the Service at any time:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>You may delete your account and stop using the Service</li>
                  <li>We may suspend or terminate your account for violations of these Terms</li>
                  <li>Upon termination, your right to use the Service ceases immediately</li>
                  <li>We may delete your account data in accordance with our Privacy Policy</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Disclaimers and Limitation of Liability</h2>
                
                <h3 className="text-xl font-medium mb-3">Service Disclaimers</h3>
                <p className="mb-4">THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.</p>

                <h3 className="text-xl font-medium mb-3">Limitation of Liability</h3>
                <p className="mb-4">TO THE MAXIMUM EXTENT PERMITTED BY LAW, MATTHEW BRIDGES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR USE, ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Indemnification</h2>
                <p className="mb-4">
                  You agree to indemnify, defend, and hold harmless Matthew Bridges from and against any claims, damages, losses, or expenses arising out of your use of the Service or violation of these Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">13. Governing Law and Dispute Resolution</h2>
                <p className="mb-4">
                  These Terms are governed by the laws of the United States. Any disputes arising under these Terms will be resolved through binding arbitration in accordance with the rules of the American Arbitration Association.
                </p>
                <p className="mb-4">
                  You waive any right to participate in class-action lawsuits or class-wide arbitration.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">14. App Store Compliance</h2>
                <p className="mb-4">
                  Your use of the Service must comply with the applicable App Store terms:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Apple App Store Terms of Service (for iOS users)</li>
                  <li>Google Play Terms of Service (for Android users)</li>
                </ul>
                <p className="mb-4">
                  In case of conflict between these Terms and App Store terms, the App Store terms prevail for App Store-related matters.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">15. Severability</h2>
                <p className="mb-4">
                  If any provision of these Terms is found to be unenforceable or invalid, the remaining provisions will remain in full force and effect.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">16. Changes to Terms</h2>
                <p className="mb-4">
                  We may update these Terms from time to time. We will provide notice of material changes by:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Posting updated Terms in the app</li>
                  <li>Sending email notifications to registered users</li>
                  <li>Displaying prominent notices within the Service</li>
                </ul>
                <p className="mb-4">
                  Your continued use of the Service after changes take effect constitutes acceptance of the updated Terms.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">17. Contact Information</h2>
                <p className="mb-4">
                  If you have questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Matthew Bridges</strong><br />
                  Email: hello@bridgeforcouples.com<br />
                  Subject Line: Terms of Service Inquiry</p>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">18. Entire Agreement</h2>
                <p className="mb-4">
                  These Terms, together with our Privacy Policy, constitute the entire agreement between you and Matthew Bridges regarding the use of our Service and supersede all prior agreements and understandings.
                </p>
              </section>
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

export default Terms;
