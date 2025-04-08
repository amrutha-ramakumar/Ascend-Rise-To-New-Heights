// import { useState } from 'react';
// import SkillSelector from './SkillSelector';
// import PropTypes from 'prop-types'; // Import PropTypes

// const PersonalDetails = ({ profile }) => {
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     aboutMe: profile.aboutMe,
//     linkedinUrl: profile.linkedinUrl,
//     portfolioUrl: profile.portfolioUrl,
//     resumeUrl: profile.resumeUrl,
//   });
//   const [selectedSkills, setSelectedSkills] = useState(profile.skillList);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSkillSelect = (skill) => {
//     setSelectedSkills((prev) => [...prev, skill]);
//   };

//   const handleSkillRemove = (skillId) => {
//     setSelectedSkills((prev) => prev.filter((skill) => skill.skillId !== skillId));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No authentication token found');
//       return;
//     }

//     try {
//       const response = await fetch('http://localhost:8080/api/jobseeker/update', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           ...formData,
//           skillList: selectedSkills,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update profile');
//       }

//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   if (isEditing) {
//     return (
//       <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
//         <div>
//           <label htmlFor="aboutMe" className="block text-sm font-medium text-gray-700">About Me</label>
//           <textarea
//             id="aboutMe"
//             name="aboutMe"
//             value={formData.aboutMe}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             rows="4"
//           />
//         </div>
//         <div>
//           <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">LinkedIn URL</label>
//           <input
//             type="url"
//             id="linkedinUrl"
//             name="linkedinUrl"
//             value={formData.linkedinUrl}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label htmlFor="portfolioUrl" className="block text-sm font-medium text-gray-700">Portfolio URL</label>
//           <input
//             type="url"
//             id="portfolioUrl"
//             name="portfolioUrl"
//             value={formData.portfolioUrl}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label htmlFor="resumeUrl" className="block text-sm font-medium text-gray-700">Resume URL</label>
//           <input
//             type="url"
//             id="resumeUrl"
//             name="resumeUrl"
//             value={formData.resumeUrl}
//             onChange={handleChange}
//             required
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Skills</label>
//           <SkillSelector
//             selectedSkills={selectedSkills}
//             onSkillSelect={handleSkillSelect}
//             onSkillRemove={handleSkillRemove}
//           />
//           <div className="flex flex-wrap gap-2 mt-2">
//             {selectedSkills.map((skill) => (
//               <span key={skill.skillId} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//                 {skill.skillName}
//               </span>
//             ))}
//           </div>
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={() => setIsEditing(false)}
//             className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//           >
//             Save
//           </button>
//         </div>
//       </form>
//     );
//   }

//   return (
//     <div className="space-y-4 bg-white p-6 rounded-lg shadow">
//       <div className="flex justify-end">
//         <button
//           onClick={() => setIsEditing(true)}
//           className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Edit
//         </button>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold">About Me</h3>
//         <p>{profile.aboutMe}</p>
//       </div>
//       <div>
//         <h3 className="text-lg font-semibold">Skills</h3>
//         <div className="flex flex-wrap gap-2 mt-2">
//           {profile.skillList.map((skill) => (
//             <span key={skill.skillId} className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
//               {skill.skillName}
//             </span>
//           ))}
//         </div>
//       </div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//         <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//           View Resume
//         </a>
//         <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//           LinkedIn Profile
//         </a>
//         <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
//           Portfolio
//         </a>
//       </div>
//     </div>
//   );
// };

// PersonalDetails.propTypes = {
//     profile: PropTypes.shape({
//       aboutMe: PropTypes.string.isRequired,
//       linkedinUrl: PropTypes.string.isRequired,
//       portfolioUrl: PropTypes.string.isRequired,
//       resumeUrl: PropTypes.string.isRequired,
//       skillList: PropTypes.arrayOf(
//         PropTypes.shape({
//           skillId: PropTypes.number.isRequired,
//           skillName: PropTypes.string.isRequired,
//         })
//       ).isRequired,
//     }).isRequired,
//   };

// export default PersonalDetails;

import { useState } from 'react';
import SkillSelector from './SkillSelector';
import PropTypes from 'prop-types';
import BASE_URL from '../../../../api/BaseUrl';
const PersonalDetails = ({ profile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    aboutMe: profile.aboutMe,
    linkedinUrl: profile.linkedinUrl,
    portfolioUrl: profile.portfolioUrl,
    resumeUrl: profile.resumeUrl,
  });
  const [selectedSkills, setSelectedSkills] = useState(profile.skillList);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillSelect = (skill) => {
    setSelectedSkills((prev) => [...prev, skill]);
  };

  const handleSkillRemove = (skillId) => {
    setSelectedSkills((prev) => prev.filter((skill) => skill.skillId !== skillId));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/jobseeker/update/${profile.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          skillList: selectedSkills,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg space-y-6">
      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 text-center">Edit Your Profile</h2>
          
          {/* About Me */}
          <div>
            <label htmlFor="aboutMe" className="block text-lg font-medium text-gray-700">About Me</label>
            <textarea
              id="aboutMe"
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out p-3"
              rows="4"
              placeholder="Tell us about yourself"
            />
          </div>

          {/* LinkedIn URL */}
          <div>
            <label htmlFor="linkedinUrl" className="block text-lg font-medium text-gray-700">LinkedIn URL</label>
            <input
              type="url"
              id="linkedinUrl"
              name="linkedinUrl"
              value={formData.linkedinUrl}
              onChange={handleChange}
              required
              className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out p-3"
              placeholder="https://linkedin.com/in/yourname"
            />
          </div>

          {/* Portfolio URL */}
          <div>
            <label htmlFor="portfolioUrl" className="block text-lg font-medium text-gray-700">Portfolio URL</label>
            <input
              type="url"
              id="portfolioUrl"
              name="portfolioUrl"
              value={formData.portfolioUrl}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out p-3"
              placeholder="https://yourportfolio.com"
            />
          </div>

          {/* Resume URL */}
          <div>
            <label htmlFor="resumeUrl" className="block text-lg font-medium text-gray-700">Resume URL</label>
            <input
              type="url"
              id="resumeUrl"
              name="resumeUrl"
              value={formData.resumeUrl}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out p-3"
              placeholder="https://yourresume.com"
            />
          </div>

          {/* Skills */}
          <div>
            <label className="block text-lg font-medium text-gray-700">Skills</label>
            <SkillSelector
              selectedSkills={selectedSkills}
              onSkillSelect={handleSkillSelect}
              onSkillRemove={handleSkillRemove}
            />
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedSkills.map((skill) => (
                <span key={skill.skillId} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill.skillName}
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-end">
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Edit Profile
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800">About Me</h3>
            <p className="text-gray-700">{profile.aboutMe}</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">Skills</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skillList.map((skill) => (
                <span key={skill.skillId} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm">
                  {skill.skillName}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

PersonalDetails.propTypes = {
  profile: PropTypes.shape({
    id:PropTypes.number.isRequired,
    aboutMe: PropTypes.string.isRequired,
    linkedinUrl: PropTypes.string.isRequired,
    portfolioUrl: PropTypes.string.isRequired,
    resumeUrl: PropTypes.string.isRequired,
    skillList: PropTypes.arrayOf(
      PropTypes.shape({
        skillId: PropTypes.number.isRequired,
        skillName: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default PersonalDetails;
