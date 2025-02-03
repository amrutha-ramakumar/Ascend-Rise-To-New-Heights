import PageLayout from './PageLayout';

export default function TermsAndConditions() {
  return (
    <PageLayout title="Terms & Conditions">
      <div className="space-y-6">
        <p>
          Welcome to Ascend. By accessing or using our job portal services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our platform.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">1. Acceptance of Terms</h2>
        <p>
          By using Ascend, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">2. User Accounts</h2>
        <p>
          You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">3. User Conduct</h2>
        <p>You agree not to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Use the service for any unlawful purpose</li>
          <li>Post inaccurate, defamatory, or offensive content</li>
          <li>Impersonate any person or entity</li>
          <li>Interfere with or disrupt the service or servers</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">4. Job Postings and Applications</h2>
        <p>
          Employers are responsible for the accuracy of their job postings. Job seekers are responsible for the accuracy of their applications and resumes.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
        <p>
          The content on Ascend, including text, graphics, logos, and software, is the property of Ascend or its content suppliers and is protected by copyright laws.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
        <p>
          Ascend shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the service.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these Terms and Conditions at any time. We will notify users of any significant changes.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">8. Governing Law</h2>
        <p>
          These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
        </p>
        <p className="mt-8">
          By using Ascend, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
        </p>
        <p>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </PageLayout>
  );
}

