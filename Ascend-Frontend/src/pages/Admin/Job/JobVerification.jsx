// import { useState, useEffect } from "react"
// import { useParams, useNavigate } from "react-router-dom"
// import BASE_URL from "../../../api/BaseUrl"
// const JobVerification = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [job, setJob] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const token = localStorage.getItem("token")
//   useEffect(() => {
//     fetchJob()
//   }, []) 

//   const fetchJob = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/jobs/${id}`,
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//         }
//       )
//       if (!response.ok) {
//         throw new Error("Failed to fetch job")
//       }
//       const data = await response.json()
//       setJob(data)
//       setLoading(false)
//     } catch (err) {
//       setError(err.message)
//       setLoading(false)
//     }
//   }

//   const handleApprove = async () => {
//     try {
//       const response = await fetch(`${BASE_URL}/api/jobs/${id}/approve`, {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//       })
//       if (!response.ok) {
//         throw new Error("Failed to approve job")
//       }
//       navigate("/admin/jobs")
//     } catch (err) {
//       setError(err.message)
//     }
//   }


//   if (loading) return <div className="text-center mt-8">Loading...</div>
//   if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>
//   if (!job) return <div className="text-center mt-8">Job not found</div>

//   return (
//     <div className="container mx-auto mt-8 px-4">
//       <h1 className="text-2xl font-bold mb-4">Verify Job</h1>
//       <div className="bg-white border border-gray-300 rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-2">{job.position}</h2>
//         <p className="mb-2">
//           <strong>Location:</strong> {job.location}
//         </p>
//         <p className="mb-2">
//           <strong>Experience:</strong> {job.experience} years
//         </p>
//         <p className="mb-2">
//           <strong>Education:</strong> {job.education}
//         </p>
//         <p className="mb-2">
//           <strong>Salary:</strong> {job.salary}
//         </p>
//         <p className="mb-2">
//           <strong>Industry ID:</strong> {job.industryId}
//         </p>
//         <p className="mb-2">
//           <strong>Skills:</strong> {job.skills.join(", ")}
//         </p>
//         <p className="mb-2">
//           <strong>Posted At:</strong> {new Date(job.postedAt).toLocaleString()}
//         </p>
//         <p className="mb-2">
//           <strong>Expiry Date:</strong> {new Date(job.expiryDate).toLocaleDateString()}
//         </p>
//         <p className="mb-4">
//           <strong>Description:</strong> {job.description}
//         </p>
//         <div className="flex space-x-4">
//           <button
//             onClick={handleApprove}
//             className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
//           >
//             Approve
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default JobVerification

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../../../api/BaseUrl";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const JobVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/jobs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch job");
      }
      const data = await response.json();
      setJob(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/jobs/${id}/approve`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to approve job");
      }
      navigate("/admin/jobs");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="text-center mt-8 text-blue-500">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
  if (!job) return <div className="text-center mt-8 text-gray-700">Job not found</div>;

  return (
    <div className="container mx-auto mb-2 mt-20 px-4">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">Verify Job</h1>

      <div className="bg-white shadow-lg rounded-lg p-8 max-w-3xl mx-auto border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 text-center mb-6">{job.position}</h2>

        <div className="space-y-4 text-gray-600">
          <p><strong className="text-gray-800">📍 Location:</strong> {job.location}</p>
          <p><strong className="text-gray-800">👨‍💼 Experience:</strong> {job.experience} years</p>
          <p><strong className="text-gray-800">🎓 Education:</strong> {job.education}</p>
          <p><strong className="text-gray-800">💰 Salary:</strong> {job.salary}</p>
          <p><strong className="text-gray-800">🏢 Industry ID:</strong> {job.industryId}</p>
          <p><strong className="text-gray-800">🛠 Skills:</strong> {job.skills.join(", ")}</p>
          <p><strong className="text-gray-800">📅 Posted At:</strong> {new Date(job.postedAt).toLocaleString()}</p>
          <p><strong className="text-gray-800">⏳ Expiry Date:</strong> {new Date(job.expiryDate).toLocaleDateString()}</p>
          <p className="text-justify"><strong className="text-gray-800">📝 Description:</strong> {job.description}</p>
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={handleApprove}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105 focus:ring focus:ring-green-300"
          >
            <FaCheckCircle />
            Approve Job
          </button>
          <button
            onClick={() => navigate("/admin/jobs")}
            className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition transform hover:scale-105 focus:ring focus:ring-gray-300"
          >
            <FaTimesCircle />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobVerification;
