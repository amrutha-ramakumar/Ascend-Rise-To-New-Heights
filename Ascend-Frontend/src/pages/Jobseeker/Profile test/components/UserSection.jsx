import PropTypes from 'prop-types';
import { FiMail, FiPhone, FiLinkedin, FiGlobe, FiEye } from 'react-icons/fi';

const UserSection = ({ user, profile }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="h-32 bg-gradient-to-r from-black to-black"></div>
      <div className="relative px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-center">
          <div className="relative -mt-16">
            <div className="w-32 h-32 rounded-full border-4 border-white bg-gray-200 overflow-hidden">
              {/* Placeholder avatar using initials */}
              <div className="w-full h-full flex items-center justify-center bg-blue-100 text-blue-600 text-3xl font-bold">
                {user.firstName[0]}{user.lastName[0]}
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-0 sm:ml-6 text-center sm:text-left flex-grow">
            <h1 className="text-2xl font-bold text-gray-900">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 border border-blue-600 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                <FiEye className="mr-2" />
                View Resume
              </a>
              <a
                href={`mailto:${user.email}`}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiMail className="mr-2" />
                Contact
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-gray-200 pt-6">
          <div className="flex items-center">
            <FiPhone className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{user.phone}</span>
          </div>
          <div className="flex items-center">
            <FiMail className="text-gray-400 mr-2" />
            <span className="text-sm text-gray-600">{user.email}</span>
          </div>
          <div className="flex items-center">
            <FiLinkedin className="text-gray-400 mr-2" />
            <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
              LinkedIn Profile
            </a>
          </div>
          <div className="flex items-center">
            <FiGlobe className="text-gray-400 mr-2" />
            <a href={profile.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
              Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

UserSection.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired,
  profile: PropTypes.shape({
    resumeUrl: PropTypes.string.isRequired,
    linkedinUrl: PropTypes.string.isRequired,
    portfolioUrl: PropTypes.string.isRequired
  }).isRequired
};

export default UserSection;

