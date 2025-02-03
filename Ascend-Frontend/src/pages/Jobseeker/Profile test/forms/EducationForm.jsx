import { useState } from 'react';
import PropTypes from 'prop-types';

const EducationForm = ({ education, onClose }) => {
  const [formData, setFormData] = useState(
    education || {
      qualificationLevel: '',
      institutionName: '',
      boardOrUniversity: '',
      fieldOfStudy: '',
      startYear: new Date().getFullYear(),
      endYear: new Date().getFullYear(),
      percentage: 0,
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
      const url = education
        ? `http://localhost:8080/api/education/${education.id}`
        : 'http://localhost:8080/api/education';
      const method = education ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save education');
      }

      onClose();
    } catch (error) {
      console.error('Error saving education:', error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800">{education ? 'Edit Education' : 'Add Education'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="qualificationLevel" className="text-sm font-medium text-gray-700">Qualification Level</label>
          <input
            type="text"
            id="qualificationLevel"
            name="qualificationLevel"
            value={formData.qualificationLevel}
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="institutionName" className="text-sm font-medium text-gray-700">Institution Name</label>
          <input
            type="text"
            id="institutionName"
            name="institutionName"
            value={formData.institutionName}
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="boardOrUniversity" className="text-sm font-medium text-gray-700">Board/University</label>
          <input
            type="text"
            id="boardOrUniversity"
            name="boardOrUniversity"
            value={formData.boardOrUniversity}
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="fieldOfStudy" className="text-sm font-medium text-gray-700">Field of Study</label>
          <input
            type="text"
            id="fieldOfStudy"
            name="fieldOfStudy"
            value={formData.fieldOfStudy}
            onChange={handleChange}
            required
            className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="startYear" className="text-sm font-medium text-gray-700">Start Year</label>
            <input
              type="number"
              id="startYear"
              name="startYear"
              value={formData.startYear}
              onChange={handleChange}
              required
              className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="endYear" className="text-sm font-medium text-gray-700">End Year</label>
            <input
              type="number"
              id="endYear"
              name="endYear"
              value={formData.endYear}
              onChange={handleChange}
              required
              className="mt-2 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="percentage" className="text-sm font-medium text-gray-700">Percentage</label>
          <input
            type="number"
            id="percentage"
            name="percentage"
            value={formData.percentage}
            onChange={handleChange}
            required
            step="0.01"
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

EducationForm.propTypes = {
  education: PropTypes.shape({
    id: PropTypes.number,
    qualificationLevel: PropTypes.string.isRequired,
    institutionName: PropTypes.string.isRequired,
    boardOrUniversity: PropTypes.string.isRequired,
    fieldOfStudy: PropTypes.string.isRequired,
    startYear: PropTypes.number.isRequired,
    endYear: PropTypes.number.isRequired,
    percentage: PropTypes.number.isRequired,
  }),
  onClose: PropTypes.func.isRequired,
};

export default EducationForm;
