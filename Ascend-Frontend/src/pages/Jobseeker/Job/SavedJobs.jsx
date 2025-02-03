// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Pagination from '../../../components/Pagination';
// import BASE_URL from '../../../api/BaseUrl';

// export default function SavedJobs() {
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
//       const response = await fetch(`${BASE_URL}/api/jobseeker/saved-jobs?page=0&size=1000`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         // Filter jobs to only include those with 'Active' status
//         const activeJobs = data.content;
//         console.log('All jobs (including non-active):', activeJobs);
//         setAllJobs(activeJobs);
        
//         // Initialize filters
//         const newFilters = {
//           location: {},
//           position: {},
//           type: {},
//           salary: {},
//           skills: {}
//         };
//         activeJobs.forEach(job => {
//           newFilters.location[job.location] = false;
//           newFilters.position[job.position] = false;
//           newFilters.type[job.type] = false;
//           newFilters.salary[getSalaryRange(job.salary)] = false;
          
//           const skillsArray = Array.isArray(job.skills) 
//             ? job.skills 
//             : typeof job.skills === 'string' 
//               ? job.skills.split(',') 
//               : [];
          
//           skillsArray.forEach(skill => {
//             newFilters.skills[skill.trim()] = false;
//           });
//         });
//         setFilters(newFilters);
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

//     // Apply sorting
//     filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

//     if (sortOption === 'thisMonth') {
//       const oneMonthAgo = new Date(currentDate);
//       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
//       filtered = filtered.filter(job => new Date(job.postedAt) >= oneMonthAgo);
//     } else if (sortOption === 'thisWeek') {
//       const oneWeekAgo = new Date(currentDate);
//       oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
//       filtered = filtered.filter(job => new Date(job.postedAt) >= oneWeekAgo);
//     }

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
//     applyFiltersAndSort();
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

//   const handleApplyNow = (jobId) => {
//     navigate(`/jobseeker/apply-job/${jobId}`);
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
//     <div className="min-h-screen mt-24 bg-gray-50 p-6">
//       <h1 className="text-2xl font-bold mb-6">SAVED JOBS</h1>

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

//           {/* Sorting Options */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-lg font-semibold mb-4">Sort By</h2>
//             <select
//               value={sortOption}
//               onChange={handleSortChange}
//               className="w-full p-2 border rounded"
//             >
//               <option value="latest">Latest</option>
//               <option value="thisMonth">This Month</option>
//               <option value="thisWeek">This Week</option>
//             </select>
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
//                     <span className="text-red-500 text-sm">Expired</span>
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

//                 {/* Apply Now button */}
//                 <div className="mt-4">
//                 {!isJobExpired(job.expiryDate) && (
//                     <button
//                     onClick={() => handleApplyNow(job.id)}
//                     className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//                   >
//                     Apply Now
//                   </button>
//                   )}
                  
//                 </div>
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

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import BASE_URL from '../../../api/BaseUrl';

export default function SavedJobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    location: {},
    position: {},
    salary: {},
    skills: {}
  });
  const [sortOption, setSortOption] = useState('latest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pageSize = 3; // Number of jobs per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [allJobs, filters, sortOption]);

  const fetchJobs = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/jobseeker/saved-jobs?page=0&size=1000`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const activeJobs = data.content.filter(job => !job.deleted);
        setAllJobs(activeJobs);
        
        // Initialize filters
        const newFilters = {
          location: {},
          position: {},
          salary: {},
          skills: {}
        };
        
        activeJobs.forEach(job => {
          newFilters.location[job.location] = false;
          newFilters.position[job.position] = false;
          newFilters.salary[job.salary] = false;
          
          if (Array.isArray(job.skills)) {
            job.skills.forEach(skill => {
              newFilters.skills[skill] = false;
            });
          }
        });
        setFilters(newFilters);
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Failed to fetch jobs. Please try again.');
      }
    } catch (error) {
      setError('Failed to fetch jobs. Please try again.' + error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      acc[key] = Object.keys(value).filter(k => value[k]);
      return acc;
    }, {});

    let filtered = allJobs.filter(job => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (values.length === 0) return true;
        if (key === 'skills') {
          return values.some(skill => job.skills.includes(skill));
        }
        return values.includes(job[key]);
      });
    });

    const currentDate = new Date();

    // Apply sorting
    filtered.sort((a, b) => new Date(b.postedAt) - new Date(a.postedAt));

    if (sortOption === 'thisMonth') {
      const oneMonthAgo = new Date(currentDate);
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);
      filtered = filtered.filter(job => new Date(job.postedAt) >= oneMonthAgo);
    } else if (sortOption === 'thisWeek') {
      const oneWeekAgo = new Date(currentDate);
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      filtered = filtered.filter(job => new Date(job.postedAt) >= oneWeekAgo);
    }

    setFilteredJobs(filtered);
    setTotalPages(Math.ceil(filtered.length / pageSize));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: {
        ...prev[filterType],
        [value]: !prev[filterType][value]
      }
    }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    applyFiltersAndSort();
  };

  const isJobExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const handleApplyNow = (jobId) => {
    navigate(`/jobseeker/apply-job/${jobId}`);
  };

  const paginatedJobs = filteredJobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-6 text-red-500">{error}</div>;
  }

  if (filteredJobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <img src='/src/assets/NoData.png' alt="No saved jobs" className="w-1/2 max-w-md" />
        <h2 className="text-lg font-semibold mt-4">No saved jobs found.</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-24 bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">SAVED JOBS</h1>

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

          {/* Sorting Options */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Sort By</h2>
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="w-full p-2 border rounded"
            >
              <option value="latest">Latest</option>
              <option value="thisMonth">This Month</option>
              <option value="thisWeek">This Week</option>
            </select>
          </div>
        </div>

        {/* Jobs Listing - Right Side */}
        <div className="w-full md:w-3/4">
          <div className="space-y-4">
            {paginatedJobs.map((job) => (
              <div 
                key={job.id} 
                className={`bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow ${
                  isJobExpired(job.expiryDate) ? 'opacity-50' : ''
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{job.position}</h2>
                    <p className="text-gray-600 mt-1">{job.description}</p>
                  </div>
                  {isJobExpired(job.expiryDate) && (
                    <span className="text-red-500 text-sm font-medium px-3 py-1 bg-red-50 rounded-full">
                      Expired
                    </span>
                  )}
                </div>

                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">📍</span>
                    {job.location}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🕒</span>
                    {job.experience} Years
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">🎓</span>
                    {job.education}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span className="mr-2">💰</span>
                    {job.salary}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-600 text-sm rounded-full font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div>
                    <div>Posted: {new Date(job.postedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                    <div>Expires: {new Date(job.expiryDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}</div>
                  </div>

                  {!isJobExpired(job.expiryDate) && !job.hasApplied && (
                    <button
                      onClick={() => handleApplyNow(job.id)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 
                        transition-colors duration-200 focus:outline-none focus:ring-2 
                        focus:ring-blue-500 focus:ring-offset-2"
                    >
                      Apply Now
                    </button>
                  )}
                  {job.hasApplied && (
                    <span className="px-4 py-2 bg-green-50 text-green-600 rounded-full">
                      Applied
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

