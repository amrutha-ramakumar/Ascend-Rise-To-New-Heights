// // import { useState, useEffect } from 'react';
// // import { useParams, Link } from 'react-router-dom';
// // import BASE_URL from '../../../api/BaseUrl';
// // function ViewJob() {
// //   const [job, setJob] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const { applicationId } = useParams();

// //   useEffect(() => {
// //     const fetchJobDetails = async () => {
// //       try {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //           throw new Error('No authentication token found');
// //         }

// //         console.log(`Job ID: ${applicationId}`);
// //         const response = await fetch(`${BASE_URL}/api/applications/${applicationId}`, {
// //           headers: {
// //             'Authorization': `Bearer ${token}`,
// //             'Content-Type': 'application/json',
// //           },
// //         });

  
// //         if (!response.ok) {
// //             console.error(`Error fetching job details: ${response.statusText}`);
// //             throw new Error('Failed to fetch job details');
// //         }
        
// //         const data = await response.json();
// //         console.log(data);
// //         setJob(data);
// //       } catch (err) {
// //         setError(err.message || 'An unknown error occurred');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchJobDetails();
// //   }, [applicationId]);

// //   if (loading) {
// //     return <JobDetailsSkeleton />;
// //   }

// //   if (error) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-6">
// //         <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
// //           <div className="p-6">
// //             <p className="text-red-500">{error}</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!job) {
// //     return (
// //       <div className="min-h-screen bg-gray-50 p-6">
// //         <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
// //           <div className="p-6">
// //             <img src='/src/assets/NoData.png' alt="No saved jobs" className="w-1/2 max-w-md" />
// //             <p>No job details found.</p>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="min-h-screen mt-20 bg-gray-50 p-6">
// //       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
// //         <div className="p-6">
// //           <h1 className="text-2xl font-bold mb-4">{job.position}</h1>
// //           <div className="grid grid-cols-2 gap-4 mb-6">
// //             <div>
// //               <h3 className="font-semibold">Company</h3>
// //               <p>{job.company}</p>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold">Location</h3>
// //               <p>{job.location}</p>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold">Salary</h3>
// //               <p>{job.salary}</p>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold">Job Type</h3>
// //               <p>{job.type}</p>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold">Application Status</h3>
// //               <p className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm inline-block">
// //                 {job.applicationStatus}
// //               </p>
// //             </div>
// //             <div>
// //               <h3 className="font-semibold">Applied Date</h3>
// //               <p>{new Date(job.appliedAt).toLocaleDateString()}</p>
// //             </div>
// //           </div>
// //           <div className="mb-6">
// //             <h3 className="font-semibold mb-2">Job Description</h3>
// //             <p>{job.description}</p>
// //           </div>
// //           {/* <div className="mb-6">
// //             <h3 className="font-semibold mb-2">Requirements</h3>
// //             <ul className="list-disc list-inside">
// //               {job.requirements.map((req, index) => (
// //                 <li key={index}>{req}</li>
// //               ))}
// //             </ul>
// //           </div> */}
// //           <div className="flex justify-between items-center">
// //             <p className="text-sm text-gray-500">
// //               Expires on: {new Date(job.expiryDate).toLocaleDateString()}
// //             </p>
// //             <Link
// //               to="/jobseeker/my-jobs"
// //               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
// //             >
// //               Back to Applied Jobs
// //             </Link>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // function JobDetailsSkeleton() {
// //   return (
// //     <div className="min-h-screen bg-gray-50 p-6">
// //       <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
// //         <div className="p-6">
// //           <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
// //           <div className="grid grid-cols-2 gap-4 mb-6">
// //             {[...Array(6)].map((_, i) => (
// //               <div key={i}>
// //                 <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
// //                 <div className="h-4 bg-gray-200 rounded w-3/4"></div>
// //               </div>
// //             ))}
// //           </div>
// //           <div className="mb-6">
// //             <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
// //             <div className="h-20 bg-gray-200 rounded w-full"></div>
// //           </div>
// //           <div className="mb-6">
// //             <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
// //             <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
// //             <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
// //             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
// //           </div>
// //           <div className="flex justify-between items-center">
// //             <div className="h-4 bg-gray-200 rounded w-1/3"></div>
// //             <div className="h-10 bg-gray-200 rounded w-40"></div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default ViewJob;

// import { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

