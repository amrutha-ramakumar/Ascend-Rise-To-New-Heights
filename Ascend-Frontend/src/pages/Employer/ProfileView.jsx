import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PencilIcon, BuildingOfficeIcon, GlobeAltIcon, MapPinIcon, BriefcaseIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../contexts/AuthContexts';
import PropTypes from 'prop-types';
import BASE_URL from '../../api/BaseUrl';

const ProfileView = () => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await fetch(`${BASE_URL}/api/employers/getdetails`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchProfile();
    } else {
      setError('User is not authenticated');
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600 font-bold">{error}</div>;
  }

  if (!profile) {
    return <div className="text-center mt-8">No profile data available.</div>;
  }

  return (
    <div className="max-w-5xl mt-24 mx-auto   bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 mb-4 to-indigo-500 text-white p-8">
        <div className="flex items-center">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 shadow-lg border-4 border-white">
            <img
              src={profile.imageUrl || '/src/assets/image.png?height=128&width=128'}
              alt={`${profile.firstName} ${profile.lastName}`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-3xl font-bold">{profile.firstName} {profile.lastName}</h1>
            <p className="text-lg">{profile.companyName}</p>
          </div>
        </div>
      </div>

      {/* Edit Button */}
      <div className="p-6 flex justify-end">
        <button
          onClick={() => navigate('/edit')}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md flex items-center"
        >
          <PencilIcon className="h-5 w-5 mr-2" />
          Edit Profile
        </button>
      </div>

      {/* Profile Details */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoItem icon={<BuildingOfficeIcon className="h-5 w-5" />} label="Company Name" value={profile.companyName} />
        <InfoItem icon={<GlobeAltIcon className="h-5 w-5" />} label="Company Website" value={profile.companyWebsite} isLink />
        <InfoItem icon={<MapPinIcon className="h-5 w-5" />} label="Company Address" value={profile.companyAddress} />
        <InfoItem icon={<BriefcaseIcon className="h-5 w-5" />} label="Industry Type" value={profile.industryType} />
        <InfoItem label="Email" value={profile.email} />
        <InfoItem label="Phone" value={profile.phone} />
        <InfoItem label="Gender" value={profile.gender} />
      </div>
    </div>
  );
};

const InfoItem = ({ icon, label, value, isLink }) => (
  <div className="flex items-start p-4 bg-gray-50 rounded-lg shadow-md">
    {icon && <div className="mr-3 text-gray-500">{icon}</div>}
    <div>
      <label className="block text-sm font-medium text-gray-600">{label}</label>
      <div className="mt-1 text-gray-800">
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  </div>
);

InfoItem.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLink: PropTypes.bool,
};

InfoItem.defaultProps = {
  icon: null,
  isLink: false,
};

export default ProfileView;
