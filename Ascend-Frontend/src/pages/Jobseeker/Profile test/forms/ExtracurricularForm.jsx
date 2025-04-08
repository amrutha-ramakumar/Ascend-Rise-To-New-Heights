

import { useState } from 'react';
import PropTypes from 'prop-types';
import BASE_URL from '../../../../api/BaseUrl';
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
        ? `${BASE_URL}/api/extracurricular/${activity.id}`
        : `${BASE_URL}/api/extracurricular`;
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