// import { 
//   CalendarIcon, 
//   MapPinIcon, 
//   BriefcaseIcon, 
//   AcademicCapIcon, 
//   CurrencyDollarIcon, 
//   ClockIcon, 
//   BuildingOfficeIcon ,
//   ChatBubbleLeftIcon
// } from '@heroicons/react/24/outline';
// import BASE_URL from '../../../api/BaseUrl';

// function ViewJob() {
//   const [job, setJob] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const { applicationId } = useParams();

//   useEffect(() => {
//     const fetchJobDetails = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error('No authentication token found');
//         }

//         const response = await fetch(`${BASE_URL}/api/applications/${applicationId}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch job details');
//         }
        
//         const data = await response.json();
//         setJob(data);
//       } catch (err) {
//         setError(err.message || 'An unknown error occurred');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchJobDetails();
//   }, [applicationId]);

//   if (loading) {
//     return <JobDetailsSkeleton />;
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//           <div className="p-6">
//             <p className="text-red-500">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!job) {
//     return (
//       <div className="min-h-screen bg-gray-50 p-6">
//         <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
//           <div className="p-6 text-center">
//             <img src='/src/assets/NoData.png' alt="No job details" className="w-1/2 max-w-md mx-auto mb-4" />
//             <p className="text-gray-600">No job details found.</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6 pt-20">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
//         <div className="bg-blue-600 p-6 text-white">
//           <div className="flex items-center justify-between">
//             <h1 className="text-3xl font-bold">{job.position}</h1>
//             <div className="bg-blue-500 text-sm px-3 py-1 rounded-full">
//               {job.applicationStatus}
//             </div>
//           </div>
//           <div className="mt-2 flex items-center">
//             <BuildingOfficeIcon className="h-5 w-5 mr-2" />
//             <span className="text-xl">{job.company}</span>
//             <span className="text-xl px-2">
//             <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
//             </span>
//           </div>
          
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <InfoItem icon={<MapPinIcon className="h-5 w-5" />} label="Location" value={job.location} />
//             <InfoItem icon={<CurrencyDollarIcon className="h-5 w-5" />} label="Salary" value={job.salary} />
//             <InfoItem icon={<BriefcaseIcon className="h-5 w-5" />} label="Experience" value={`${job.experience} years`} />
//             <InfoItem icon={<AcademicCapIcon className="h-5 w-5" />} label="Education" value={job.education} />
//             <InfoItem icon={<CalendarIcon className="h-5 w-5" />} label="Applied On" value={formatDate(job.appliedAt)} />
//             <InfoItem icon={<ClockIcon className="h-5 w-5" />} label="Expires On" value={formatDate(job.expiryDate)} />
//           </div>
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Job Description</h3>
//             <p className="text-gray-600">{job.description}</p>
//           </div>
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
//             <div className="flex flex-wrap gap-2">
//               {job.skills.map((skill, index) => (
//                 <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-2">Industry</h3>
//             <p className="text-gray-600">{job.industryName}</p>
//           </div>
//           <div className="flex justify-between items-center">
//             <p className="text-sm text-gray-500">
//               Posted on: {formatDate(job.postedAt)}
//             </p>
//             <Link
//               to="/jobseeker/my-jobs"
//               className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
//             >
//               Back to Applied Jobs
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function InfoItem({ icon, label, value }) {
//   return (
//     <div className="flex items-center">
//       <div className="text-blue-600 mr-3">{icon}</div>
//       <div>
//         <p className="text-sm text-gray-500">{label}</p>
//         <p className="font-medium">{value}</p>
//       </div>
//     </div>
//   );
// }

// function formatDate(dateString) {
//   return new Date(dateString).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });
// }

// function JobDetailsSkeleton() {
//   return (
//     <div className="min-h-screen bg-gray-50 p-6 pt-20">
//       <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
//         <div className="bg-blue-600 p-6">
//           <div className="h-8 bg-blue-500 rounded w-3/4 mb-4"></div>
//           <div className="h-6 bg-blue-500 rounded w-1/2"></div>
//         </div>
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {[...Array(6)].map((_, i) => (
//               <div key={i} className="flex items-center">
//                 <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
//                 <div>
//                   <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
//                   <div className="h-4 bg-gray-200 rounded w-32"></div>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="mb-6">
//             <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
//             <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
//             <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
//             <div className="h-4 bg-gray-200 rounded w-3/4"></div>
//           </div>
//           <div className="mb-6">
//             <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
//             <div className="flex flex-wrap gap-2">
//               {[...Array(4)].map((_, i) => (
//                 <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-between items-center">
//             <div className="h-4 bg-gray-200 rounded w-40"></div>
//             <div className="h-10 bg-gray-200 rounded-full w-48"></div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// InfoItem.propTypes = {
//   icon: PropTypes.node.isRequired, // icon can be any valid React node (e.g., JSX, string, element)
//   label: PropTypes.string.isRequired, // label should be a string and required
//   value: PropTypes.string.isRequired, // value should be a string and required
// };
// export default ViewJob;

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { 
  CalendarIcon, 
  MapPinIcon, 
  BriefcaseIcon, 
  AcademicCapIcon, 
  CurrencyDollarIcon, 
  ClockIcon, 
  BuildingOfficeIcon,
  ChatBubbleLeftIcon 
} from '@heroicons/react/24/outline';
import BASE_URL from '../../../api/BaseUrl';

function ViewJob() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chat, setChat] = useState(null); // To store chat data
  const { applicationId } = useParams();

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No authentication token found');
        }

        // Fetch job details
        const jobResponse = await fetch(`${BASE_URL}/api/applications/${applicationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!jobResponse.ok) {
          throw new Error('Failed to fetch job details');
        }
        
        const jobData = await jobResponse.json();
        setJob(jobData);

        // Fetch chat details
        const chatResponse = await fetch(`${BASE_URL}/api/chat?applicationId=${applicationId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!chatResponse.ok) {
          setChat(null); // If there's no chat, set chat state to null
        } else {
          const chatData = await chatResponse.json();
          setChat(chatData); // Set chat data if found
          console.log(chatData);
        }
      } catch (err) {
        setError(err.message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [applicationId]);

  if (loading) {
    return <JobDetailsSkeleton />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
          <div className="p-6">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg">
          <div className="p-6 text-center">
            <img src='/src/assets/NoData.png' alt="No job details" className="w-1/2 max-w-md mx-auto mb-4" />
            <p className="text-gray-600">No job details found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{job.position}</h1>
            <div className="bg-blue-500 text-sm px-3 py-1 rounded-full">
              {job.applicationStatus}
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <BuildingOfficeIcon className="h-5 w-5 mr-2" />
            <span className="text-xl">{job.company}</span>
            {/* {chat ? (
              <span className="text-xl px-2">
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
              </span>
            ) : (
              <p className="text-sm text-gray-500">No chat found for this application</p>
            )} */}
            {chat ? (
              <Link to={`/chat/${chat.id}`} className="text-xl px-2 text-white">
                <ChatBubbleLeftIcon className="h-5 w-5 mr-2" />
                
              </Link>
            ) : (
              <p className="text-sm text-blue-600">No chat found for this application</p>
            )}
          </div>
          
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <InfoItem icon={<MapPinIcon className="h-5 w-5" />} label="Location" value={job.location} />
            <InfoItem icon={<CurrencyDollarIcon className="h-5 w-5" />} label="Salary" value={job.salary} />
            <InfoItem icon={<BriefcaseIcon className="h-5 w-5" />} label="Experience" value={`${job.experience} years`} />
            <InfoItem icon={<AcademicCapIcon className="h-5 w-5" />} label="Education" value={job.education} />
            <InfoItem icon={<CalendarIcon className="h-5 w-5" />} label="Applied On" value={formatDate(job.appliedAt)} />
            <InfoItem icon={<ClockIcon className="h-5 w-5" />} label="Expires On" value={formatDate(job.expiryDate)} />
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Job Description</h3>
            <p className="text-gray-600">{job.description}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Industry</h3>
            <p className="text-gray-600">{job.industryName}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Posted on: {formatDate(job.postedAt)}
            </p>
            <Link
              to="/jobseeker/my-jobs"
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Back to Applied Jobs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }) {
  return (
    <div className="flex items-center">
      <div className="text-blue-600 mr-3">{icon}</div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

function JobDetailsSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 pt-20">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="bg-blue-600 p-6">
          <div className="h-8 bg-blue-500 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-blue-500 rounded w-1/2"></div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 rounded-full mr-3"></div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-32"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="mb-6">
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="flex flex-wrap gap-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-8 bg-gray-200 rounded-full w-20"></div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-4 bg-gray-200 rounded w-40"></div>
            <div className="h-10 bg-gray-200 rounded-full w-48"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

InfoItem.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

export default ViewJob;
