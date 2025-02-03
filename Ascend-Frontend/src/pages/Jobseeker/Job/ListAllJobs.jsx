import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import BASE_URL from '../../../api/BaseUrl';


export default function ListAllJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    workMode: {},
    location: {},
    salary: {},
    skills: {}
  });
  const [sortOption, setSortOption] = useState('latest');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState(new Set()); // Added state for applied jobs
  const pageSize = 10; // Number of jobs per page
  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, []);

  useEffect(() => {
    applyFiltersAndSort();
  }, [jobs, filters, sortOption]);

  useEffect(() => {
    fetchAppliedJobs();
  }, []); // Added useEffect to fetch applied jobs

  const fetchJobs = async () => {
    // const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/api/jobs/listalljob`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (response.ok) {
        const data = await response.json();
        setJobs(data.map(job => ({ ...job, hasApplied: job.hasApplied || false })));
        
        // Initialize filters
        const newFilters = {
          workMode: {},
          location: {},
          salary: {},
          skills: {}
        };
        data.forEach(job => {
          newFilters.workMode[job.type] = false;
          newFilters.location[job.location] = false;
          newFilters.salary[getSalaryRange(job.salary)] = false;
          
          const skillsArray = Array.isArray(job.skills) 
            ? job.skills 
            : typeof job.skills === 'string' 
              ? job.skills.split(',') 
              : [];
          
          skillsArray.forEach(skill => {
            newFilters.skills[skill.trim()] = false;
          });
        });
        setFilters(newFilters);
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Failed to fetch jobs. Please try again.'+appliedJobs);
      }
    } catch (error) {
      setError('Failed to fetch jobs. Please try again.'+error);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
      acc[key] = Object.keys(value).filter(k => value[k]);
      return acc;
    }, {});

    let filtered = jobs.filter(job => {
      return Object.entries(activeFilters).every(([key, values]) => {
        if (values.length === 0) return true;
        if (key === 'workMode') return values.includes(job.type);
        if (key === 'salary') return values.includes(getSalaryRange(job.salary));
        if (key === 'skills') {
          const jobSkills = Array.isArray(job.skills) 
            ? job.skills 
            : typeof job.skills === 'string' 
              ? job.skills.split(',').map(s => s.trim())
              : [];
          return values.some(skill => jobSkills.includes(skill));
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
  };

  const getSalaryRange = (salary) => {
    if (salary < 300000) return '0 - 3 Lakhs';
    if (salary < 600000) return '3 - 6 Lakhs';
    if (salary < 1000000) return '6 - 10 Lakhs';
    return '10+ Lakhs';
  };

  const isJobExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleSaveLater = async (jobId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/api/jobseeker/savejob`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId }),
      });

      if (response.ok) {
        alert('Job saved successfully!');
      } 
      else {
        alert('Failed to save job. Please try again.');
      }
    } catch (error) {
      console.error('Error saving job:', error);
      alert('An error occurred while saving the job.');
    }
  };

  const handleApplyNow = (jobId) => {
    navigate(`/jobseeker/apply-job/${jobId}`);
  };

  const fetchAppliedJobs = async () => { // Added function to fetch applied jobs
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/applications/applied`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAppliedJobs(new Set(data.map(app => app.jobPost.id)));
      }
    } catch (error) {
      console.error('Error fetching applied jobs:', error);
    }
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

  return (
    <div className="flex mt-32 min-h-screen bg-gray-50">
      {/* Filters Sidebar */}
      <div className="w-64 p-4 bg-white border-r">
        <h2 className="font-bold mb-4">ALL FILTERS</h2>

        {Object.entries(filters).map(([filterType, filterValues]) => (
          <div key={filterType} className="mb-6">
            <h3 className="text-sm text-gray-500 mb-2 uppercase">{filterType}</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {Object.entries(filterValues).map(([value, isChecked]) => (
                <label key={value} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={isChecked}
                    onChange={() => handleFilterChange(filterType, value)}
                  />
                  <span className="text-sm">{value}</span>
                </label>
              ))}
            </div>
          </div>
        ))}

        {/* Sorting Options */}
        <div className="mt-6">
          <h3 className="text-sm text-gray-500 mb-2 uppercase">Sort By</h3>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="w-full p-2 border rounded text-sm"
          >
            <option value="latest">Latest</option>
            <option value="thisMonth">This Month</option>
            <option value="thisWeek">This Week</option>
          </select>
        </div>
      </div>

      {/* Jobs List */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">ALL JOBS</h1>
        <div className="space-y-4">
          {paginatedJobs.map((job) => (
            <div 
              key={job.id} 
              className="bg-white p-6 rounded-lg shadow-sm border"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{job.position}</h2>
              <p className="text-gray-600 mb-4">{job.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{job.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg> */}
                  <span className="mr-2">💼</span>
                  <span className="text-gray-600">{job.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                  </svg> */}
                  <span className="mr-2">🎓</span>
                  <span className="text-gray-600">{job.education}</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-700" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-600">{job.salary}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-gray-900 font-semibold mb-2">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(job.skills) ? job.skills : (typeof job.skills === 'string' ? job.skills.split(',') : []))
                    .map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1  bg-blue-50 text-blue-700 rounded-full text-sm"
                      >
                        {skill.trim()}
                      </span>
                    ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div>Posted {new Date(job.postedAt).toLocaleDateString()}</div>
                <div>Expires on {new Date(job.expiryDate).toLocaleDateString()}</div>
              </div>

              {!isJobExpired(job.expiryDate) && (
                <div className="mt-4 flex justify-end space-x-2">
                  {!job.hasApplied && !job.hasSaved && (
                    <button
                      onClick={() => handleSaveLater(job.id)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Save Later
                    </button>
                  )}
                  {!job.hasApplied && (
                    <button
                      onClick={() => handleApplyNow(job.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Apply Now
                    </button>
                  )}
                  {job.hasApplied && (
                    <span className="px-4 py-2 bg-green-50 text-green-700 rounded-lg">Applied</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}

