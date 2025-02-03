// import { useState, useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import BASE_URL from "../../../api/BaseUrl";
// const JobForm = () => {
//   const [formData, setFormData] = useState({
//     position: "",
//     description: "",
//     location: "",
//     experience: "",
//     education: "",
//     industryId: "",
//     salary: "",
//     skills: [],
//     expiryDate: "",
//     isDeleted: false,
//   });

//   const [errors, setErrors] = useState({
//     position: "",
//     description: "",
//     location: "",
//     experience: "",
//     education: "",
//     industryId: "",
//     salary: "",
//     skills: "",
//     expiryDate: "",
//   });
//   const [errorMessage, setErrorMessage] = useState("");
//   const [industries, setIndustries] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [selectedSkill, setSelectedSkill] = useState("");
//   const navigate = useNavigate();
//   useEffect(() => {
//     fetch(`${BASE_URL}/industry`)
//       .then((res) => res.json())
//       .then((data) => setIndustries(data))
//       .catch((err) => console.error("Error fetching industries:", err));
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     fetch(`${BASE_URL}/api/skills`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setSkills(data))
//       .catch((err) => console.error("Error fetching skills:", err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleIndustryChange = (e) => {
//     setFormData({ ...formData, industryId: parseInt(e.target.value) });
//   };

//   const handleSkillSelect = (e) => {
//     setSelectedSkill(e.target.value);
//   };

//   const handleAddSkill = () => {
//     if (selectedSkill && !formData.skills.includes(selectedSkill)) {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, selectedSkill],
//       });
//       setSelectedSkill("");
//     }
//   };

//   const handleRemoveSkill = (skill) => {
//     setFormData({
//       ...formData,
//       skills: formData.skills.filter((s) => s !== skill),
//     });
//   };

//   const validateForm = () => {
//     let valid = true;
//     const newErrors = {};

//     if (!formData.position) {
//       valid = false;
//       newErrors.position = "Position is required.";
//     }
//     if (!formData.description) {
//       valid = false;
//       newErrors.description = "Description is required.";
//     }
//     if (!formData.location) {
//       valid = false;
//       newErrors.location = "Location is required.";
//     }
//     if (!formData.experience) {
//       valid = false;
//       newErrors.experience = "Experience is required.";
//     }
//     if (!formData.education) {
//       valid = false;
//       newErrors.education = "Education is required.";
//     }
//     if (!formData.industryId) {
//       valid = false;
//       newErrors.industryId = "Industry is required.";
//     }
//     if (!formData.salary) {
//       valid = false;
//       newErrors.salary = "Salary is required.";
//     }
//     if (formData.skills.length === 0) {
//       valid = false;
//       newErrors.skills = "At least one skill is required.";
//     }
//     if (!formData.expiryDate) {
//       valid = false;
//       newErrors.expiryDate = "Expiry Date is required.";
//     }

//     setErrors(newErrors);
//     return valid;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     const token = localStorage.getItem("token");

//     try {
//       const response = await fetch(`${BASE_URL}/api/jobs`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         navigate('/employer/jobs');
//         // alert("Job posted successfully!");
        
//       } else {
//         const errorData = await response.json();
//         console.log(errorData.message);
//         setErrorMessage(errorData.message);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   return (
//     <div className="w-full max-w-7xl mt-20 mx-auto p-6">
//       <div className="bg-black text-white p-4 mb-6">
//         <h2 className="text-xl font-medium">Job Information</h2>
//       </div>
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

