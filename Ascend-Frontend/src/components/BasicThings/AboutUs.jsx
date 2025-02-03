import PageLayout from './PageLayout';

export default function AboutUs() {
  return (
    <PageLayout title="About Ascend">
      <div className="space-y-6">
        <p>
          Welcome to Ascend, your premier destination for career growth and professional development. At Ascend, we believe in empowering individuals to reach new heights in their careers and helping businesses find the perfect talent to fuel their success.
        </p>
        <p>
          Founded in 2023, Ascend has quickly become a leading job portal, connecting thousands of job seekers with their dream positions and assisting companies in building world-class teams. Our platform leverages cutting-edge technology and industry insights to create meaningful connections in the job market.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
        <p>
          To elevate careers and businesses by facilitating seamless connections between talented professionals and innovative companies, fostering growth and success for all.
        </p>
        <h2 className="text-2xl font-semibold mt-8 mb-4">What Sets Us Apart</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personalized job recommendations powered by AI</li>
          <li>Comprehensive company profiles and culture insights</li>
          <li>Skills assessment tools for job seekers</li>
          <li>Dedicated support for both employers and job seekers</li>
          <li>Regular industry reports and career development resources</li>
        </ul>
        <p className="mt-8">
          Join Ascend today and take the next step in your professional journey. Whether you&apos;re looking for your next career move or seeking to build a stellar team, Ascend is here to help you reach new heights.
        </p>
      </div>
    </PageLayout>
  );
}


