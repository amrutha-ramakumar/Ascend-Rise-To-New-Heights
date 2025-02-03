import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import BASE_URL from '../../api/BaseUrl';
const EditProfile = () => {
  const [profile, setProfile] = useState(null);
  const [industries, setIndustries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const [profileResponse, industriesResponse] = await Promise.all([
          fetch(`${BASE_URL}/api/employers/getdetails`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }),
          fetch(`${BASE_URL}/industry`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          })
        ]);

        if (!profileResponse.ok || !industriesResponse.ok) {
          throw new Error('Failed to fetch data');
        }

        const profileData = await profileResponse.json();
        const industriesData = await industriesResponse.json();

        setProfile(profileData);
        setIndustries(industriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${BASE_URL}/api/employers/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      navigate('/profile');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value
    }));
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-8">No profile data available.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-20 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField label="First Name" name="firstName" value={profile.firstName} onChange={handleChange} />
          <InputField label="Last Name" name="lastName" value={profile.lastName} onChange={handleChange} />
          <InputField label="Email" name="email" value={profile.email} onChange={handleChange} type="email"/>
          <InputField label="Phone" name="phone" value={profile.phone} onChange={handleChange} />
          <InputField label="Company Name" name="companyName" value={profile.companyName} onChange={handleChange} />
          <InputField label="Company Website" name="companyWebsite" value={profile.companyWebsite} onChange={handleChange} type="url" />
          <InputField label="Company Address" name="companyAddress" value={profile.companyAddress} onChange={handleChange} />
          <div>
            <label htmlFor="industryType" className="block text-sm font-medium text-gray-700 mb-1">Industry Type</label>
            <select
              id="industryType"
              name="industryType"
              value={profile.industryType}
              onChange={handleChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {industries.map((industry) => (
                <option key={industry.id} value={industry.industryType}>
                  {industry.industryType}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/profile')}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    />
  </div>
);
InputField.propTypes = {
    label: PropTypes.string.isRequired,   // Label is required and must be a string
    name: PropTypes.string.isRequired,    // Name is required and must be a string
    value: PropTypes.oneOfType([          // Value can be a string or a number
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,
    onChange: PropTypes.func.isRequired,  // onChange is required and must be a function
    type: PropTypes.string,               // Type is optional and must be a string
  };
  
  InputField.defaultProps = {
    type: "text",  // Default type is "text" if not provided
  };
export default EditProfile;