//       <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="space-y-2">
//             <label htmlFor="position" className="block text-sm text-gray-600">Job Title</label>
//             <input
//               id="position"
//               type="text"
//               name="position"
//               value={formData.position}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.position && (
//               <p className="text-red-500 text-xs mt-1">{errors.position}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="description" className="block text-sm text-gray-600">Description</label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={4}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             ></textarea>
//             {errors.description && (
//               <p className="text-red-500 text-xs mt-1">{errors.description}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="location" className="block text-sm text-gray-600">Location</label>
//             <input
//               id="location"
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.location && (
//               <p className="text-red-500 text-xs mt-1">{errors.location}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="experience" className="block text-sm text-gray-600">Experience</label>
//             <input
//               id="experience"
//               type="text"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.experience && (
//               <p className="text-red-500 text-xs mt-1">{errors.experience}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="education" className="block text-sm text-gray-600">Education</label>
//             <input
//               id="education"
//               type="text"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.education && (
//               <p className="text-red-500 text-xs mt-1">{errors.education}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="industryId" className="block text-sm text-gray-600">Industry</label>
//             <select
//               id="industryId"
//               value={formData.industryId}
//               onChange={handleIndustryChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             >
//               <option value="">Select Industry</option>
//               {industries.map((industry) => (
//                 <option key={industry.id} value={industry.id}>
//                   {industry.industryType}
//                 </option>
//               ))}
//             </select>
//             {errors.industryId && (
//               <p className="text-red-500 text-xs mt-1">{errors.industryId}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="salary" className="block text-sm text-gray-600">Salary</label>
//             <input
//               id="salary"
//               type="text"
//               name="salary"
//               value={formData.salary}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.salary && (
//               <p className="text-red-500 text-xs mt-1">{errors.salary}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-600">Skills</label>
//             <div className="flex gap-2">
//               <select
//                 value={selectedSkill}
//                 onChange={handleSkillSelect}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//               >
//                 <option value="">Select a skill</option>
//                 {skills.map((skill) => (
//                   <option key={skill.skillId} value={skill.skillName}>
//                     {skill.skillName}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="button"
//                 onClick={handleAddSkill}
//                 className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {formData.skills.map((skill) => (
//                 <span
//                   key={skill}
//                   className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300"
//                 >
//                   {skill}
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveSkill(skill)}
//                     className="ml-2 text-gray-500 hover:text-black"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//             {errors.skills && (
//               <p className="text-red-500 text-xs mt-1">{errors.skills}</p>
//             )}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="expiryDate" className="block text-sm text-gray-600">Expiry Date</label>
//             <input
//               id="expiryDate"
//               type="date"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.expiryDate && (
//               <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>
//             )}
//           </div>
//         </div>
//         <div className="mt-8 flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors"
//           >
//             Post Job
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default JobForm;

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import BASE_URL from "../../../api/BaseUrl"
// const JobForm = () => {
//   const [formData, setFormData] = useState({
//     position: "",
//     description: "",
//     location: "",
//     experience: "",
//     education: "",
//     industryId: "",
//     salary: "",
//     skills: [],
//     expiryDate: "",
//     isDeleted: false,
//   })

//   const [errors, setErrors] = useState({
//     position: "",
//     description: "",
//     location: "",
//     experience: "",
//     education: "",
//     industryId: "",
//     salary: "",
//     skills: "",
//     expiryDate: "",
//   })
//   const [errorMessage, setErrorMessage] = useState("")
//   const [industries, setIndustries] = useState([])
//   const [skills, setSkills] = useState([])
//   const [selectedSkill, setSelectedSkill] = useState("")
//   const navigate = useNavigate()

//   useEffect(() => {
//     fetch(`${BASE_URL}/industry`)
//       .then((res) => res.json())
//       .then((data) => setIndustries(data))
//       .catch((err) => console.error("Error fetching industries:", err))
//   }, [])

//   useEffect(() => {
//     const token = localStorage.getItem("token")
//     fetch(`${BASE_URL}/api/skills`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => setSkills(data))
//       .catch((err) => console.error("Error fetching skills:", err))
//   }, [])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleIndustryChange = (e) => {
//     setFormData({ ...formData, industryId: Number.parseInt(e.target.value) })
//   }

//   const handleSkillSelect = (e) => {
//     setSelectedSkill(e.target.value)
//   }

//   const handleAddSkill = () => {
//     if (selectedSkill && !formData.skills.includes(selectedSkill)) {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, selectedSkill],
//       })
//       setSelectedSkill("")
//     }
//   }

//   const handleRemoveSkill = (skill) => {
//     setFormData({
//       ...formData,
//       skills: formData.skills.filter((s) => s !== skill),
//     })
//   }

//   const validateForm = () => {
//     let valid = true
//     const newErrors = {}

