
// works well but only 3 features are possible with validation for individual input field

import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BASE_URL from '../../../api/BaseUrl'

export default function SubscriptionPlanForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [formData, setFormData] = useState({
    planName: '',
    userType: 'employer',
    price: '',
    duration: '',
    features: {
      feature1: '',
      feature2: '',
      feature3: ''
    },
    is_active: true
  });

  useEffect(() => {
    if (id) {
      fetchPlan();
    }
  }, [id]);

  const fetchPlan = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/api/subscription-plans/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plan details');
      }

      const data = await response.json();
      setFormData({
        ...data,
        features: JSON.parse(data.features)
      });
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setValidationErrors({});

    // Client-side validation
    const errors = {};
    if (!formData.planName.trim()) errors.planName = 'Plan Name is required';
    if (!formData.price) errors.price = 'Price is required';
    if (!formData.duration) errors.duration = 'Duration is required';
    Object.keys(formData.features).forEach((key, index) => {
      if (!formData.features[key].trim()) errors[`feature${index + 1}`] = 'Feature is required';
    });

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      setLoading(false);
      return;
    }

    const token = localStorage.getItem('token');
    try {
      const payload = {
        ...formData,
        features: JSON.stringify(formData.features)
      };

      const response = await fetch(
        id 
          ? `${BASE_URL}/api/subscription-plans/${id}`
          : `${BASE_URL}/api/subscription-plans`,
        {
          method: id ? 'PUT' : 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        if (errorData.message === 'A plan with this name already exists.') {
          setError(errorData.message);
        } else {
          setError('An error occurred while submitting the form.');
        }
        setLoading(false);
        return;
    }

      navigate('/admin/subscription-plans');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field, value) => {
    if (field.startsWith('feature')) {
      setFormData(prev => ({
        ...prev,
        features: {
          ...prev.features,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
    // Clear validation error when user starts typing
    if (validationErrors[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">
        {id ? 'Edit Subscription Plan' : 'Create Subscription Plan'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="planName" className="block text-sm font-medium text-gray-700">Plan Name</label>
          <input
            type="text"
            id="planName"
            value={formData.planName}
            onChange={(e) => handleChange('planName', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {validationErrors.planName && <p className="text-red-500 text-sm mt-1">{validationErrors.planName}</p>}
        </div>

        <div>
          <label htmlFor="userType" className="block text-sm font-medium text-gray-700">User Type</label>
          <select
            id="userType"
            value={formData.userType}
            onChange={(e) => handleChange('userType', e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          >
            <option value="employer">Employer</option>
            <option value="jobseeker">Job Seeker</option>
          </select>
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            id="price"
            step="0.01"
            value={formData.price}
            onChange={(e) => handleChange('price', parseFloat(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {validationErrors.price && <p className="text-red-500 text-sm mt-1">{validationErrors.price}</p>}
        </div>

        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">Duration (days)</label>
          <input
            type="number"
            id="duration"
            value={formData.duration}
            onChange={(e) => handleChange('duration', parseInt(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {validationErrors.duration && <p className="text-red-500 text-sm mt-1">{validationErrors.duration}</p>}
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Features</label>
          {Object.keys(formData.features).map((feature, index) => (
            <div key={feature}>
              <input
                type="text"
                placeholder={`Feature ${index + 1}`}
                value={formData.features[feature]}
                onChange={(e) => handleChange(feature, e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
              {validationErrors[`feature${index + 1}`] && (
                <p className="text-red-500 text-sm mt-1">{validationErrors[`feature${index + 1}`]}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="is_active"
            checked={formData.is_active}
            onChange={(e) => handleChange('is_active', e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">Active</label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Plan'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/subscription-plans')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
