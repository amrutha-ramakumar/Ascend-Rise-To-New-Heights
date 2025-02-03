// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { PencilIcon } from '@heroicons/react/24/outline';
// import { useAuth } from '../../contexts/AuthContext';

// const JobSeekerProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No authentication token found');
//         }

//         const response = await fetch('http://localhost:8080/api/jobseeker/getdetails', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch profile');
//         }

//         const data = await response.json();
//         setProfile(data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (isAuthenticated) {
//       fetchProfile();
//     } else {
//       setError('User is not authenticated');
//       setIsLoading(false);
//     }
//   }, [isAuthenticated]);

//   if (isLoading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>;
//   }

//   if (!profile) {
//     return <div className="text-center mt-8">No profile data available.</div>;
//   }

//   return (
//     <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
//       <div className="flex justify-end mb-4">
//         <button
//           onClick={() => navigate('edit')}
//           className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
//         >
//           <PencilIcon className="h-5 w-5 text-blue-600" />
//         </button>
//       </div>
      
//       <div className="flex flex-col items-center mb-8">
//         <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 mb-4">
//           <img
//             src={profile.imageUrl || '/placeholder.svg?height=128&width=128'}
//             alt={profile.name}
//             className="w-full h-full object-cover"
//           />
//         </div>
//         <h1 className="text-2xl font-bold text-gray-900 mt-4">
//           {profile.name?.toUpperCase()}
//         </h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-500">Name</label>
//             <div className="mt-1 p-2 w-full bg-gray-50 border border-gray-200 rounded-md">
//               {profile.name}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500">Email</label>
//             <div className="mt-1 p-2 w-full bg-gray-50 border border-gray-200 rounded-md">
//               {profile.email}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500">Phone</label>
//             <div className="mt-1 p-2 w-full bg-gray-50 border border-gray-200 rounded-md">
//               {profile.phone}
//             </div>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-500">Highest Qualification</label>
//             <div className="mt-1 p-2 w-full bg-gray-50 border border-gray-200 rounded-md">
//               {profile.highestQualification}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500">Years of Experience</label>
//             <div className="mt-1 p-2 w-full bg-gray-50 border border-gray-200 rounded-md">
//               {profile.yearsOfExperience}
//             </div>
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-500">Skills</label>
//             <div className="mt-1 p-2 w-full bg-gray-50 border border-gray-200 rounded-md">
//               <div className="flex flex-wrap gap-2">
//                 {profile.skills.map((skill, index) => (
//                   <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobSeekerProfile;

// import { useState, useEffect } from 'react';
// import PersonalDetails from './components/PersonalDetails';
// import EducationSection from './components/EducationSection';
// import ExperienceSection from './components/ExperienceSection';
// import CertificationSection from './components/CertificationSection';
// import ExtracurricularSection from './components/ExtracurricularSection';
// import UserSection from './components/UserSection';

// const JobSeekerProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No authentication token found');
//         }

//         const response = await fetch('http://localhost:8080/api/jobseeker/getdetails', {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch profile');
//         }

//         const data = await response.json();
//         setProfile(data);
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [profile]);

//   if (isLoading) {
//     return <div className="text-center mt-8">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600">{error}</div>;
//   }

//   if (!profile) {
//     return <div className="text-center mt-8">No profile data available.</div>;
//   }

//   return (
//     <div className="container mt-36 mx-auto  space-y-6 p-4">
//       <h1 className="text-2xl font-bold mb-4">Job Seeker Profile</h1>
//       <UserSection user={profile.user} profile={profile}/>
//       <PersonalDetails profile={profile} />
//       <EducationSection educations={profile.education} />
//       <ExperienceSection experiences={profile.experience} />
//       <CertificationSection certifications={profile.certifications} />
//       <ExtracurricularSection activities={profile.extracurricularActivities} />
//     </div>
//   );
// };

// export default JobSeekerProfile;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import PersonalDetails from './components/PersonalDetails';
import EducationSection from './components/EducationSection';
import ExperienceSection from './components/ExperienceSection';
import CertificationSection from './components/CertificationSection';
import ExtracurricularSection from './components/ExtracurricularSection';
import UserSection from './components/UserSection';

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

        const response = await fetch('http://localhost:8080/api/jobseeker/getdetails', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
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
