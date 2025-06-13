
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
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-cormorant font-bold text-[#1E2A38] mb-8">Privacy Policy</h1>
            
            <div className="prose prose-slate max-w-none space-y-6">
              <p className="text-lg mb-6">
                <strong>Last Updated:</strong> December 13, 2024
              </p>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-sm">
                  <strong>Contact Information:</strong><br />
                  Matthew Bridges<br />
                  Email: hello@bridgeforcouples.com<br />
                  This privacy policy applies to the Bridge For Couples mobile application and website.
                </p>
              </div>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                
                <h3 className="text-xl font-medium mb-3">Information You Provide Directly</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Account information (name, email address, password)</li>
                  <li>Relationship status and partner information</li>
                  <li>Quiz responses and assessment results</li>
                  <li>Journal entries and personal reflections</li>
                  <li>Communication preferences and app settings</li>
                  <li>Feedback, support requests, and correspondence</li>
                  <li>Payment and billing information (processed by App Store/Google Play)</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Information Collected Automatically</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Device information (device type, operating system, app version)</li>
                  <li>Usage data (features used, time spent, session frequency)</li>
                  <li>Technical data (IP address, device identifiers, crash reports)</li>
                  <li>Location data (general location based on IP address, if permitted)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Provide and maintain the Bridge For Couples service</li>
                  <li>Personalize your experience and provide tailored relationship insights</li>
                  <li>Process subscriptions and manage your account</li>
                  <li>Send important service notifications and updates</li>
                  <li>Analyze usage patterns to improve our service</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Ensure security and prevent fraud or abuse</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing and Disclosure</h2>
                <p className="mb-4">We do not sell, trade, or rent your personal information. We may share information in these limited circumstances:</p>
                
                <h3 className="text-xl font-medium mb-3">Service Providers</h3>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Supabase:</strong> Database hosting and backend services</li>
                  <li><strong>App Store/Google Play:</strong> Payment processing for subscriptions</li>
                  <li><strong>Analytics providers:</strong> Usage analytics and crash reporting</li>
                  <li><strong>Email service providers:</strong> Transactional emails and notifications</li>
                </ul>

                <h3 className="text-xl font-medium mb-3">Legal Requirements</h3>
                <p className="mb-4">We may disclose information if required by law, court order, or to protect the rights, property, or safety of Bridge For Couples, our users, or others.</p>

                <h3 className="text-xl font-medium mb-3">Business Transfers</h3>
                <p className="mb-4">In the event of a merger, acquisition, or sale of assets, user information may be transferred as part of that transaction.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                <p className="mb-4">We implement appropriate technical and organizational measures to protect your personal information:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Encryption of data in transit and at rest</li>
                  <li>Regular security assessments and updates</li>
                  <li>Access controls and authentication mechanisms</li>
                  <li>Secure hosting infrastructure with industry-standard protections</li>
                </ul>
                <p className="mb-4">However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Account Data:</strong> Retained while your account is active and for up to 1 year after account deletion</li>
                  <li><strong>Personal Content:</strong> Journal entries and responses are deleted immediately upon account deletion</li>
                  <li><strong>Usage Data:</strong> Aggregated, non-identifiable usage statistics may be retained indefinitely</li>
                  <li><strong>Legal Requirements:</strong> Some data may be retained longer if required by law</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">6. Your Rights and Choices</h2>
                <p className="mb-4">You have the following rights regarding your personal information:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li><strong>Access:</strong> Request a copy of your personal information</li>
                  <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Receive your data in a portable format</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from non-essential communications</li>
                  <li><strong>Account Control:</strong> Modify privacy settings within the app</li>
                </ul>
                <p className="mb-4">To exercise these rights, contact us at hello@bridgeforcouples.com.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
                <p className="mb-4">We use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze app usage and performance</li>
                  <li>Provide personalized content and features</li>
                </ul>
                <p className="mb-4">You can control cookie settings through your browser or device settings.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
                <p className="mb-4">Bridge For Couples is not intended for children under 17 years of age. We do not knowingly collect personal information from children under 17. If we become aware that we have collected personal information from a child under 17, we will take steps to delete that information promptly.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">9. International Data Transfers</h2>
                <p className="mb-4">Your information may be processed and stored in countries other than your own. We ensure appropriate safeguards are in place for international transfers, including:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Adequacy decisions by relevant authorities</li>
                  <li>Standard contractual clauses</li>
                  <li>Certification schemes and codes of conduct</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">10. California Privacy Rights (CCPA)</h2>
                <p className="mb-4">California residents have additional rights under the California Consumer Privacy Act:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Right to know what personal information is collected and how it's used</li>
                  <li>Right to delete personal information</li>
                  <li>Right to opt-out of the sale of personal information (we do not sell personal information)</li>
                  <li>Right to non-discrimination for exercising CCPA rights</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">11. Changes to This Privacy Policy</h2>
                <p className="mb-4">We may update this Privacy Policy from time to time. We will notify you of material changes by:</p>
                <ul className="list-disc pl-6 mb-4 space-y-1">
                  <li>Posting the updated policy in the app</li>
                  <li>Sending an email notification</li>
                  <li>Displaying a prominent notice in the app</li>
                </ul>
                <p className="mb-4">Your continued use of the service after changes become effective constitutes acceptance of the updated policy.</p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
                <p className="mb-4">If you have questions about this Privacy Policy or our privacy practices, please contact us at:</p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p><strong>Matthew Bridges</strong><br />
                  Email: hello@bridgeforcouples.com<br />
                  Subject Line: Privacy Policy Inquiry</p>
                </div>
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

export default Privacy;
