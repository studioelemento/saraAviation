import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-white min-h-screen font-outfit overflow-x-hidden">
      {/* Header Section */}
      <section className="pt-32 md:pt-48 pb-12 md:pb-20 bg-primary text-white text-center px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 md:mb-4"
          >
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-2xl mx-auto"
          >
            Effective Date: June 5, 2026
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <div className="container mx-auto px-4 md:px-6 max-w-4xl text-left py-10 md:py-16">
        <div className="space-y-8 text-gray-600 font-semibold leading-relaxed">
          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">1. Introduction</h2>
            <p className="mb-2">
              Welcome to Sara Aviation Institute ("Sara Aviation", "we", "our", or "us").
            </p>
            <p className="mb-2">
              We respect your privacy and are committed to protecting the personal information you share with us through our website, admission forms, inquiries, training programs, and related services.
            </p>
            <p className="mb-2">
              This Privacy Policy explains how we collect, use, store, disclose, and protect your information when you visit our website or interact with our services.
            </p>
            <p>
              By using our website, you consent to the practices described in this Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">2. Information We Collect</h2>
            <p className="mb-2 text-[#0d2149] font-bold">We may collect the following types of information:</p>
            
            <h3 className="text-lg font-bold text-[#0d2149] mb-2 mt-4">Personal Information</h3>
            <p className="mb-2">When you:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Submit an enquiry</li>
              <li>Request course information</li>
              <li>Apply for admission</li>
              <li>Contact us via phone, email, WhatsApp, or website forms</li>
            </ul>
            
            <p className="mb-2">We may collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Mobile number</li>
              <li>Date of birth</li>
              <li>Gender</li>
              <li>Address</li>
              <li>Educational qualifications</li>
              <li>Course preferences</li>
              <li>Documents submitted during admission processes</li>
            </ul>

            <h3 className="text-lg font-bold text-[#0d2149] mb-2 mt-4">Automatically Collected Information</h3>
            <p className="mb-2">When you browse our website, we may collect:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>Website usage statistics</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">3. How We Use Your Information</h2>
            <p className="mb-2">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Respond to enquiries</li>
              <li>Process admission applications</li>
              <li>Provide course-related information</li>
              <li>Conduct student counselling and career guidance</li>
              <li>Manage training programs and certifications</li>
              <li>Communicate important updates</li>
              <li>Improve website performance and user experience</li>
              <li>Maintain institutional records</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">4. Marketing Communications</h2>
            <p className="mb-2">With your consent, we may send:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Course updates</li>
              <li>Admission announcements</li>
              <li>Training schedules</li>
              <li>Promotional offers</li>
              <li>Career opportunities</li>
              <li>Aviation industry updates</li>
            </ul>
            <p>
              You may opt out of marketing communications at any time by contacting us or following unsubscribe instructions where applicable.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">5. Sharing of Information</h2>
            <p className="mb-4">We do not sell, rent, or trade personal information.</p>
            <p className="mb-2 text-[#0d2149] font-bold">We may share information with:</p>
            
            <h3 className="text-lg font-bold text-[#0d2149] mb-2 mt-4">Authorized Service Providers</h3>
            <p className="mb-2">Third parties assisting us in:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Website hosting</li>
              <li>Email communication</li>
              <li>Student management systems</li>
              <li>Payment processing</li>
              <li>Marketing and analytics services</li>
            </ul>

            <h3 className="text-lg font-bold text-[#0d2149] mb-2">Legal Authorities</h3>
            <p className="mb-4">Where required by law, regulation, court order, or governmental request.</p>

            <h3 className="text-lg font-bold text-[#0d2149] mb-2">Business Transfers</h3>
            <p>In the event of a merger, acquisition, restructuring, or transfer of assets.</p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">6. Data Security</h2>
            <p className="mb-2">We implement reasonable administrative, technical, and organizational safeguards to protect personal information from:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Unauthorized access</li>
              <li>Disclosure</li>
              <li>Alteration</li>
              <li>Misuse</li>
              <li>Loss</li>
            </ul>
            <p>
              While we strive to protect your information, no method of internet transmission or electronic storage can be guaranteed as completely secure.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="mb-2">Our website may use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Improve website functionality</li>
              <li>Analyze visitor behavior</li>
              <li>Remember user preferences</li>
              <li>Enhance browsing experience</li>
            </ul>
            <p>
              You may disable cookies through your browser settings; however, some website features may not function properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">8. Retention of Information</h2>
            <p className="mb-2">We retain personal information only for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fulfill educational and administrative purposes</li>
              <li>Maintain student records</li>
              <li>Meet legal and regulatory requirements</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">9. Third-Party Links</h2>
            <p className="mb-2">
              Our website may contain links to third-party websites, social media platforms, or external resources.
            </p>
            <p>
              We are not responsible for the privacy practices, policies, or content of such external websites. Users are encouraged to review their respective privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">10. Student Information</h2>
            <p className="mb-2">
              Students applying for or enrolled in our programs may be required to submit educational, identification, and training-related documents.
            </p>
            <p className="mb-2">Such information is used solely for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Admission processing</li>
              <li>Course administration</li>
              <li>Certification</li>
              <li>Placement assistance</li>
              <li>Regulatory compliance</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">11. Children's Privacy</h2>
            <p className="mb-2">
              Our services are not directed toward children under the age of 13.
            </p>
            <p>
              We do not knowingly collect personal information from children under 13 without appropriate parental or guardian consent.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">12. Your Rights</h2>
            <p className="mb-2">Subject to applicable laws, you may:</p>
            <ul className="list-disc pl-6 mb-4 space-y-1">
              <li>Request access to your personal information</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of information where legally permissible</li>
              <li>Withdraw consent for certain processing activities</li>
              <li>Request clarification regarding how your information is used</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the details below.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">13. Changes to This Privacy Policy</h2>
            <p className="mb-2">
              We may update this Privacy Policy from time to time.
            </p>
            <p>
              Any changes will be posted on this page with a revised effective date. Continued use of our website after updates constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-[#0d2149] mb-4">14. Contact Us</h2>
            <p className="mb-2">
              For any questions regarding this Privacy Policy or our data handling practices, please contact:
            </p>
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
              <p className="font-bold text-[#0d2149] text-lg mb-1">Sara Aviation Institute</p>
              <p>Phone: +91 91872 50470</p>
              <p>Email: <a href="mailto:info@saraaviation.in" className="text-accent hover:underline">info@saraaviation.in</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
