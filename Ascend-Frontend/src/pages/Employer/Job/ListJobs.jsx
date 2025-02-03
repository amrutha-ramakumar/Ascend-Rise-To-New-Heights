// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Pagination from '../../../components/Pagination';
// import BASE_URL from '../../../api/BaseUrl';

// export default function ListJobs() {
//   const [allJobs, setAllJobs] = useState([]);
//   const [filteredJobs, setFilteredJobs] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [filters, setFilters] = useState({
//     location: {},
//     position: {},
//     type: {},
//     salary: {},
//     skills: {}
//   });
//   const [sortOption, setSortOption] = useState('latest');
//   //const [showExpiredOnly, setShowExpiredOnly] = useState(false); //Removed
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const pageSize = 3; // Number of jobs per page
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchJobs();
//   }, []);

//   useEffect(() => {
//     applyFiltersAndSort();
//   }, [allJobs, filters, sortOption]);

//   const fetchJobs = async () => {
//     const token = localStorage.getItem('token');
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await fetch(`${BASE_URL}/api/jobs/listjob?page=0&size=1000`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAllJobs(data.content);
//         initializeFilters(data.content);
//       } else {
//         const errorResult = await response.json();
//         setError(errorResult.message || 'Failed to fetch jobs. Please try again.');
//       }
//     } catch (error) {
//       setError('Failed to fetch jobs. Please try again.' + error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const initializeFilters = (jobs) => {
//     const newFilters = {
//       location: {},
//       position: {},
//       type: {},
//       salary: {},
//       skills: {}
//     };
//     jobs.forEach(job => {
//       newFilters.location[job.location] = false;
//       newFilters.position[job.position] = false;
//       newFilters.type[job.type] = false;
//       newFilters.salary[getSalaryRange(job.salary)] = false;
      
//       const skillsArray = Array.isArray(job.skills) 
//         ? job.skills 
//         : typeof job.skills === 'string' 
//           ? job.skills.split(',') 
//           : [];
      
//       skillsArray.forEach(skill => {
//         newFilters.skills[skill.trim()] = false;
//       });
//     });
//     setFilters(newFilters);
//   };

//   const applyFiltersAndSort = () => {
//     const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
//       acc[key] = Object.keys(value).filter(k => value[k]);
//       return acc;
//     }, {});

//     let filtered = allJobs.filter(job => {
//       return Object.entries(activeFilters).every(([key, values]) => {
//         if (values.length === 0) return true;
//         if (key === 'salary') return values.includes(getSalaryRange(job.salary));
//         if (key === 'skills') {
//           const jobSkills = Array.isArray(job.skills) 
//             ? job.skills 
//             : typeof job.skills === 'string' 
//               ? job.skills.split(',').map(s => s.trim())
//               : [];
//           return values.some(skill => jobSkills.includes(skill));
//         }
//         return values.includes(job[key]);
//       });
//     });

//     const currentDate = new Date();

//     if (sortOption === 'expired') {
//       filtered = filtered.filter(job => isJobExpired(job.expiryDate));
//     } else if (sortOption === 'thisMonth') {
//       const oneMonthAgo = new Date(currentDate);
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//       filtered = filtered.filter(job => new Date(job.postedAt) >= oneMonthAgo);
//     } else if (sortOption === 'thisWeek') {
//       const oneWeekAgo = new Date(currentDate);
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       filtered = filtered.filter(job => new Date(job.postedAt) >= oneWeekAgo);
//     }

//     filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));


//     setFilteredJobs(filtered);
//     setTotalPages(Math.ceil(filtered.length / pageSize));
//     setCurrentPage(1);
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//     window.scrollTo(0, 0);
//   };

//   const handleFilterChange = (filterType, value) => {
//     setFilters(prev => ({
//       ...prev,
//       [filterType]: {
//         ...prev[filterType],
//         [value]: !prev[filterType][value]
//       }
//     }));
//   };

//   const handleSortChange = (event) => {
//     setSortOption(event.target.value);
//   };

//   const getSalaryRange = (salary) => {
//     if (salary < 300000) return '0 - 3 Lakhs';
//     if (salary < 600000) return '3 - 6 Lakhs';
//     if (salary < 1000000) return '6 - 10 Lakhs';
//     return '10+ Lakhs';
//   };

//   const isJobExpired = (expiryDate) => {
//     return new Date(expiryDate) < new Date();
//   };

//   const handleViewApplication = (jobId) => {
//     navigate(`/employer/application/${jobId}`);
//   };

//   const paginatedJobs = filteredJobs.slice(
//     (currentPage - 1) * pageSize,
//     currentPage * pageSize
//   );

//   if (loading) {
//     return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="min-h-screen bg-gray-50 p-6 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">ALL JOBS</h1>
//         <div className="flex items-center space-x-4">
//           <select
//             value={sortOption}
//             onChange={handleSortChange}
//             className="p-2 border rounded"
//           >
//             <option value="latest">Latest</option>
//             <option value="thisMonth">This Month</option>
//             <option value="thisWeek">This Week</option>
//             <option value="expired">Expired</option>
//           </select>
//           {/*Removed Show Expired Only Checkbox*/}
//           {/*<label className="flex items-center space-x-2">
//             <input
//               type="checkbox"
//               checked={showExpiredOnly}
//               onChange={() => setShowExpiredOnly(!showExpiredOnly)}
//               className="form-checkbox"
//             />
//             <span>Show Expired Only</span>
//           </label>*/}
//         </div>
//       </div>

//       <div className="flex flex-col md:flex-row gap-6">
//         {/* Filters - Left Side */}
//         <div className="w-full md:w-1/4">
//           <div className="bg-white p-4 rounded-lg shadow mb-4">
//             <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
//             {Object.entries(filters).map(([filterType, filterValues]) => (
//               <div key={filterType} className="mb-4">
//                 <h3 className="font-medium mb-2 capitalize">{filterType}</h3>
//                 <div className="max-h-40 overflow-y-auto">
//                   {Object.entries(filterValues).map(([value, isChecked]) => (
//                     <div key={value} className="flex items-center mb-2">
//                       <input
//                         type="checkbox"
//                         id={`${filterType}-${value}`}
//                         checked={isChecked}
//                         onChange={() => handleFilterChange(filterType, value)}
//                         className="mr-2"
//                       />
//                       <label htmlFor={`${filterType}-${value}`} className="text-sm">
//                         {value}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Jobs Listing - Right Side */}
//         <div className="w-full md:w-3/4">
//           <div className="space-y-4">
//             {paginatedJobs.map((job) => (
//               <div 
//                 key={job.id} 
//                 className={`bg-white p-4 rounded-lg shadow ${isJobExpired(job.expiryDate) ? 'opacity-50' : ''}`}
//               >
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <h2 className="text-xl font-semibold">{job.position}</h2>
//                     <p className="text-gray-600">{job.company}</p>
//                   </div>
//                   {isJobExpired(job.expiryDate) && (
//                     <span className="text-red-500 text-sm font-semibold">Expired</span>
//                   )}
//                 </div>

//                 <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
//                   <div className="flex items-center">
//                     <span className="mr-2">🕒</span>
//                     {job.experience}
//                   </div>
//                   <div className="flex items-center">
//                     <span className="mr-2">📍</span>
//                     {job.location}
//                   </div>
//                   <div className="flex items-center">
//                     <span className="mr-2">💼</span>
//                     {job.type}
//                   </div>
//                   <div className="flex items-center">
//                     <span className="mr-2">💰</span>
//                     {job.salary}
//                   </div>
//                 </div>

//                 <p className="mt-2 text-sm text-gray-600">{job.description}</p>

//                 <div className="mt-2" aria-label="Job Skills">
//                   <div className="flex flex-wrap gap-2">
//                     {(Array.isArray(job.skills) ? job.skills : (typeof job.skills === 'string' ? job.skills.split(',') : []))
//                       .map((skill, index) => (
//                         <span
//                           key={index}
//                           className="px-2 py-1 bg-gray-100 text-sm rounded"
//                         >
//                           {skill.trim()}
//                         </span>
//                       ))}
//                   </div>
//                 </div>

//                 <div className="mt-2 text-sm text-gray-500">
//                   Posted {new Date(job.postedAt).toLocaleDateString()}
//                 </div>
//                 <div className="mt-1 text-sm text-gray-500">
//                   Expires {new Date(job.expiryDate).toLocaleDateString()}
//                 </div>
//                 <button
//                   onClick={() => handleViewApplication(job.id)}
//                   className={`mt-4 text-white px-4 py-2 rounded ${
//                     isJobExpired(job.expiryDate)
//                       ? 'bg-blue-500 hover:bg-blue-600'
//                       : 'bg-green-500 hover:bg-green-600'
//                   }`}
//                 >
//                   View Application
//                 </button>
//               </div>
//             ))}
//           </div>

//           {/* Pagination */}
//           <div className="mt-8 flex justify-center">
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Pagination from "../../../components/Pagination"
import BASE_URL from "../../../api/BaseUrl"

export default function ListJobs() {
  const [allJobs, setAllJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [filters, setFilters] = useState({
    location: {},
    position: {},
    type: {},
    salary: {},
    skills: {},
  })
  const [sortOption, setSortOption] = useState("latest")
  //const [showExpiredOnly, setShowExpiredOnly] = useState(false); //Removed
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const pageSize = 3 // Number of jobs per page
  const navigate = useNavigate()

  useEffect(() => {
    fetchJobs()
  }, [])

  useEffect(() => {
    applyFiltersAndSort()
  }, [allJobs, filters, sortOption]) //Corrected dependency array

  const fetchJobs = async () => {
    const token = localStorage.getItem("token")
    setLoading(true)
    setError(null)

    try {
      const response = await fetch(`${BASE_URL}/api/jobs/listjob?page=0&size=1000`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      if (response.ok) {
        const data = await response.json()
        setAllJobs(data.content)
        initializeFilters(data.content)
      } else {
        const errorResult = await response.json()
        setError(errorResult.message || "Failed to fetch jobs. Please try again.")
      }
    } catch (error) {
      setError("Failed to fetch jobs. Please try again." + error)
    } finally {
      setLoading(false)
    }
  }

  const initializeFilters = (jobs) => {
    const newFilters = {
      location: {},
      position: {},
      type: {},
      salary: {},
      skills: {},
    }
    jobs.forEach((job) => {
      newFilters.location[job.location] = false
      newFilters.position[job.position] = false
      newFilters.type[job.type] = false
      newFilters.salary[getSalaryRange(job.salary)] = false

      const skillsArray = Array.isArray(job.skills)
        ? job.skills
        : typeof job.skills === "string"
          ? job.skills.split(",")
          : []

      skillsArray.forEach((skill) => {
        newFilters.skills[skill.trim()] = false
      })
    })
    setFilters(newFilters)
  }

  const applyFiltersAndSort = () => {
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      acc[key] = Object.keys(value).filter((k) => value[k])
      return acc
    }, {})

    let filtered = allJobs.filter((job) => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (values.length === 0) return true
        if (key === "salary") return values.includes(getSalaryRange(job.salary))
        if (key === "skills") {
          const jobSkills = Array.isArray(job.skills)
            ? job.skills
            : typeof job.skills === "string"
              ? job.skills.split(",").map((s) => s.trim())
              : []
          return values.some((skill) => jobSkills.includes(skill))
        }
        return values.includes(job[key])
      })
    })

    const currentDate = new Date()

    if (sortOption === "expired") {
      filtered = filtered.filter((job) => isJobExpired(job.expiryDate))
    } else if (sortOption === "thisMonth") {
      const oneMonthAgo = new Date(currentDate)
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1)
      filtered = filtered.filter((job) => new Date(job.postedAt) >= oneMonthAgo)
    } else if (sortOption === "thisWeek") {
      const oneWeekAgo = new Date(currentDate)
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
      filtered = filtered.filter((job) => new Date(job.postedAt) >= oneWeekAgo)
    }

    filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt))

    setFilteredJobs(filtered)
    setTotalPages(Math.ceil(filtered.length / pageSize))
    setCurrentPage(1)
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo(0, 0)
  }

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [value]: !prev[filterType][value],
      },
    }))
  }

  const handleSortChange = (event) => {
    setSortOption(event.target.value)
  }

  const getSalaryRange = (salary) => {
    if (salary < 300000) return "0 - 3 Lakhs"
    if (salary < 600000) return "3 - 6 Lakhs"
    if (salary < 1000000) return "6 - 10 Lakhs"
    return "10+ Lakhs"
  }

  const isJobExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date()
  }

  const handleViewApplication = (jobId) => {
    navigate(`/employer/application/${jobId}`)
  }

  const handleEditJob = (jobId) => {
    navigate(`/employer/edit-job/${jobId}`)
  }

  const paginatedJobs = filteredJobs.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-6 text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ALL JOBS</h1>
        <div className="flex items-center space-x-4">
          <select value={sortOption} onChange={handleSortChange} className="p-2 border rounded">
            <option value="latest">Latest</option>
            <option value="thisMonth">This Month</option>
            <option value="thisWeek">This Week</option>
            <option value="expired">Expired</option>
          </select>
          {/*Removed Show Expired Only Checkbox*/}
          {/*<label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showExpiredOnly}
              onChange={() => setShowExpiredOnly(!showExpiredOnly)}
              className="form-checkbox"
            />
            <span>Show Expired Only</span>
          </label>*/}
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Filters - Left Side */}
        <div className="w-full md:w-1/4">
          <div className="bg-white p-4 rounded-lg shadow mb-4">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {Object.entries(filters).map(([filterType, filterValues]) => (
              <div key={filterType} className="mb-4">
                <h3 className="font-medium mb-2 capitalize">{filterType}</h3>
                <div className="max-h-40 overflow-y-auto">
                  {Object.entries(filterValues).map(([value, isChecked]) => (
                    <div key={value} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`${filterType}-${value}`}
                        checked={isChecked}
                        onChange={() => handleFilterChange(filterType, value)}
                        className="mr-2"
                      />
                      <label htmlFor={`${filterType}-${value}`} className="text-sm">
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs Listing - Right Side */}
        <div className="w-full md:w-3/4">
          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <div
                key={job.id}
                className={`bg-white p-4 rounded-lg shadow ${isJobExpired(job.expiryDate) ? "opacity-50" : ""}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold">{job.position}</h2>
                    <p className="text-gray-600">{job.company}</p>
                  </div>
                  {isJobExpired(job.expiryDate) && <span className="text-red-500 text-sm font-semibold">Expired</span>}
                </div>

                <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <span className="mr-2">🕒</span>
                    {job.experience}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">📍</span>
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">💼</span>
                    {job.type}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2">💰</span>
                    {job.salary}
                  </div>
                </div>

                <p className="mt-2 text-sm text-gray-600">{job.description}</p>

                <div className="mt-2" aria-label="Job Skills">
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(job.skills)
                      ? job.skills
                      : typeof job.skills === "string"
                        ? job.skills.split(",")
                        : []
                    ).map((skill, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-100 text-sm rounded">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-500">Posted {new Date(job.postedAt).toLocaleDateString()}</div>
                <div className="mt-1 text-sm text-gray-500">
                  Expires {new Date(job.expiryDate).toLocaleDateString()}
                </div>
                <div className="mt-4 flex space-x-4">
                  {job.approved ? (
                    <button
                      onClick={() => handleViewApplication(job.id)}
                      className={`text-white px-4 py-2 rounded ${
                        isJobExpired(job.expiryDate)
                          ? "bg-blue-500 hover:bg-blue-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      View Application
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditJob(job.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                    >
                      Edit Job
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </div>
    </div>
  )
}