//     if (!formData.position) {
//       valid = false
//       newErrors.position = "Position is required."
//     }
//     if (!formData.description) {
//       valid = false
//       newErrors.description = "Description is required."
//     }
//     if (!formData.location) {
//       valid = false
//       newErrors.location = "Location is required."
//     }
//     if (!formData.experience) {
//       valid = false
//       newErrors.experience = "Experience is required."
//     }
//     if (!formData.education) {
//       valid = false
//       newErrors.education = "Education is required."
//     }
//     if (!formData.industryId) {
//       valid = false
//       newErrors.industryId = "Industry is required."
//     }
//     if (!formData.salary) {
//       valid = false
//       newErrors.salary = "Salary is required."
//     }
//     if (formData.skills.length === 0) {
//       valid = false
//       newErrors.skills = "At least one skill is required."
//     }
//     if (!formData.expiryDate) {
//       valid = false
//       newErrors.expiryDate = "Expiry Date is required."
//     }

//     setErrors(newErrors)
//     return valid
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     const token = localStorage.getItem("token")

//     try {
//       const response = await fetch(`${BASE_URL}/api/jobs`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         navigate("/employer/jobs")
//         // alert("Job posted successfully!");
//       } else {
//         const errorData = await response.json()
//         console.log(errorData.message)
//         setErrorMessage(errorData.message)
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error)
//     }
//   }

//   return (
//     <div className="w-full max-w-7xl mt-20 mx-auto p-6">
//       <div className="bg-black text-white p-4 mb-6">
//         <h2 className="text-xl font-medium">Job Information</h2>
//       </div>

//       {errorMessage && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{errorMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="space-y-2">
//             <label htmlFor="position" className="block text-sm text-gray-600">
//               Job Title
//             </label>
//             <input
//               id="position"
//               type="text"
//               name="position"
//               value={formData.position}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="description" className="block text-sm text-gray-600">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               rows={4}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             ></textarea>
//             {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="location" className="block text-sm text-gray-600">
//               Location
//             </label>
//             <input
//               id="location"
//               type="text"
//               name="location"
//               value={formData.location}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="experience" className="block text-sm text-gray-600">
//               Experience
//             </label>
//             <input
//               id="experience"
//               type="text"
//               name="experience"
//               value={formData.experience}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="education" className="block text-sm text-gray-600">
//               Education
//             </label>
//             <input
//               id="education"
//               type="text"
//               name="education"
//               value={formData.education}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="industryId" className="block text-sm text-gray-600">
//               Industry
//             </label>
//             <select
//               id="industryId"
//               value={formData.industryId}
//               onChange={handleIndustryChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             >
//               <option value="">Select Industry</option>
//               {industries.map((industry) => (
//                 <option key={industry.id} value={industry.id}>
//                   {industry.industryType}
//                 </option>
//               ))}
//             </select>
//             {errors.industryId && <p className="text-red-500 text-xs mt-1">{errors.industryId}</p>}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="salary" className="block text-sm text-gray-600">
//               Salary
//             </label>
//             <input
//               id="salary"
//               type="text"
//               name="salary"
//               value={formData.salary}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
//           </div>
//           <div className="space-y-2">
//             <label className="block text-sm text-gray-600">Skills</label>
//             <div className="flex gap-2">
//               <select
//                 value={selectedSkill}
//                 onChange={handleSkillSelect}
//                 className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//               >
//                 <option value="">Select a skill</option>
//                 {skills.map((skill) => (
//                   <option key={skill.skillId} value={skill.skillName}>
//                     {skill.skillName}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="button"
//                 onClick={handleAddSkill}
//                 className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {formData.skills.map((skill) => (
//                 <span
//                   key={skill}
//                   className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300"
//                 >
//                   {skill}
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveSkill(skill)}
//                     className="ml-2 text-gray-500 hover:text-black"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//             {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="expiryDate" className="block text-sm text-gray-600">
//               Expiry Date
//             </label>
//             <input
//               id="expiryDate"
//               type="date"
//               name="expiryDate"
//               value={formData.expiryDate}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
//             />
//             {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
//           </div>
//         </div>
//         <div className="mt-8 flex justify-end">
//           <button type="submit" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
//             Post Job
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default JobForm

// latest design not good and dont no working well
// import { useState, useEffect } from "react"
// import { useNavigate, useParams } from "react-router-dom"
// import BASE_URL from "../../../api/BaseUrl"

