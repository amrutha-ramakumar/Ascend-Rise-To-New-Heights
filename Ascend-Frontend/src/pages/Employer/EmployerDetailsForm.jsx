// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import BASE_URL from '../../api/BaseUrl';

// const EmployerDetailsForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     companyName: '',
//     companyWebsite: '',
//     companyAddress: '',
//     industryId: ''
//   });
//   const [error, setError] = useState('');
//   const [industries, setIndustries] = useState([]);

//   // Fetch the list of industry types
//   useEffect(() => {
//     const fetchIndustries = async () => {
//       try {
//         const response = await fetch(`${BASE_URL}/industry`);
//         const data = await response.json();
//         setIndustries(data);
//       } catch (error) {
//         console.error('Failed to fetch industry types:', error);
//       }
//     };

//     fetchIndustries();

//     // Get token for future use
//     const token = localStorage.getItem('token');
//     console.log('JWT Token:', token);
//   }, []);

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     console.log(formData);

//     try {
//       const response = await fetch(`${BASE_URL}/api/employers/details`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(formData),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log(data);
//         navigate('/employer/employer-plans');
//       } else {
//         const errorData = await response.json();
//         setError(errorData.message || 'An error occurred while submitting the form. Please try again.');
//       }
//     } catch (error) {
//       console.error('Failed to submit employer details:', error);
//       setError('An unexpected error occurred. Please check your network and try again.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
//       <div className="sm:mx-auto sm:w-full sm:max-w-md">
//         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//           Complete Your Employer Profile
//         </h2>
//       </div>

//       <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//         <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//           {error && (
//             <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
//               {error}
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             <div>
//               <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
//                 Company Name
//               </label>
//               <input
//                 type="text"
//                 name="companyName"
//                 id="companyName"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 value={formData.companyName}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
//                 Company Website
//               </label>
//               <input
//                 type="url"
//                 name="companyWebsite"
//                 id="companyWebsite"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 value={formData.companyWebsite}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">
//                 Company Address
//               </label>
//               <input
//                 type="text"
//                 name="companyAddress"
//                 id="companyAddress"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 value={formData.companyAddress}
//                 onChange={handleChange}
//               />
//             </div>

//             <div>
//               <label htmlFor="industryType" className="block text-sm font-medium text-gray-700">
//                 Industry Type
//               </label>
//               <select
//                 name="industryType"
//                 id="industryType"
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
//                 value={formData.industryId}
//                 onChange={handleChange}
//               >
//                 <option value="">Select an industry</option>
//                 {industries.map((industry) => (
//                   <option key={industry.id} value={industry.id}>
//                     {industry.industryType}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Complete Profile
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmployerDetailsForm;


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../../api/BaseUrl';

const EmployerDetailsForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    companyName: '',
    companyWebsite: '',
    companyAddress: '',
    industryId: ''
  });
  const [error, setError] = useState('');
  const [industries, setIndustries] = useState([]);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await fetch(`${BASE_URL}/industry`);
        if (!response.ok) {
          throw new Error('Failed to fetch industries');
        }
        const data = await response.json();
        setIndustries(data);
      } catch (error) {
        console.error('Failed to fetch industry types:', error);
        setError('Failed to load industries. Please try again later.');
      }
    };

    fetchIndustries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`${BASE_URL}/api/employers/details`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigate('/employer/employer-plans');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred while submitting the form. Please try again.');
      }
    } catch (error) {
      console.error('Failed to submit employer details:', error);
      setError('An unexpected error occurred. Please check your network and try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Complete Your Employer Profile
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                type="text"
                name="companyName"
                id="companyName"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="companyWebsite" className="block text-sm font-medium text-gray-700">
                Company Website
              </label>
              <input
                type="url"
                name="companyWebsite"
                id="companyWebsite"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.companyWebsite}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="companyAddress" className="block text-sm font-medium text-gray-700">
                Company Address
              </label>
              <input
                type="text"
                name="companyAddress"
                id="companyAddress"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.companyAddress}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="industryId" className="block text-sm font-medium text-gray-700">
                Industry Type
              </label>
              <select
                name="industryId"
                id="industryId"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={formData.industryId}
                onChange={handleChange}
              >
                <option value="">Select an industry</option>
                {industries.map((industry) => (
                  <option key={industry.id} value={industry.id}>
                    {industry.industryType}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Complete Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerDetailsForm;

