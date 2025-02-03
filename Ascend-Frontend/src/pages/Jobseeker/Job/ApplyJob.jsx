import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BASE_URL from '../../../api/BaseUrl';

export default function ApplyJob() {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [applicationMethod, setApplicationMethod] = useState('manual');
  const [formData, setFormData] = useState({
    additionalDetails: '',
  });
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobDetails();
  }, [jobId]);

  const fetchJobDetails = async () => {
    const token = localStorage.getItem('token');
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/api/jobs/${jobId}`, {
        method: 'GET',
        headers: {  
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setJob(data);
      } else {
        const errorResult = await response.json();
        setError(errorResult.message || 'Failed to fetch job details. Please try again.');
      }
    } catch (error) {
      setError('Failed to fetch job details. Please try again.'+error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setResume(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const formDataToSend = new FormData();
    formDataToSend.append('jobId', jobId);
    
    if (applicationMethod === 'resume') {
      formDataToSend.append('resume', resume);
    } else {
      formDataToSend.append('additionalDetails', formData.additionalDetails);
    }

    try {
      const response = await fetch(`${BASE_URL}/api/applications/apply`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formDataToSend,
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        navigate('/jobseeker/applications');
      } else {
        const errorResult = await response.json();
        alert(errorResult.message || 'Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application.');
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
  }

  if (error) {
    return <div className="min-h-screen bg-gray-50 p-6 text-red-500">{error}</div>;
  }

  if (!job) {
    return <div className="min-h-screen bg-gray-50 p-6">Job not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Apply for {job.position}</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Job Details</h2>
        <p><strong>Company:</strong> {job.company}</p>
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary}</p>
        <p><strong>Description:</strong> {job.description}</p>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Application Method</h2>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setApplicationMethod('manual')}
              className={`px-4 py-2 rounded ${applicationMethod === 'manual' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Apply Manually
            </button>
            <button
              onClick={() => setApplicationMethod('resume')}
              className={`px-4 py-2 rounded ${applicationMethod === 'resume' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              Upload Resume
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {applicationMethod === 'manual' ? (
              <div className="mb-4">
                <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">Additional Details</label>
                <textarea
                  id="additionalDetails"
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  rows="4"
                ></textarea>
              </div>
            ) : (
              <div className="mb-4">
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700">Upload Resume</label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  onChange={handleFileChange}
                  required
                  className="mt-1 block w-full"
                  accept=".pdf,.doc,.docx"
                />
              </div>
            )}
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

