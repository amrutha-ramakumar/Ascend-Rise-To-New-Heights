import { useState } from 'react';
import EducationForm from '../forms/EducationForm';
import PropTypes from 'prop-types';
import { Award, } from 'lucide-react'; // Import icons from Lucide React
import { FaEdit, FaPlus,  } from 'react-icons/fa';  // Importing relevant icons from react-icons

const EducationSection = ({ educations }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Education</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Experience</span>
        </button>
      </div>

      {isAdding && (
        <EducationForm onClose={() => setIsAdding(false)} />
      )}

      {educations.map((edu) => (
        <div key={edu.id} className="mb-6 p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
          {editingId === edu.id ? (
            <EducationForm education={edu} onClose={() => setEditingId(null)} />
          ) : (
            <>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-blue-600" /> {/* Award icon for education */}
                  <h3 className="text-xl font-semibold text-gray-800">{edu.qualificationLevel} in {edu.fieldOfStudy}</h3>
                </div>
                <div className="flex space-x-2">
                  {/* <button
                    onClick={() => setEditingId(edu.id)}
                    className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <FaEdit className="w-5 h-5" /> 
                  </button> */}
                  <button
                  onClick={() =>setEditingId(edu.id)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  <FaEdit className="text-gray-600" />
                </button>
                  {/* <button
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    <Trash2 className="w-5 h-5" /> 
                  </button> */}
                </div>
              </div>
              <p className="text-gray-600">{edu.institutionName}, {edu.boardOrUniversity}</p>
              <p className="text-gray-600">{edu.startYear} - {edu.endYear}</p>
              <p className="text-gray-600">Percentage: <span className="font-semibold">{edu.percentage}%</span></p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

EducationSection.propTypes = {
  educations: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      qualificationLevel: PropTypes.string.isRequired,
      fieldOfStudy: PropTypes.string.isRequired,
      institutionName: PropTypes.string.isRequired,
      boardOrUniversity: PropTypes.string.isRequired,
      startYear: PropTypes.number.isRequired,
      endYear: PropTypes.number.isRequired,
      percentage: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default EducationSection;
