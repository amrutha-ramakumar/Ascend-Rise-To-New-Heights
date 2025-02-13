// import { useState, useEffect } from 'react';
// import Pagination from '../../../components/Pagination';
// import BASE_URL from '../../../api/BaseUrl';

// const JobSeekersList = () => {
//     const [jobSeekers, setJobSeekers] = useState([]);
//     const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);
//     const [skillFilters, setSkillFilters] = useState([]);
//     const [experienceFilter, setExperienceFilter] = useState('');
//     const [qualificationFilter, setQualificationFilter] = useState('');

//     const [availableSkills, setAvailableSkills] = useState([]);
//     const [availableQualifications, setAvailableQualifications] = useState([]);

//     const fetchJobSeekers = async () => {
//         const token = localStorage.getItem('token');
//         setLoading(true);

//         try {
//             const response = await fetch(
//                 `${BASE_URL}/api/admin/getjobseekerdetails?page=0&size=1000`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.ok) {
//                 const data = await response.json();
//                 setJobSeekers(data.content);

//                 // Extract unique skills and qualifications
//                 const skills = new Set();
//                 const qualifications = new Set();
//                 data.content.forEach(jobSeeker => {
//                     jobSeeker.skills.forEach(skill => skills.add(skill));
//                     qualifications.add(jobSeeker.highestQualification);
//                 });
//                 setAvailableSkills(Array.from(skills));
//                 setAvailableQualifications(Array.from(qualifications));

//                 filterJobSeekers(data.content, skillFilters, experienceFilter, qualificationFilter);
//             } else {
//                 const errorResult = await response.json();
//                 setError(errorResult.message || 'Failed to fetch job seekers');
//             }
//         } catch (error) {
//             console.error(error);
//             setError('Failed to fetch job seekers. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const filterJobSeekers = (jobSeekers, skills, experience, qualification) => {
//         const filtered = jobSeekers.filter(jobSeeker => 
//             (skills.length === 0 || jobSeeker.skills.some(skill => skills.includes(skill))) &&
//             (experience === '' || jobSeeker.yearsOfExperience >= parseInt(experience)) &&
//             (qualification === '' || jobSeeker.highestQualification === qualification)
//         );
//         setFilteredJobSeekers(filtered);
//         setTotalPages(Math.ceil(filtered.length / pageSize));
//     };

//     useEffect(() => {
//         fetchJobSeekers();
//     }, []);

