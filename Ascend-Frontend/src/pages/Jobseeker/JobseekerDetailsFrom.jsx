// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BASE_URL  from '../../api/BaseUrl';
// // import { useAuth } from '../../contexts/AuthContext';
// const JobseekerDetailsForm = () => {
//   const navigate = useNavigate();
//   // const { logout } = useAuth();
//   const [formData, setFormData] = useState({
//     resumeUrl: '',
//     aboutMe: '',
//     linkedinUrl: '',
//     portfolioUrl: '',
//     skills: [],
//     education: [],
//     experience: [],
//     certifications: [],
//     extracurricularActivities: [],
//   });
//   const [availableSkills, setAvailableSkills] = useState([]);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchSkills();
//   }, []);
//   const token = localStorage.getItem('token');
//   const fetchSkills = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/skills`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       if (response.ok) {
//         const skills = await response.json();
//         setAvailableSkills(skills);
//         console.log(skills)
//       } else {
//         setError('Failed to fetch skills');
//       }
//     } catch (error) {
//       setError('An error occurred while fetching skills'+error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };


// const handleCheckboxChange = (e) => {
//   const { value, checked } = e.target;
//   setFormData((prevData) => {
//     if (checked) {
//       // Add the skill
//       return {
//         ...prevData,
//         skills: [...prevData.skills, value],
//       };
//     } else {
//       // Remove the skill
//       return {
//         ...prevData,
//         skills: prevData.skills.filter(skill => skill !== value),
//       };
//     }
//   });
// };

// // Dropdown Toggle State
// const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// // Toggle Dropdown Menu
// const toggleDropdown = () => {
//   setIsDropdownOpen(!isDropdownOpen);
// };

//   const handleArrayChange = (index, field, subfield, value) => {
//     setFormData(prevData => {
//       const newArray = [...prevData[field]];
//       newArray[index] = { ...newArray[index], [subfield]: value };
//       return { ...prevData, [field]: newArray };
//     });
//   };

//   const addArrayItem = (field) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [field]: [...prevData[field], {}]
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
   
    
//     try {
//       const response = await fetch(`${BASE_URL}/api/jobseeker/save`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         // logout();
//         navigate('/jobseeker/jobseeker-plans');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || "An error occurred while submitting the form");
//       }
//     } catch (error) {
//       setError("An unexpected error occurred. Please try again."+error);
//     }
//   };

//   return (
//     <div className="min-h-screen mt-10 bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto w-full">
//         <div className="bg-white py-8 px-6 shadow-sm rounded-lg">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">Resume URL</label>
//                 <input
//                   type="text"
//                   name="resumeUrl"
//                   value={formData.resumeUrl}
//                   onChange={handleChange}
//                   required
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">LinkedIn URL</label>
//                 <input
//                   type="text"
//                   name="linkedinUrl"
//                   value={formData.linkedinUrl}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                 />
//               </div>

//               <div className="space-y-2">
//                 <label className="block text-sm font-medium text-gray-600">Portfolio URL</label>
//                 <input
//                   type="text"
//                   name="portfolioUrl"
//                   value={formData.portfolioUrl}
//                   onChange={handleChange}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                 />
//               </div>

             
//               <div className="space-y-2">
//     <label className="block text-sm font-medium text-gray-600">Skills</label>

//     {/* Dropdown Button */}
//     <div className="relative">
//       <button
//         type="button"
//         onClick={toggleDropdown}
//         className="w-full px-4 py-2 border border-gray-300 rounded-md text-left bg-white focus:outline-none"
//       >
//         {formData.skills.length > 0
//           ? formData.skills.join(', ')
//           : 'Select Skills'}
//         <span className="float-right">▼</span>
//       </button>

//       {/* Dropdown List */}
//       {isDropdownOpen && (
//         <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-md w-full max-h-48 overflow-y-auto">
//           {availableSkills.map(skill => (
//             <div key={skill.id} className="flex items-center gap-2 px-3 py-2">
//               <input
//                 type="checkbox"
//                 value={skill.skillName}
//                 checked={formData.skills.includes(skill.skillName)}
//                 onChange={handleCheckboxChange}
//                 className="w-4 h-4"
//               />
//               <label className="text-black">{skill.skillName}</label>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>

