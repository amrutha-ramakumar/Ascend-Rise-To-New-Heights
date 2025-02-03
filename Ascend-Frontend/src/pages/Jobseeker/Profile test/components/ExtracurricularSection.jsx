// import { useState } from 'react';
// import ExtracurricularForm from '../forms/ExtracurricularForm';
// import PropTypes from 'prop-types';

// const ExtracurricularSection = ({ activities }) => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   return (
//     <div className="bg-white  p-6 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Extracurricular Activities</h2>
//         <button
//           onClick={() => setIsAdding(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//         >
//           Add Activity
//         </button>
//       </div>
//       {isAdding && (
//         <ExtracurricularForm onClose={() => setIsAdding(false)} />
//       )}
//       {activities.map((activity) => (
//         <div key={activity.id} className="mb-4 p-4 border rounded">
//           {editingId === activity.id ? (
//             <ExtracurricularForm activity={activity} onClose={() => setEditingId(null)} />
//           ) : (
//             <>
//               <div className="flex justify-between items-start">
//                 <h3 className="text-lg font-semibold">{activity.activityName}</h3>
//                 <button
//                   onClick={() => setEditingId(activity.id)}
//                   className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//                 >
//                   Edit
//                 </button>
//               </div>
//               <p>{activity.description}</p>
//               <p>Achievement Date: {new Date(activity.achievementDate).toLocaleDateString()}</p>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
// ExtracurricularSection.propTypes = {
//     activities: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         activityName: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         achievementDate: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   };
// export default ExtracurricularSection;

import { useState } from 'react';
import ExtracurricularForm from '../forms/ExtracurricularForm';
import PropTypes from 'prop-types';
import { Star } from 'lucide-react'; // Import icons from Lucide React
import { FaEdit, FaPlus } from 'react-icons/fa'; // Import relevant icons from react-icons

const ExtracurricularSection = ({ activities }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Extracurricular Activities</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Activity</span>
        </button>
      </div>

      {isAdding && <ExtracurricularForm onClose={() => setIsAdding(false)} />}

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="mb-6 p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          {editingId === activity.id ? (
            <ExtracurricularForm
              activity={activity}
              onClose={() => setEditingId(null)}
            />
          ) : (
            <>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <Star className="w-6 h-6 text-blue-600" /> {/* Star icon for activities */}
                  <h3 className="text-xl font-semibold text-gray-800">
                    {activity.activityName}
                  </h3>
                </div>
                <button
                  onClick={() => setEditingId(activity.id)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  <FaEdit className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600">{activity.description}</p>
              <p className="text-gray-600">
                Achievement Date:{' '}
                <span className="font-semibold">
                  {new Date(activity.achievementDate).toLocaleDateString()}
                </span>
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

ExtracurricularSection.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      activityName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      achievementDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ExtracurricularSection;