// const JobForm = () => {
//   const { jobId } = useParams()
//   const navigate = useNavigate()
//   const [formData, setFormData] = useState({
//     position: "",
//     description: "",
//     location: "",
//     experience: "",
//     education: "",
//     industryId: "",
//     salary: "",
//     skills: [],
//     expiryDate: "",
//     isDeleted: false,
//   })

//   const [errors, setErrors] = useState({})
//   const [errorMessage, setErrorMessage] = useState("")
//   const [industries, setIndustries] = useState([])
//   const [selectedSkill, setSelectedSkill] = useState("")
//   const [availableSkills, setAvailableSkills] = useState([])

//   useEffect(() => {
//     fetchIndustries()
//     fetchSkills()
//     if (jobId) {
//       fetchJobDetails()
//     }
//   }, [jobId])

//   const fetchIndustries = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/industry`)
//       if (response.ok) {
//         const data = await response.json()
//         setIndustries(data)
//       } else {
//         console.error("Failed to fetch industries")
//       }
//     } catch (error) {
//       console.error("Error fetching industries:", error)
//     }
//   }

//   const fetchSkills = async () => {
//     const token = localStorage.getItem("token")
//     try {
//       const response = await fetch(`${BASE_URL}/api/skills`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       if (response.ok) {
//         const data = await response.json()
//         setAvailableSkills(data)
//       } else {
//         console.error("Failed to fetch skills")
//       }
//     } catch (error) {
//       console.error("Error fetching skills:", error)
//     }
//   }

//   const fetchJobDetails = async () => {
//     const token = localStorage.getItem("token")
//     try {
//       const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//       if (response.ok) {
//         const jobData = await response.json()
//         setFormData(jobData)
//       } else {
//         setErrorMessage("Failed to fetch job details")
//       }
//     } catch (error) {
//       console.error("Error fetching job details:", error)
//       setErrorMessage("An error occurred while fetching job details")
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleIndustryChange = (e) => {
//     setFormData({ ...formData, industryId: Number.parseInt(e.target.value) })
//   }

//   const handleSkillSelect = (e) => {
//     setSelectedSkill(e.target.value)
//   }

//   const handleAddSkill = () => {
//     if (selectedSkill && !formData.skills.includes(selectedSkill)) {
//       setFormData({
//         ...formData,
//         skills: [...formData.skills, selectedSkill],
//       })
//       setSelectedSkill("")
//     }
//   }

//   const handleRemoveSkill = (skill) => {
//     setFormData({
//       ...formData,
//       skills: formData.skills.filter((s) => s !== skill),
//     })
//   }

//   const validateForm = () => {
//     const newErrors = {}
//     if (!formData.position) newErrors.position = "Position is required"
//     if (!formData.description) newErrors.description = "Description is required"
//     if (!formData.location) newErrors.location = "Location is required"
//     if (!formData.experience) newErrors.experience = "Experience is required"
//     if (!formData.education) newErrors.education = "Education is required"
//     if (!formData.industryId) newErrors.industryId = "Industry is required"
//     if (!formData.salary) newErrors.salary = "Salary is required"
//     if (formData.skills.length === 0) newErrors.skills = "At least one skill is required"
//     if (!formData.expiryDate) newErrors.expiryDate = "Expiry date is required"

//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       return
//     }

//     const token = localStorage.getItem("token")

//     try {
//       const url = jobId ? `${BASE_URL}/api/jobs/${jobId}` : `${BASE_URL}/api/jobs`
//       const method = jobId ? "PUT" : "POST"

//       const response = await fetch(url, {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       })

//       if (response.ok) {
//         navigate("/employer/jobs")
//       } else {
//         const errorData = await response.json()
//         setErrorMessage(errorData.message || "An error occurred while submitting the form")
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error)
//       setErrorMessage("An error occurred while submitting the form")
//     }
//   }

//   return (
//     <div className="w-full max-w-7xl mt-20 mx-auto p-6">
//       <div className="bg-black text-white p-4 mb-6">
//         <h2 className="text-xl font-medium">{jobId ? "Edit Job" : "Create New Job"}</h2>
//       </div>

