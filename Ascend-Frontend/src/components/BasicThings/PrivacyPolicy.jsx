import PageLayout from './PageLayout';

export default function PrivacyPolicy() {
  return (
    <PageLayout title="Privacy Policy">
      <div className="space-y-6">
        <p>
          At Ascend, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines how we collect, use, disclose, and safeguard your data when you use our job portal services.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
        <p>We may collect the following types of information:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personal information (e.g., name, email address, phone number)</li>
          <li>Professional information (e.g., resume, work history, education)</li>
          <li>Account information (e.g., username, password)</li>
          <li>Usage data (e.g., how you interact with our platform)</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and improve our job portal services</li>
          <li>Match you with relevant job opportunities or candidates</li>
          <li>Communicate with you about your account and our services</li>
          <li>Analyze and enhance the user experience on our platform</li>
        </ul>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Sharing and Disclosure</h2>
        <p>
          We may share your information with employers, recruiters, or other users as necessary to facilitate job applications and hiring processes. We do not sell your personal information to third parties.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal information. You may also have the right to restrict or object to certain processing of your data.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new Privacy Policy on this page.
        </p>
        <p className="mt-8">
          If you have any questions about this Privacy Policy, please contact us at privacy@ascendjobs.com.
        </p>
        <p>
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </PageLayout>
  );
}