//     {/* Display Selected Skills as Tags */}
//     <div className="flex flex-wrap gap-2 mt-2">
//       {formData.skills.map((skill, index) => (
//         <span
//           key={index}
//           className="bg-black text-white px-3 py-1 rounded-full flex items-center"
//         >
//           {skill}
//           <button
//             type="button"
//             className="ml-2 text-white"
//             onClick={() =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 skills: prevData.skills.filter(s => s !== skill),
//               }))
//             }
//           >
//             ✕
//           </button>
//         </span>
//       ))}
//     </div>
//   </div>
//             </div>

//             <div className="space-y-2">
//               <label className="block text-sm font-medium text-gray-600">About Me</label>
//               <textarea
//                 name="aboutMe"
//                 value={formData.aboutMe}
//                 onChange={handleChange}
//                 required
//                 rows={4}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//               />
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">Education</h3>
//                 <button
//                   type="button"
//                   onClick={() => addArrayItem('education')}
//                   className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//                 >
//                   Add Education
//                 </button>
//               </div>
//               {formData.education.map((edu, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Qualification Level"
//                       value={edu.qualificationLevel || ''}
//                       onChange={(e) => handleArrayChange(index, 'education', 'qualificationLevel', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Institution Name"
//                       value={edu.institutionName || ''}
//                       onChange={(e) => handleArrayChange(index, 'education', 'institutionName', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Board or University"
//                       value={edu.boardOrUniversity || ''}
//                       onChange={(e) => handleArrayChange(index, 'education', 'boardOrUniversity', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Field of Study"
//                       value={edu.fieldOfStudy || ''}
//                       onChange={(e) => handleArrayChange(index, 'education', 'fieldOfStudy', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Start Year"
//                       value={edu.startYear || ''}
//                       onChange={(e) => handleArrayChange(index, 'education', 'startYear', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="number"
//                       placeholder="End Year"
//                       value={edu.endYear || ''}
//                       onChange={(e) => handleArrayChange(index, 'education', 'endYear', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Percentage"
//                       value={edu.percentage || ''}
//                       onChange={(e) => handleArrayChange(index, 'education', 'percentage', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">Experience</h3>
//                 <button
//                   type="button"
//                   onClick={() => addArrayItem('experience')}
//                   className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//                 >
//                   Add Experience
//                 </button>
//               </div>
//               {formData.experience.map((exp, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Company Name"
//                       value={exp.companyName || ''}
//                       onChange={(e) => handleArrayChange(index, 'experience', 'companyName', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Job Title"
//                       value={exp.jobTitle || ''}
//                       onChange={(e) => handleArrayChange(index, 'experience', 'jobTitle', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="date"
//                       placeholder="Start Date"
//                       value={exp.startDate || ''}
//                       onChange={(e) => handleArrayChange(index, 'experience', 'startDate', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="date"
//                       placeholder="End Date"
//                       value={exp.endDate || ''}
//                       onChange={(e) => handleArrayChange(index, 'experience', 'endDate', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <textarea
//                       placeholder="Responsibilities"
//                       value={exp.responsibilities || ''}
//                       onChange={(e) => handleArrayChange(index, 'experience', 'responsibilities', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black md:col-span-2"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">Certifications</h3>
//                 <button
//                   type="button"
//                   onClick={() => addArrayItem('certifications')}
//                   className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//                 >
//                   Add Certification
//                 </button>
//               </div>
//               {formData.certifications.map((cert, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Certification Name"
//                       value={cert.certificationName || ''}
//                       onChange={(e) => handleArrayChange(index, 'certifications', 'certificationName', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="text"
//                       placeholder="Issued By"
//                       value={cert.issuedBy || ''}
//                       onChange={(e) => handleArrayChange(index, 'certifications', 'issuedBy', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="date"
//                       placeholder="Issue Date"
//                       value={cert.issueDate || ''}
//                       onChange={(e) => handleArrayChange(index, 'certifications', 'issueDate', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="date"
//                       placeholder="Expiry Date"
//                       value={cert.expiryDate || ''}
//                       onChange={(e) => handleArrayChange(index, 'certifications', 'expiryDate', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h3 className="text-lg font-medium">Extracurricular Activities</h3>
//                 <button
//                   type="button"
//                   onClick={() => addArrayItem('extracurricularActivities')}
//                   className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//                 >
//                   Add Activity
//                 </button>
//               </div>
//               {formData.extracurricularActivities.map((activity, index) => (
//                 <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
//                   <div className="grid grid-cols-1 gap-4">
//                     <input
//                       type="text"
//                       placeholder="Activity Name"
//                       value={activity.activityName || ''}
//                       onChange={(e) => handleArrayChange(index, 'extracurricularActivities', 'activityName', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <textarea
//                       placeholder="Description"
//                       value={activity.description || ''}
//                       onChange={(e) => handleArrayChange(index, 'extracurricularActivities', 'description', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                     <input
//                       type="date"
//                       placeholder="Achievement Date"
//                       value={activity.achievementDate || ''}
//                       onChange={(e) => handleArrayChange(index, 'extracurricularActivities', 'achievementDate', e.target.value)}
//                       className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {error && (
//               <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
//                 {error}
//               </div>
//             )}