//     useEffect(() => {
//         filterJobSeekers(jobSeekers, skillFilters, experienceFilter, qualificationFilter);
//         setCurrentPage(1);
//     }, [skillFilters, experienceFilter, qualificationFilter, jobSeekers]);

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const handleSkillFilterChange = (skill) => {
//         setSkillFilters(prev => 
//             prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
//         );
//     };

//     const handleExperienceFilterChange = (e) => {
//         setExperienceFilter(e.target.value);
//     };

//     const handleQualificationFilterChange = (e) => {
//         setQualificationFilter(e.target.value);
//     };

//     const paginatedJobSeekers = filteredJobSeekers.slice(
//         (currentPage - 1) * pageSize,
//         currentPage * pageSize
//     );

//     return (
//         <div className="container mt-32 mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-6">Job Seekers List</h1>
//             <div className="flex flex-col md:flex-row gap-8">
//                 <div className="w-full md:w-1/5">
//                     <div className="space-y-6">
//                         <div>
//                             <h2 className="text-lg font-semibold mb-2">Minimum Experience</h2>
//                             <select
//                                 value={experienceFilter}
//                                 onChange={handleExperienceFilterChange}
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                             >
//                                 <option value="">Any</option>
//                                 <option value="1">1 Year</option>
//                                 <option value="2">2 Years</option>
//                                 <option value="5">5 Years</option>
//                                 <option value="10">10+ Years</option>
//                             </select>
//                         </div>
//                         <div>
//                             <h2 className="text-lg font-semibold mb-2">Qualification</h2>
//                             <select
//                                 value={qualificationFilter}
//                                 onChange={handleQualificationFilterChange}
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                             >
//                                 <option value="">Any</option>
//                                 {availableQualifications.map(qual => (
//                                     <option key={qual} value={qual}>{qual}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         <div>
//                             <h2 className="text-lg font-semibold mb-2">Skills (Any)</h2>
//                             <div className="space-y-2 max-h-40 overflow-y-auto">
//                                 {availableSkills.map(skill => (
//                                     <label key={skill} className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={skillFilters.includes(skill)}
//                                             onChange={() => handleSkillFilterChange(skill)}
//                                             className="mr-2"
//                                         />
//                                         {skill}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>                        
//                     </div>
//                 </div>
//                 <div className="w-full md:w-4/5">
//                     {loading ? (
//                         <div className="flex justify-center items-center min-h-[200px]">
//                             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//                         </div>
//                     ) : error ? (
//                         <div className="text-center text-red-600">{error}</div>
//                     ) : filteredJobSeekers.length === 0 ? (
//                         <div className="text-center text-gray-600">No job seekers found with the specified criteria.</div>
//                     ) : (
//                         <>
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//                                     <thead className="bg-gray-100">
//                                         <tr>
//                                             <th className="py-3 px-4 border-b text-left">Name</th>
//                                             <th className="py-3 px-4 border-b text-left">Email</th>
//                                             <th className="py-3 px-4 border-b text-left">Phone</th>
//                                             {/* <th className="py-3 px-4 border-b text-left">Qualification</th> */}
//                                             <th className="py-3 px-4 border-b text-left">Skills</th>
//                                             <th className="py-3 px-4 border-b text-left">Experience</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {paginatedJobSeekers.map((jobSeeker, index) => (
//                                             <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
//                                                 <td className="py-3 px-4 border-b">{jobSeeker.name}</td>
//                                                 <td className="py-3 px-4 border-b">{jobSeeker.email}</td>
//                                                 <td className="py-3 px-4 border-b">{jobSeeker.phone}</td>
//                                                 {/* <td className="py-3 px-4 border-b">{jobSeeker.highestQualification}</td> */}
//                                                 <td className="py-3 px-4 border-b">
//                                                     <div className="flex flex-wrap gap-1">
//                                                         {jobSeeker.skills.map((skill, skillIndex) => (
//                                                             <span
//                                                                 key={skillIndex}
//                                                                 className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
//                                                             >
//                                                                 {skill}
//                                                             </span>
//                                                         ))}
//                                                     </div>
//                                                 </td>
//                                                 <td className="py-3 px-4 border-b">{jobSeeker.yearsOfExperience} Years</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <div className="mt-4">
//                                 <Pagination
//                                     currentPage={currentPage}
//                                     totalPages={totalPages}
//                                     onPageChange={handlePageChange}
//                                 />
//                             </div>
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobSeekersList;

// without modal for reason
// import { useState, useEffect } from 'react';
// import Pagination from '../../../components/Pagination';
// import BASE_URL from '../../../api/BaseUrl';

// const JobSeekersList = () => {
//     const [jobSeekers, setJobSeekers] = useState([]);
//     const [filteredJobSeekers, setFilteredJobSeekers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(1);
//     const [pageSize] = useState(10);
//     const [totalPages, setTotalPages] = useState(0);
//     const [skillFilters, setSkillFilters] = useState([]);
//     const [experienceFilter, setExperienceFilter] = useState('');
//     const [qualificationFilter, setQualificationFilter] = useState('');

//     const [availableSkills, setAvailableSkills] = useState([]);
//     const [availableQualifications, setAvailableQualifications] = useState([]);

//     const fetchJobSeekers = async () => {
//         const token = localStorage.getItem('token');
//         setLoading(true);

//         try {
//             const response = await fetch(
//                 `${BASE_URL}/api/admin/getjobseekerdetails?page=0&size=1000`,
//                 {
//                     method: 'GET',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     },
//                 }
//             );

//             if (response.ok) {
//                 const data = await response.json();
//                 setJobSeekers(data.content);

//                 // Extract unique skills and qualifications
//                 const skills = new Set();
//                 const qualifications = new Set();
//                 data.content.forEach(jobSeeker => {
//                     jobSeeker.skills.forEach(skill => skills.add(skill));
//                     qualifications.add(jobSeeker.highestQualification);
//                 });
//                 setAvailableSkills(Array.from(skills));
//                 setAvailableQualifications(Array.from(qualifications));

//                 filterJobSeekers(data.content, skillFilters, experienceFilter, qualificationFilter);
//             } else {
//                 const errorResult = await response.json();
//                 setError(errorResult.message || 'Failed to fetch job seekers');
//             }
//         } catch (error) {
//             console.error(error);
//             setError('Failed to fetch job seekers. Please try again.');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const toggleBlockStatus = async (userId, isBlocked) => {
//         const token = localStorage.getItem('token');
//         const url = `${BASE_URL}/api/admin/${isBlocked ? 'unblock' : 'block'}/${userId}`;

//         try {
//             const response = await fetch(url, {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (response.ok) {
//                 const updatedJobSeekers = jobSeekers.map(jobSeeker =>
//                     jobSeeker.user.id === userId
//                         ? { ...jobSeeker, user: { ...jobSeeker.user, blocked: !isBlocked } }
//                         : jobSeeker
//                 );
//                 setJobSeekers(updatedJobSeekers);
//                 filterJobSeekers(updatedJobSeekers, skillFilters, experienceFilter, qualificationFilter);
//             } else {
//                 const errorResult = await response.json();
//                 alert(errorResult.message || 'Failed to update block status');
//             }
//         } catch (error) {
//             console.error(error);
//             alert('Failed to update block status. Please try again.');
//         }
//     };

//     const filterJobSeekers = (jobSeekers, skills, experience, qualification) => {
//         const filtered = jobSeekers.filter(jobSeeker =>
//             (skills.length === 0 || jobSeeker.skills.some(skill => skills.includes(skill))) &&
//             (experience === '' || jobSeeker.yearsOfExperience >= parseInt(experience)) &&
//             (qualification === '' || jobSeeker.highestQualification === qualification)
//         );
//         setFilteredJobSeekers(filtered);
//         setTotalPages(Math.ceil(filtered.length / pageSize));
//     };

//     useEffect(() => {
//         fetchJobSeekers();
//     }, []);

//     useEffect(() => {
//         filterJobSeekers(jobSeekers, skillFilters, experienceFilter, qualificationFilter);
//         setCurrentPage(1);
//     }, [skillFilters, experienceFilter, qualificationFilter, jobSeekers]);

//     const handlePageChange = (newPage) => {
//         setCurrentPage(newPage);
//     };

//     const handleSkillFilterChange = (skill) => {
//         setSkillFilters(prev =>
//             prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
//         );
//     };

//     const handleExperienceFilterChange = (e) => {
//         setExperienceFilter(e.target.value);
//     };

//     const handleQualificationFilterChange = (e) => {
//         setQualificationFilter(e.target.value);
//     };

//     const paginatedJobSeekers = filteredJobSeekers.slice(
//         (currentPage - 1) * pageSize,
//         currentPage * pageSize
//     );

//     return (
//         <div className="container mt-32 mx-auto px-4 py-8">
//             <h1 className="text-3xl font-bold mb-6">Job Seekers List</h1>
//             {/* Filters Section */}
//             <div className="flex flex-col md:flex-row gap-8">
//                 <div className="w-full md:w-1/5">
//                     <div className="space-y-6">
//                         {/* Experience Filter */}
//                         <div>
//                             <h2 className="text-lg font-semibold mb-2">Minimum Experience</h2>
//                             <select
//                                 value={experienceFilter}
//                                 onChange={handleExperienceFilterChange}
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                             >
//                                 <option value="">Any</option>
//                                 <option value="1">1 Year</option>
//                                 <option value="2">2 Years</option>
//                                 <option value="5">5 Years</option>
//                                 <option value="10">10+ Years</option>
//                             </select>
//                         </div>
//                         {/* Qualification Filter */}
//                         <div>
//                             <h2 className="text-lg font-semibold mb-2">Qualification</h2>
//                             <select
//                                 value={qualificationFilter}
//                                 onChange={handleQualificationFilterChange}
//                                 className="w-full p-2 border border-gray-300 rounded-md"
//                             >
//                                 <option value="">Any</option>
//                                 {availableQualifications.map(qual => (
//                                     <option key={qual} value={qual}>{qual}</option>
//                                 ))}
//                             </select>
//                         </div>
//                         {/* Skills Filter */}
//                         <div>
//                             <h2 className="text-lg font-semibold mb-2">Skills (Any)</h2>
//                             <div className="space-y-2 max-h-40 overflow-y-auto">
//                                 {availableSkills.map(skill => (
//                                     <label key={skill} className="flex items-center">
//                                         <input
//                                             type="checkbox"
//                                             checked={skillFilters.includes(skill)}
//                                             onChange={() => handleSkillFilterChange(skill)}
//                                             className="mr-2"
//                                         />
//                                         {skill}
//                                     </label>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 {/* Job Seekers Table */}
//                 <div className="w-full md:w-4/5">
//                     {loading ? (
//                         <div className="flex justify-center items-center min-h-[200px]">
//                             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
//                         </div>
//                     ) : error ? (
//                         <div className="text-center text-red-600">{error}</div>
//                     ) : filteredJobSeekers.length === 0 ? (
//                         <div className="text-center text-gray-600">No job seekers found with the specified criteria.</div>
//                     ) : (
//                         <>
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
//                                     <thead className="bg-gray-100">
//                                         <tr>
//                                             <th className="py-3 px-4 border-b text-left">Name</th>
//                                             <th className="py-3 px-4 border-b text-left">Email</th>
//                                             <th className="py-3 px-4 border-b text-left">Phone</th>
//                                             <th className="py-3 px-4 border-b text-left">Skills</th>
//                                             <th className="py-3 px-4 border-b text-left">Action</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {paginatedJobSeekers.map((jobSeeker, index) => (
//                                             <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
//                                                 <td className="py-3 px-4 border-b">{jobSeeker.name}</td>
//                                                 <td className="py-3 px-4 border-b">{jobSeeker.email}</td>
//                                                 <td className="py-3 px-4 border-b">{jobSeeker.phone}</td>
//                                                 <td className="py-3 px-4 border-b">
//                                                     {jobSeeker.skills.join(', ')}
//                                                 </td>
//                                                 <td className="py-3 px-4 border-b">
//                                                     <button
//                                                         onClick={() => toggleBlockStatus(jobSeeker.user.id, jobSeeker.user.blocked)}
//                                                         className={`px-4 py-2 rounded-md ${
//                                                             jobSeeker.user.blocked
//                                                                 ? 'bg-green-500 text-white'
//                                                                 : 'bg-red-500 text-white'
//                                                         }`}
//                                                     >
//                                                         {jobSeeker.user.blocked ? 'Unblock' : 'Block'}
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                             <Pagination
//                                 currentPage={currentPage}
//                                 totalPages={totalPages}
//                                 onPageChange={handlePageChange}
//                             />
//                         </>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default JobSeekersList;


import { useState, useEffect } from "react"
import Pagination from "../../../components/Pagination"
import BASE_URL from "../../../api/BaseUrl"

const JobSeekersList = () => {
  const [jobSeekers, setJobSeekers] = useState([])
  const [filteredJobSeekers, setFilteredJobSeekers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const [skillFilters, setSkillFilters] = useState([])
  const [experienceFilter, setExperienceFilter] = useState("")
  const [qualificationFilter, setQualificationFilter] = useState("")

  const [availableSkills, setAvailableSkills] = useState([])
  const [availableQualifications, setAvailableQualifications] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [currentJobSeeker, setCurrentJobSeeker] = useState(null)
  const [blockReason, setBlockReason] = useState("")

  const fetchJobSeekers = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)

    try {
      const response = await fetch(`${BASE_URL}/api/admin/getjobseekerdetails?page=0&size=1000`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setJobSeekers(data.content)

        // Extract unique skills and qualifications
        const skills = new Set()
        const qualifications = new Set()
        data.content.forEach((jobSeeker) => {
          jobSeeker.skills.forEach((skill) => skills.add(skill))
          qualifications.add(jobSeeker.highestQualification)
        })
        setAvailableSkills(Array.from(skills))
        setAvailableQualifications(Array.from(qualifications))

        filterJobSeekers(data.content, skillFilters, experienceFilter, qualificationFilter)
      } else {
        const errorResult = await response.json()
        setError(errorResult.message || "Failed to fetch job seekers")
      }
    } catch (error) {
      console.error(error)
      setError("Failed to fetch job seekers. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUnblock = (jobSeeker) => {
    if (jobSeeker.user.blocked) {
      // If the user is already blocked, unblock them without showing the modal
      toggleBlockStatus(jobSeeker.user.id, true, null)
    } else {
      // If the user is not blocked, show the modal for blocking
      setCurrentJobSeeker(jobSeeker)
      setShowModal(true)
    }
  }

  const toggleBlockStatus = async (userId, isBlocked, reason) => {
    const token = localStorage.getItem("token")
    const url = `${BASE_URL}/api/admin/${isBlocked ? "unblock" : "block"}/${userId}`

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason: reason }),
      })

      if (response.ok) {
        const updatedJobSeekers = jobSeekers.map((jobSeeker) =>
          jobSeeker.user.id === userId ? { ...jobSeeker, user: { ...jobSeeker.user, blocked: !isBlocked } } : jobSeeker,
        )
        setJobSeekers(updatedJobSeekers)
        filterJobSeekers(updatedJobSeekers, skillFilters, experienceFilter, qualificationFilter)
        setShowModal(false)
        setBlockReason("")
      } else {
        const errorResult = await response.json()
        alert(errorResult.message || "Failed to update block status")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to update block status. Please try again.")
    }
  }

  const handleModalSubmit = () => {
    if (!blockReason) {
      alert("Blocking reason is required.")
      return
    }
    toggleBlockStatus(currentJobSeeker.user.id, false, blockReason)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setBlockReason("")
  }

  const filterJobSeekers = (jobSeekers, skills, experience, qualification) => {
    const filtered = jobSeekers.filter(
      (jobSeeker) =>
        (skills.length === 0 || jobSeeker.skills.some((skill) => skills.includes(skill))) &&
        (experience === "" || jobSeeker.yearsOfExperience >= Number.parseInt(experience)) &&
        (qualification === "" || jobSeeker.highestQualification === qualification),
    )
    setFilteredJobSeekers(filtered)
    setTotalPages(Math.ceil(filtered.length / pageSize))
  }

  useEffect(() => {
    fetchJobSeekers()
  }, [])

  useEffect(() => {
    filterJobSeekers(jobSeekers, skillFilters, experienceFilter, qualificationFilter)
    setCurrentPage(1)
  }, [skillFilters, experienceFilter, qualificationFilter, jobSeekers])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleSkillFilterChange = (skill) => {
    setSkillFilters((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleExperienceFilterChange = (e) => {
    setExperienceFilter(e.target.value)
  }

  const handleQualificationFilterChange = (e) => {
    setQualificationFilter(e.target.value)
  }

  const paginatedJobSeekers = filteredJobSeekers.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className="container mt-32 mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Job Seekers List</h1>
      {/* Filters Section */}
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/5">
          <div className="space-y-6">
            {/* Experience Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Minimum Experience</h2>
              <select
                value={experienceFilter}
                onChange={handleExperienceFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Any</option>
                <option value="1">1 Year</option>
                <option value="2">2 Years</option>
                <option value="5">5 Years</option>
                <option value="10">10+ Years</option>
              </select>
            </div>
            {/* Qualification Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Qualification</h2>
              <select
                value={qualificationFilter}
                onChange={handleQualificationFilterChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="">Any</option>
                {availableQualifications.map((qual) => (
                  <option key={qual} value={qual}>
                    {qual}
                  </option>
                ))}
              </select>
            </div>
            {/* Skills Filter */}
            <div>
              <h2 className="text-lg font-semibold mb-2">Skills (Any)</h2>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {availableSkills.map((skill) => (
                  <label key={skill} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={skillFilters.includes(skill)}
                      onChange={() => handleSkillFilterChange(skill)}
                      className="mr-2"
                    />
                    {skill}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* Job Seekers Table */}
        <div className="w-full md:w-4/5">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-600">{error}</div>
          ) : filteredJobSeekers.length === 0 ? (
            <div className="text-center text-gray-600">No job seekers found with the specified criteria.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-3 px-4 border-b text-left">Name</th>
                      <th className="py-3 px-4 border-b text-left">Email</th>
                      <th className="py-3 px-4 border-b text-left">Phone</th>
                      <th className="py-3 px-4 border-b text-left">Skills</th>
                      <th className="py-3 px-4 border-b text-left">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedJobSeekers.map((jobSeeker, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="py-3 px-4 border-b">{jobSeeker.name}</td>
                        <td className="py-3 px-4 border-b">{jobSeeker.email}</td>
                        <td className="py-3 px-4 border-b">{jobSeeker.phone}</td>
                        <td className="py-3 px-4 border-b">{jobSeeker.skills.join(", ")}</td>
                        <td className="py-3 px-4 border-b">
                          <button
                            onClick={() => handleBlockUnblock(jobSeeker)}
                            className={`px-4 py-2 rounded-md ${
                              jobSeeker.user.blocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
                            }`}
                          >
                            {jobSeeker.user.blocked ? "Unblock" : "Block"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </>
          )}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Block Reason</h2>
            <textarea
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Please provide a reason for blocking"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            ></textarea>
            <div className="flex justify-between">
              <button onClick={handleModalClose} className="px-4 py-2 bg-gray-200 rounded-md">
                Cancel
              </button>
              <button onClick={handleModalSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default JobSeekersList

