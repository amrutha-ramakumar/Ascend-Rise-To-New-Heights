import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import PersonalDetails from './components/PersonalDetails';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationSection from './components/CertificationSection';
import ExtracurricularSection from './components/ExtracurricularSection';
import UserSection from './components/UserSection';
import BASE_URL from '../../../api/BaseUrl';

const JobSeekerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${BASE_URL}/api/jobseeker/getdetails`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        console.log(data);
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []); // Change dependency array to an empty array

  const handleCompleteProfile = () => {
    navigate('/jobseeker/complete-profile');
  };

  if (isLoading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return (
      
      <div className="text-center mt-20">
         <button
          onClick={handleCompleteProfile}
          className="mt-4 px-6 py-2 bg-blue-400 text-white rounded-lg"
        >
          Complete Your Profile
        </button>
        <img
          src="/src/assets/NoData.png" // Error image placeholder
          alt="Error"
          className="mx-auto"
        />
       
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="text-center mt-8">
        <p>No profile data available.</p>
        <button
          onClick={handleCompleteProfile}
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg"
        >
          Complete Your Profile
        </button>
        {/* Add the option for uploading an image */}
        <div className="mt-4">
          <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
            Upload Profile Image
          </label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            className="mt-2 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-36 mx-auto space-y-6 p-4">
      <h1 className="text-2xl font-bold mb-4">Job Seeker Profile</h1>
      <UserSection user={profile.user} profile={profile} />
      <PersonalDetails profile={profile} />
      <EducationSection educations={profile.education} />
      <ExperienceSection experiences={profile.experience} />
      <CertificationSection certifications={profile.certifications} />
      <ExtracurricularSection activities={profile.extracurricularActivities} />
    </div>
  );
};

export default JobSeekerProfile;
