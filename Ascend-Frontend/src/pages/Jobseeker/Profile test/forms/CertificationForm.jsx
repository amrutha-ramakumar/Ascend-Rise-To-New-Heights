import { useState } from 'react';
import PropTypes from 'prop-types';
import BASE_URL from '../../../../api/BaseUrl'
const CertificationForm = ({ certification, onClose }) => {
  const [formData, setFormData] = useState(
    certification || {
      certificationName: '',
      issuedBy: '',
      issueDate: '',
      expiryDate: '',
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
      const url = certification
        ? `${BASE_URL}/api/certification/${certification.id}`
        : `${BASE_URL}/api/certification`;
      const method = certification ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to save certification');
      }

      onClose();
    } catch (error) {
      console.error('Error saving certification:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="certificationName" className="block text-sm font-medium text-gray-700">
          Certification Name
        </label>
        <input
          type="text"
          id="certificationName"
          name="certificationName"
          value={formData.certificationName}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      
      <div>
        <label htmlFor="issuedBy" className="block text-sm font-medium text-gray-700">
          Issued By
        </label>
        <input
          type="text"
          id="issuedBy"
          name="issuedBy"
          value={formData.issuedBy}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      
      <div>
        <label htmlFor="issueDate" className="block text-sm font-medium text-gray-700">
          Issue Date
        </label>
        <input
          type="date"
          id="issueDate"
          name="issueDate"
          value={formData.issueDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      
      <div>
        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
          Expiry Date
        </label>
        <input
          type="date"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save
        </button>
      </div>
    </form>
  );
};

CertificationForm.propTypes = {
  certification: PropTypes.shape({
    id: PropTypes.string,
    certificationName: PropTypes.string,
    issuedBy: PropTypes.string,
    issueDate: PropTypes.string,
    expiryDate: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
};

export default CertificationForm;
