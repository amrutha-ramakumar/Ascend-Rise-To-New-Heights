import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BASE_URL from '../../api/BaseUrl'
import Pagination from '../../components/Pagination';
import { BriefcaseIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const EmployerDashboard = () => {
  // const { logout } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [jobsData, setJobsData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [dashboardResponse, jobsResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/employers/dashboard`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${BASE_URL}/api/jobs/listactivejobs?page=${currentPage - 1}&size=10`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        if (!dashboardResponse.ok || !jobsResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const dashboardData = await dashboardResponse.json();
        const jobsData = await jobsResponse.json();

        setDashboardData(dashboardData);
        setJobsData(jobsData);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center text-lg">{error}</div>;
  }

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-100 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900">Employer Dashboard</h1>
          {/* <button
            onClick={logout}
            className="px-6 py-3 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all shadow-lg"
          >
            Logout
          </button> */}
        </div>

        {/* Welcome Message */}
        <div className="bg-white border-l-4 border-white p-6 mb-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-black mb-4">Welcome to Ascend: Rise to New Heights</h2>
          <p className="text-black-700 text-lg">
            Explore the opportunity to find brilliant minds and shape the future of your organization.
            Your journey to building an exceptional team starts here!
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <DashboardCard
            title="Total Jobs"
            value={dashboardData.totalJobs}
            icon={<BriefcaseIcon className="h-10 w-10 text-blue-600" />}
          />
          <DashboardCard
            title="Total Applications"
            value={dashboardData.totalApplications}
            icon={<UserGroupIcon className="h-10 w-10 text-green-600" />}
          />
        </div>

        {/* Jobs Table */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="px-6 py-4 bg-blue-900 text-white border-b border-gray-200">
            <h2 className="text-2xl font-bold">Recent Job Postings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-blue-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Position</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Location</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Experience</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Posted At</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Expiry Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {jobsData.content.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{job.position}</div>
                      <div className="text-sm text-gray-500">{job.skills.join(', ')}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">{job.location}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{job.experience} years</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(job.postedAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{new Date(job.expiryDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
            <Pagination
              currentPage={currentPage}
              totalPages={jobsData.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-white to-white text-black rounded-xl shadow-md p-6 flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  </div>
);

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  icon: PropTypes.node.isRequired
};

export default EmployerDashboard;
