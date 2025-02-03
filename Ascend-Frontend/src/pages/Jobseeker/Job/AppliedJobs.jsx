// pagination and search in table form and link 
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../../../components/Pagination';
import BASE_URL from '../../../api/BaseUrl';

export default function AppliedJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const jobsPerPage = 3; // Adjust this value as needed

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${BASE_URL}/api/applications/applied-jobs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch applied jobs');
        }

        const data = await response.json();
        setJobs(data);
        setFilteredJobs(data);
        setTotalPages(Math.ceil(data.length / jobsPerPage));
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const filtered = jobs.filter(job => 
      job.position.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const dateFiltered = filterJobsByDate(filtered);
    setFilteredJobs(dateFiltered);
    setTotalPages(Math.ceil(dateFiltered.length / jobsPerPage));
    setCurrentPage(1);
  }, [searchTerm, dateFilter, jobs]);

  const isJobExpired = (expiryDate) => {
    return new Date(expiryDate) < new Date();
  };

  const filterJobsByDate = (jobsToFilter) => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    return jobsToFilter.filter(job => {
      const appliedDate = new Date(job.appliedAt);
      const timeDiff = startOfToday.getTime() - appliedDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      switch (dateFilter) {
        case 'today':
          return daysDiff === 0;
        case 'thisWeek':
          return daysDiff <= 7;
        case 'thisMonth':
          return daysDiff <= 30;
        default:
          return true;
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-6 text-red-500">{error}</div>;
  }
  if (jobs.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center justify-center">
        <img
          src="/src/assets/NoData.png"  // Replace with your actual image path
          alt="No Data Available"
          className="w-64 h-64"
        />
        <p className="text-gray-600 text-lg mt-4">No jobs found!</p>
      </div>
    );
  }
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className="min-h-screen mt-20 bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">APPLIED JOBS</h1>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Search by job position"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border rounded"
        />
        <select
          value={dateFilter}
          onChange={handleDateFilterChange}
          className="p-2 border rounded"
        >
          <option value="all">All Time</option>
          <option value="today">Today</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-4 text-left">Position</th>
              <th className="py-3 px-4 text-left">Company</th>
              <th className="py-3 px-4 text-left">Location</th>
              <th className="py-3 px-4 text-left">Salary</th>
              <th className="py-3 px-4 text-left">Applied Date</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">View Details</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {currentJobs.map((job) => (
              <tr key={job.id} className={`border-b ${isJobExpired(job.expiryDate) ? 'opacity-50' : ''}`}>
                <td className="py-3 px-4">
                  <div className="font-medium">{job.position}</div>
                  <div className="text-sm text-gray-500">{job.type}</div>
                </td>
                <td className="py-3 px-4">{job.company}</td>
                <td className="py-3 px-4">{job.location}</td>
                <td className="py-3 px-4">{job.salary}</td>
                <td className="py-3 px-4">{new Date(job.appliedAt).toLocaleDateString()}</td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                    {job.applicationStatus}
                  </span>
                </td>
                <td className="py-3 px-4">
                <Link 
                       to={`/jobseeker/view-job/${job.applicationId}`} 
                        className="text-blue-600 hover:text-blue-800 underline"
                >
                    View Details
                </Link>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}



