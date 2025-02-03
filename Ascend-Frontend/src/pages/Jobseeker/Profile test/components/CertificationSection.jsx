// import { useState } from 'react';
// import CertificationForm from '../forms/CertificationForm';
// import PropTypes from 'prop-types';

// const CertificationSection = ({ certifications }) => {
//   const [isAdding, setIsAdding] = useState(false);
//   const [editingId, setEditingId] = useState(null);

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-xl font-semibold">Certifications</h2>
//         <button
//           onClick={() => setIsAdding(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//         >
//           Add Certification
//         </button>
//       </div>
//       {isAdding && (
//         <CertificationForm onClose={() => setIsAdding(false)} />
//       )}
//       {certifications.map((cert) => (
//         <div key={cert.id} className="mb-4 p-4 border rounded">
//           {editingId === cert.id ? (
//             <CertificationForm certification={cert} onClose={() => setEditingId(null)} />
//           ) : (
//             <>
//               <div className="flex justify-between items-start">
//                 <h3 className="text-lg font-semibold">{cert.certificationName}</h3>
//                 <button
//                   onClick={() => setEditingId(cert.id)}
//                   className="px-2 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
//                 >
//                   Edit
//                 </button>
//               </div>
//               <p>Issued by: {cert.issuedBy}</p>
//               <p>Issue Date: {new Date(cert.issueDate).toLocaleDateString()}</p>
//               <p>Expiry Date: {new Date(cert.expiryDate).toLocaleDateString()}</p>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };
// CertificationSection.propTypes = {
//     certifications: PropTypes.arrayOf(
//       PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         certificationName: PropTypes.string.isRequired,
//         issuedBy: PropTypes.string.isRequired,
//         issueDate: PropTypes.string.isRequired,
//         expiryDate: PropTypes.string.isRequired,
//       })
//     ).isRequired,
//   };
// export default CertificationSection;

import { useState } from 'react';
import CertificationForm from '../forms/CertificationForm';
import PropTypes from 'prop-types';
import { Award } from 'lucide-react'; // Import icons from Lucide React
import { FaEdit, FaPlus } from 'react-icons/fa'; // Importing relevant icons from react-icons

const CertificationSection = ({ certifications }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-700">Certifications</h2>
        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add Certification</span>
        </button>
      </div>

      {isAdding && <CertificationForm onClose={() => setIsAdding(false)} />}

      {certifications.map((cert) => (
        <div key={cert.id} className="mb-6 p-4 border rounded-lg shadow-md hover:shadow-lg transition duration-300">
          {editingId === cert.id ? (
            <CertificationForm certification={cert} onClose={() => setEditingId(null)} />
          ) : (
            <>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-800">{cert.certificationName}</h3>
                </div>
                <button
                  onClick={() => setEditingId(cert.id)}
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
                >
                  <FaEdit className="text-gray-600" />
                </button>
              </div>
              <p className="text-gray-600">Issued by: {cert.issuedBy}</p>
              <p className="text-gray-600">Issue Date: {new Date(cert.issueDate).toLocaleDateString()}</p>
              <p className="text-gray-600">Expiry Date: {new Date(cert.expiryDate).toLocaleDateString()}</p>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

CertificationSection.propTypes = {
  certifications: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      certificationName: PropTypes.string.isRequired,
      issuedBy: PropTypes.string.isRequired,
      issueDate: PropTypes.string.isRequired,
      expiryDate: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CertificationSection;
