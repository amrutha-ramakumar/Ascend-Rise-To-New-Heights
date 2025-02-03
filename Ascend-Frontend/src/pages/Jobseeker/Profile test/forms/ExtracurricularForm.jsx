// import { useState } from 'react';
// import PropTypes from 'prop-types';

// const ExtracurricularForm = ({ activity, onClose }) => {
//   const [formData, setFormData] = useState(
//     activity || {
//       activityName: '',
//       description: '',
//       achievementDate: '',
//     }
//   );

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) {
//       console.error('No authentication token found');
//       return;
//     }

//     try {
//       const url = activity
//         ? `http://localhost:8080/api/jobseeker/extracurricular/${activity.id}`
//         : 'http://localhost:8080/api/jobseeker/extracurricular';
//       const method = activity ? 'PUT' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to save extracurricular activity');
//       }

//       onClose();
//     } catch (error) {
//       console.error('Error saving extracurricular activity:', error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label htmlFor="activityName" className="block text-sm font-medium text-gray-700">Activity Name</label>
//         <input
//           type="text"
//           id="activityName"
//           name="activityName"
//           value={formData.activityName}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div>
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
//         <textarea
//           id="description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           required
//           rows="4"
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         ></textarea>
//       </div>
//       <div>
//         <label htmlFor="achievementDate" className="block text-sm font-medium text-gray-700">Achievement Date</label>
//         <input
//           type="date"
//           id="achievementDate"
//           name="achievementDate"
//           value={formData.achievementDate}
//           onChange={handleChange}
//           required
//           className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
//         />
//       </div>
//       <div className="flex justify-end space-x-2">
//         <button
//           type="button"
//           onClick={onClose}
//           className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Cancel
//         </button>
//         <button
//           type="submit"
//           className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//         >
//           Save
//         </button>
//       </div>
//     </form>
//   );
// };
// ExtracurricularForm.propTypes = {
//     activity: PropTypes.shape({
//       id: PropTypes.string,
//       activityName: PropTypes.string,
//       description: PropTypes.string,
//       achievementDate: PropTypes.string,
//     }),
//     onClose: PropTypes.func.isRequired,
//   };
// export default ExtracurricularForm;

import { useState } from 'react';
import PropTypes from 'prop-types';

const ExtracurricularForm = ({ activity, onClose }) => {
  const [formData, setFormData] = useState(
    activity || {
      activityName: '',
      description: '',
      achievementDate: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No authentication token found');
      return;
    }

    try {
      const url = activity
        ? `http://localhost:8080/api/extracurricular/${activity.id}`
        : 'http://localhost:8080/api/extracurricular';
      const method = activity ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save extracurricular activity');
      }

      onClose();
    } catch (error) {
      console.error('Error saving extracurricular activity:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">{activity ? 'Edit Extracurricular' : 'Add Extracurricular'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="activityName" className="text-sm font-medium text-gray-700">Activity Name</label>
          <input
            type="text"
            id="activityName"
            name="activityName"
            value={formData.activityName}
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>
        <div className="flex flex-col">
          <label htmlFor="achievementDate" className="text-sm font-medium text-gray-700">Achievement Date</label>
          <input
            type="date"
            id="achievementDate"
            name="achievementDate"
            value={formData.achievementDate}
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex justify-between items-center space-x-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-600 text-white rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

ExtracurricularForm.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string,
    activityName: PropTypes.string,
    description: PropTypes.string,
    achievementDate: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default ExtracurricularForm;
