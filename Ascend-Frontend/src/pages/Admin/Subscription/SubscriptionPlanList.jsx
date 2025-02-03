import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../../api/BaseUrl';
import Pagination from '../../../components/Pagination';

export default function SubscriptionPlanList() {
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userTypeFilter, setUserTypeFilter] = useState('');
  const navigate = useNavigate();

  const fetchPlans = useCallback(async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    try {
      const url = `${BASE_URL}/api/subscription-plans?page=${currentPage - 1}&size=10`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch subscription plans');
      }

      const data = await response.json();
      setPlans(data.content);
      setFilteredPlans(data.content);
      setTotalPages(data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleUserTypeFilter = (e) => {
    const filterValue = e.target.value;
    setUserTypeFilter(filterValue);
    if (filterValue) {
      setFilteredPlans(plans.filter((plan) => plan.userType === filterValue));
    } else {
      setFilteredPlans(plans);
    }
  };

  const parseFeatures = (featuresString) => {
    try {
      const features = JSON.parse(featuresString);
      return Object.values(features).join(', ');
    } catch (e) {
      console.error('Error parsing features:', e);
      return featuresString;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <button 
          onClick={() => navigate('/admin/subscription-plans/new')}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create New Plan
        </button>
      </div>
      {filteredPlans.length === 0 ? (
  <div className="flex flex-col  mt-10 items-center justify-center mt-10">
    <img 
      src="/src/assets/NoData.png" 
      alt="No Data" 
      className="w-64 h-64 object-contain"
    />
    <p className="text-gray-500 text-xl mt-4">No subscription plans available.</p>
  </div>
) : (<>      <div className="mb-6">
        <select
          value={userTypeFilter}
          onChange={handleUserTypeFilter}
          className="border p-2 rounded"
        >
          <option value="">All User Types</option>
          <option value="employer">Employer</option>
          <option value="jobseeker">Job Seeker</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plan Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration (days)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPlans.map((plan) => (
              <tr key={plan.id}>
                <td className="px-6 py-4 whitespace-nowrap">{plan.planName}</td>
                <td className="px-6 py-4 whitespace-nowrap capitalize">{plan.userType}</td>
                <td className="px-6 py-4 whitespace-nowrap">₹{plan.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{plan.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">{parseFeatures(plan.features)}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${plan.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {plan.is_active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => navigate(`/admin/subscription-plans/edit/${plan.id}`)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div></>
)}
    </div>
  );
}