//       {errorMessage && (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{errorMessage}</span>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200 rounded-lg shadow-sm">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label htmlFor="position" className="block text-sm font-medium text-gray-700">
//               Job Title
//             </label>
//             <input
//               id="position"
//               name="position"
//               type="text"
//               value={formData.position}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="location" className="block text-sm font-medium text-gray-700">
//               Location
//             </label>
//             <input
//               id="location"
//               name="location"
//               type="text"
//               value={formData.location}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
//               Experience
//             </label>
//             <input
//               id="experience"
//               name="experience"
//               type="text"
//               value={formData.experience}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="education" className="block text-sm font-medium text-gray-700">
//               Education
//             </label>
//             <input
//               id="education"
//               name="education"
//               type="text"
//               value={formData.education}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="industryId" className="block text-sm font-medium text-gray-700">
//               Industry
//             </label>
//             <select
//               id="industryId"
//               name="industryId"
//               value={formData.industryId}
//               onChange={handleIndustryChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             >
//               <option value="">Select Industry</option>
//               {industries.map((industry) => (
//                 <option key={industry.id} value={industry.id}>
//                   {industry.industryType}
//                 </option>
//               ))}
//             </select>
//             {errors.industryId && <p className="text-red-500 text-xs mt-1">{errors.industryId}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
//               Salary
//             </label>
//             <input
//               id="salary"
//               name="salary"
//               type="text"
//               value={formData.salary}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
//           </div>

//           <div className="space-y-2">
//             <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
//               Expiry Date
//             </label>
//             <input
//               id="expiryDate"
//               name="expiryDate"
//               type="date"
//               value={formData.expiryDate}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             />
//             {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
//           </div>

//           <div className="space-y-2 col-span-full">
//             <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               rows="4"
//               value={formData.description}
//               onChange={handleChange}
//               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//             ></textarea>
//             {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
//           </div>

//           <div className="space-y-2 col-span-full">
//             <label className="block text-sm font-medium text-gray-700">Skills</label>
//             <div className="flex gap-2">
//               <select
//                 value={selectedSkill}
//                 onChange={handleSkillSelect}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//               >
//                 <option value="">Select a skill</option>
//                 {availableSkills.map((skill) => (
//                   <option key={skill.skillId} value={skill.skillName}>
//                     {skill.skillName}
//                   </option>
//                 ))}
//               </select>
//               <button
//                 type="button"
//                 onClick={handleAddSkill}
//                 className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {formData.skills.map((skill) => (
//                 <span
//                   key={skill}
//                   className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
//                 >
//                   {skill}
//                   <button
//                     type="button"
//                     onClick={() => handleRemoveSkill(skill)}
//                     className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-full bg-indigo-200 text-indigo-500 hover:bg-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//                   >
//                     ×
//                   </button>
//                 </span>
//               ))}
//             </div>
//             {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
//           </div>
//         </div>

//         <div className="mt-8 flex justify-end">
//           <button
//             type="submit"
//             className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//           >
//             {jobId ? "Update Job" : "Post Job"}
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default JobForm

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import BASE_URL from "../../../api/BaseUrl"

