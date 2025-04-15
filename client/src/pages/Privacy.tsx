import Layout from "@/components/Layout";
import React from "react";

const Privacy: React.FC = () => {
    return (
        <Layout>
            <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">Privacy Policy</h1>
                <p className="text-sm text-muted-foreground mt-2">Your privacy is important to us. This Privacy Policy explains how ThreadTracker collects, uses, and protects your information when you use our app.</p>
            </div>
            <div className="bg-black border border-border rounded-xl p-6 space-y-5 text-foreground">
                <section>
                    <h2 className="text-lg font-semibold mb-2">1. Information We Collect</h2>
                    <p>We only collect information you voluntarily provide, such as your name, email address, and any messages you send through our contact form. We do not collect or store any sensitive personal data or social media credentials.</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-2">2. How We Use Your Information</h2>
                    <p>Your information is used solely to respond to your inquiries, provide support, and improve our services. We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-2">3. Data Security</h2>
                    <p>We implement reasonable security measures to protect your information from unauthorized access, disclosure, or loss. However, no method of transmission over the Internet is 100% secure.</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-2">4. Cookies & Tracking</h2>
                    <p>ThreadTracker does not use cookies or third-party tracking for advertising or analytics. Any usage data collected is anonymous and used only to improve app performance and reliability.</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-2">5. Third-Party Services</h2>
                    <p>Our app may contain links to third-party websites or services. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before providing any information.</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-2">6. Children’s Privacy</h2>
                    <p>ThreadTracker is not intended for children under 13. We do not knowingly collect personal information from children.</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-2">7. Changes to This Policy</h2>
                    <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.</p>
                </section>
                <section>
                    <h2 className="text-lg font-semibold mb-2">8. Contact Us</h2>
                    <p>If you have any questions about this Privacy Policy, please contact us using the form on our Contact page.</p>
                </section>
                <div className="text-xs text-muted-foreground mt-4">Last updated: April 15, 2025</div>
            </div>
        </Layout>
    );
};

export default Privacy;
