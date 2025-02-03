import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaEdit, FaPlus,  } from 'react-icons/fa';  // Importing relevant icons from react-icons
import { MdWork } from 'react-icons/md';  // Work icon

import ExperienceForm from '../forms/ExperienceForm';

const ExperienceSection = ({ experiences }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center space-x-2">
          <MdWork className="text-blue-500" />
          <span>Experience</span>
        </h2>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Experience</span>
        </button>
      </div>

      {isAdding && (
        <div className="mb-6">
          <ExperienceForm onClose={() => setIsAdding(false)} />
        </div>
      )}

      {experiences.map((exp) => (
        <div key={exp.id} className="mb-6 p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          {editingId === exp.id ? (
            <ExperienceForm experience={exp} onClose={() => setEditingId(null)} />
          ) : (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{exp.jobTitle}</h3>
                  <p className="text-gray-500">{exp.companyName}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(exp.startDate).toLocaleDateString()} - {new Date(exp.endDate).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => setEditingId(exp.id)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  <FaEdit className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-700">{exp.responsibilities}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

ExperienceSection.propTypes = {
  experiences: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      jobTitle: PropTypes.string.isRequired,
      companyName: PropTypes.string.isRequired,
      startDate: PropTypes.string.isRequired,
      endDate: PropTypes.string.isRequired,
      responsibilities: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExperienceSection;