const JobForm = () => {
  const { jobId } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    position: "",
    description: "",
    location: "",
    experience: "",
    education: "",
    industryId: "",
    salary: "",
    skills: [],
    expiryDate: "",
    isDeleted: false,
  })

  const [errors, setErrors] = useState({
    position: "",
    description: "",
    location: "",
    experience: "",
    education: "",
    industryId: "",
    salary: "",
    skills: "",
    expiryDate: "",
  })
  const [errorMessage, setErrorMessage] = useState("")
  const [industries, setIndustries] = useState([])
  const [skills, setSkills] = useState([])
  const [selectedSkill, setSelectedSkill] = useState("")

  useEffect(() => {
    fetch(`${BASE_URL}/industry`)
      .then((res) => res.json())
      .then((data) => setIndustries(data))
      .catch((err) => console.error("Error fetching industries:", err))

    const token = localStorage.getItem("token")
    fetch(`${BASE_URL}/api/skills`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err))

    if (jobId) {
      fetchJobDetails()
    }
  }, [jobId])

  const fetchJobDetails = async () => {
    const token = localStorage.getItem("token")
    try {
      const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.ok) {
        const jobData = await response.json()
        // Handle skills array or string conversion
        const formattedSkills = Array.isArray(jobData.skills)
          ? jobData.skills
          : typeof jobData.skills === "string"
            ? jobData.skills.split(",").map((skill) => skill.trim())
            : []

        setFormData({
          ...jobData,
          skills: formattedSkills,
          industryId: Number(jobData.industryId),
        })
      } else {
        setErrorMessage("Failed to fetch job details")
      }
    } catch (error) {
      console.error("Error fetching job details:", error)
      setErrorMessage("An error occurred while fetching job details")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleIndustryChange = (e) => {
    setFormData({ ...formData, industryId: Number.parseInt(e.target.value) })
  }

  const handleSkillSelect = (e) => {
    setSelectedSkill(e.target.value)
  }

  const handleAddSkill = () => {
    if (selectedSkill && !formData.skills.includes(selectedSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, selectedSkill],
      })
      setSelectedSkill("")
    }
  }

  const handleRemoveSkill = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skill),
    })
  }

  const validateForm = () => {
    let valid = true
    const newErrors = {}

    if (!formData.position) {
      valid = false
      newErrors.position = "Position is required."
    }
    if (!formData.description) {
      valid = false
      newErrors.description = "Description is required."
    }
    if (!formData.location) {
      valid = false
      newErrors.location = "Location is required."
    }
    if (!formData.experience) {
      valid = false
      newErrors.experience = "Experience is required."
    }
    if (!formData.education) {
      valid = false
      newErrors.education = "Education is required."
    }
    if (!formData.industryId) {
      valid = false
      newErrors.industryId = "Industry is required."
    }
    if (!formData.salary) {
      valid = false
      newErrors.salary = "Salary is required."
    }
    if (formData.skills.length === 0) {
      valid = false
      newErrors.skills = "At least one skill is required."
    }
    if (!formData.expiryDate) {
      valid = false
      newErrors.expiryDate = "Expiry Date is required."
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    const token = localStorage.getItem("token")

    try {
      const url = jobId ? `${BASE_URL}/api/jobs/${jobId}` : `${BASE_URL}/api/jobs`
      const method = jobId ? "PUT" : "POST"

      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        navigate("/employer/jobs")
      } else {
        const errorData = await response.json()
        console.log(errorData.message)
        setErrorMessage(errorData.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="w-full max-w-7xl mt-20 mx-auto p-6">
      <div className="bg-black text-white p-4 mb-6">
        <h2 className="text-xl font-medium">Job Information</h2>
      </div>

      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label htmlFor="position" className="block text-sm text-gray-600">
              Job Title
            </label>
            <input
              id="position"
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.position && <p className="text-red-500 text-xs mt-1">{errors.position}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            ></textarea>
            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="location" className="block text-sm text-gray-600">
              Location
            </label>
            <input
              id="location"
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="experience" className="block text-sm text-gray-600">
              Experience
            </label>
            <input
              id="experience"
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.experience && <p className="text-red-500 text-xs mt-1">{errors.experience}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="education" className="block text-sm text-gray-600">
              Education
            </label>
            <input
              id="education"
              type="text"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.education && <p className="text-red-500 text-xs mt-1">{errors.education}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="industryId" className="block text-sm text-gray-600">
              Industry
            </label>
            <select
              id="industryId"
              value={formData.industryId}
              onChange={handleIndustryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            >
              <option value="">Select Industry</option>
              {industries.map((industry) => (
                <option key={industry.id} value={industry.id}>
                  {industry.industryType}
                </option>
              ))}
            </select>
            {errors.industryId && <p className="text-red-500 text-xs mt-1">{errors.industryId}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="salary" className="block text-sm text-gray-600">
              Salary
            </label>
            <input
              id="salary"
              type="text"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.salary && <p className="text-red-500 text-xs mt-1">{errors.salary}</p>}
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-600">Skills</label>
            <div className="flex gap-2">
              <select
                value={selectedSkill}
                onChange={handleSkillSelect}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
              >
                <option value="">Select a skill</option>
                {skills.map((skill) => (
                  <option key={skill.skillId} value={skill.skillName}>
                    {skill.skillName}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm border border-gray-300"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="ml-2 text-gray-500 hover:text-black"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            {errors.skills && <p className="text-red-500 text-xs mt-1">{errors.skills}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="expiryDate" className="block text-sm text-gray-600">
              Expiry Date
            </label>
            <input
              id="expiryDate"
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-black"
            />
            {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button type="submit" className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition-colors">
            {jobId ? "Update Job" : "Post Job"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default JobForm