//             <button
//               type="submit"
//               className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default JobseekerDetailsForm;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL  from '../../api/BaseUrl';
// import { useAuth } from '../../contexts/AuthContext';
const JobseekerDetailsForm = () => {
  const navigate = useNavigate();
  // const { logout } = useAuth();
  const [formData, setFormData] = useState({
    resumeUrl: '',
    aboutMe: '',
    linkedinUrl: '',
    portfolioUrl: '',
    skills: [],
    education: [],
    experience: [],
    certifications: [],
    extracurricularActivities: [],
  });
  const [availableSkills, setAvailableSkills] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchSkills();
  }, []);
  const token = localStorage.getItem('token');
  const fetchSkills = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/skills`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const skills = await response.json();
        setAvailableSkills(skills);
        console.log(skills)
      } else {
        setError('Failed to fetch skills');
      }
    } catch (error) {
      setError('An error occurred while fetching skills'+error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


const handleCheckboxChange = (e) => {
  const { value, checked } = e.target;
  setFormData((prevData) => {
    if (checked) {
      // Add the skill
      return {
        ...prevData,
        skills: [...prevData.skills, value],
      };
    } else {
      // Remove the skill
      return {
        ...prevData,
        skills: prevData.skills.filter(skill => skill !== value),
      };
    }
  });
};

const handleRemoveSkill = (skillToRemove) => {
  setFormData((prevData) => ({
    ...prevData,
    skills: prevData.skills.filter(skill => skill !== skillToRemove),
  }));
};

// Dropdown Toggle State
const [isDropdownOpen, setIsDropdownOpen] = useState(false);

// Toggle Dropdown Menu
const toggleDropdown = () => {
  setIsDropdownOpen(!isDropdownOpen);
};

  const handleArrayChange = (index, field, subfield, value) => {
    setFormData(prevData => {
      const newArray = [...prevData[field]];
      newArray[index] = { ...newArray[index], [subfield]: value };
      return { ...prevData, [field]: newArray };
    });
  };

  const addArrayItem = (field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: [...prevData[field], {}]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    
    try {
      const response = await fetch(`${BASE_URL}/api/jobseeker/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // logout();
        navigate('/jobseeker/jobseeker-plans');
      } else {
        const errorData = await response.json();
        setError(errorData.message || "An error occurred while submitting the form");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again."+error);
    }
  };

  return (
    <div className="min-h-screen mt-10 bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto w-full">
        <div className="bg-white py-8 px-6 shadow-sm rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Resume URL</label>
                <input
                  type="text"
                  name="resumeUrl"
                  value={formData.resumeUrl}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">LinkedIn URL</label>
                <input
                  type="text"
                  name="linkedinUrl"
                  value={formData.linkedinUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-600">Portfolio URL</label>
                <input
                  type="text"
                  name="portfolioUrl"
                  value={formData.portfolioUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                />
              </div>

             
              <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-600">Skills</label>

    {/* Dropdown Button */}
    <div className="relative">
      <button
        type="button"
        onClick={toggleDropdown}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-left bg-white focus:outline-none"
      >
        {formData.skills.length > 0
          ? formData.skills.join(', ')
          : 'Select Skills'}
        <span className="float-right">▼</span>
      </button>

      {/* Dropdown List */}
      {isDropdownOpen && (
        <div className="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-md w-full max-h-48 overflow-y-auto">
          {availableSkills.map(skill => (
            <div key={skill.id} className="flex items-center gap-2 px-3 py-2">
              <input
                type="checkbox"
                value={skill.skillName}
                checked={formData.skills.includes(skill.skillName)}
                onChange={handleCheckboxChange}
                className="w-4 h-4"
              />
              <label className="text-black">{skill.skillName}</label>
            </div>
          ))}
        </div>
      )}
    </div>

    {/* Display Selected Skills as Tags */}
    <div className="flex flex-wrap gap-2 mt-2">
      {formData.skills.map((skill, index) => (
        <span
          key={index}
          className="bg-black text-white px-3 py-1 rounded-full flex items-center"
        >
          {skill}
          <button
            type="button"
            className="ml-2 text-white"
            onClick={() => handleRemoveSkill(skill)}
          >
            ✕
          </button>
        </span>
      ))}
    </div>
  </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-600">About Me</label>
              <textarea
                name="aboutMe"
                value={formData.aboutMe}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Education</h3>
                <button
                  type="button"
                  onClick={() => addArrayItem('education')}
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Add Education
                </button>
              </div>
              {formData.education.map((edu, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Qualification Level"
                      value={edu.qualificationLevel || ''}
                      onChange={(e) => handleArrayChange(index, 'education', 'qualificationLevel', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Institution Name"
                      value={edu.institutionName || ''}
                      onChange={(e) => handleArrayChange(index, 'education', 'institutionName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Board or University"
                      value={edu.boardOrUniversity || ''}
                      onChange={(e) => handleArrayChange(index, 'education', 'boardOrUniversity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.fieldOfStudy || ''}
                      onChange={(e) => handleArrayChange(index, 'education', 'fieldOfStudy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="number"
                      placeholder="Start Year"
                      value={edu.startYear || ''}
                      onChange={(e) => handleArrayChange(index, 'education', 'startYear', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="number"
                      placeholder="End Year"
                      value={edu.endYear || ''}
                      onChange={(e) => handleArrayChange(index, 'education', 'endYear', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="number"
                      placeholder="Percentage"
                      value={edu.percentage || ''}
                      onChange={(e) => handleArrayChange(index, 'education', 'percentage', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Experience</h3>
                <button
                  type="button"
                  onClick={() => addArrayItem('experience')}
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Add Experience
                </button>
              </div>
              {formData.experience.map((exp, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Company Name"
                      value={exp.companyName || ''}
                      onChange={(e) => handleArrayChange(index, 'experience', 'companyName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={exp.jobTitle || ''}
                      onChange={(e) => handleArrayChange(index, 'experience', 'jobTitle', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="date"
                      placeholder="Start Date"
                      value={exp.startDate || ''}
                      onChange={(e) => handleArrayChange(index, 'experience', 'startDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="date"
                      placeholder="End Date"
                      value={exp.endDate || ''}
                      onChange={(e) => handleArrayChange(index, 'experience', 'endDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <textarea
                      placeholder="Responsibilities"
                      value={exp.responsibilities || ''}
                      onChange={(e) => handleArrayChange(index, 'experience', 'responsibilities', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black md:col-span-2"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Certifications</h3>
                <button
                  type="button"
                  onClick={() => addArrayItem('certifications')}
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Add Certification
                </button>
              </div>
              {formData.certifications.map((cert, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Certification Name"
                      value={cert.certificationName || ''}
                      onChange={(e) => handleArrayChange(index, 'certifications', 'certificationName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="text"
                      placeholder="Issued By"
                      value={cert.issuedBy || ''}
                      onChange={(e) => handleArrayChange(index, 'certifications', 'issuedBy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="date"
                      placeholder="Issue Date"
                      value={cert.issueDate || ''}
                      onChange={(e) => handleArrayChange(index, 'certifications', 'issueDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="date"
                      placeholder="Expiry Date"
                      value={cert.expiryDate || ''}
                      onChange={(e) => handleArrayChange(index, 'certifications', 'expiryDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Extracurricular Activities</h3>
                <button
                  type="button"
                  onClick={() => addArrayItem('extracurricularActivities')}
                  className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Add Activity
                </button>
              </div>
              {formData.extracurricularActivities.map((activity, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-md space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="text"
                      placeholder="Activity Name"
                      value={activity.activityName || ''}
                      onChange={(e) => handleArrayChange(index, 'extracurricularActivities', 'activityName', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <textarea
                      placeholder="Description"
                      value={activity.description || ''}
                      onChange={(e) => handleArrayChange(index, 'extracurricularActivities', 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                    <input
                      type="date"
                      placeholder="Achievement Date"
                      value={activity.achievementDate || ''}
                      onChange={(e) => handleArrayChange(index, 'extracurricularActivities', 'achievementDate', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
                    />
                  </div>
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobseekerDetailsForm;

