// import { useState, useEffect } from "react"
// import { Link } from "react-router-dom"
// import BASE_URL from "../../../api/BaseUrl"
// const UnapprovedJobsTable = () => {
//   const [jobs, setJobs] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     fetchJobs()
//   }, [])

//   const fetchJobs = async () => {
//     try {
//         const token = localStorage.getItem("token")
//       const response = await fetch(`${BASE_URL}/api/jobs/getNotApproved?page=0&size=10`,{
//         headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           }
//       })
//       if (!response.ok) {
//         throw new Error("Failed to fetch jobs")
//       }
//       const data = await response.json()
//       setJobs(data.content)
//       setLoading(false)
//     } catch (err) {
//       setError(err.message)
//       setLoading(false)
//     }
//   }

//   if (loading) return <div className="text-center mt-8">Loading...</div>
//   if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>

//   return (
//     <div className="container mx-auto mt-8 px-4">
//       <h1 className="text-2xl font-bold mb-4">Unapproved Jobs</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border-b">ID</th>
//               <th className="py-2 px-4 border-b">Position</th>
//               <th className="py-2 px-4 border-b">Location</th>
//               <th className="py-2 px-4 border-b">Experience</th>
//               <th className="py-2 px-4 border-b">Posted At</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{job.id}</td>
//                 <td className="py-2 px-4 border-b">{job.position}</td>
//                 <td className="py-2 px-4 border-b">{job.location}</td>
//                 <td className="py-2 px-4 border-b">{job.experience} years</td>
//                 <td className="py-2 px-4 border-b">{new Date(job.postedAt).toLocaleDateString()}</td>
//                 <td className="py-2 px-4 border-b">
//                   <Link
//                     to={`/admin/verify/${job.id}`}
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
//                   >
//                     Verify
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
        
//       </div>
//     </div>
//   )
// }

// export default UnapprovedJobsTable

// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import BASE_URL from "../../../api/BaseUrl";
// import Pagination from "../../../components/Pagination"
// const UnapprovedJobsTable = () => {
//   const [jobs, setJobs] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchJobs(currentPage);
//   }, [currentPage]);

//   const fetchJobs = async (page) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/jobs/getNotApproved?page=${page - 1}&size=10`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       if (!response.ok) {
//         throw new Error("Failed to fetch jobs");
//       }
//       const data = await response.json();
//       setJobs(data.content);
//       setTotalPages(data.totalPages);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//     }
//   };

//   if (loading) return <div className="text-center mt-8">Loading...</div>;
//   if (error) return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
//   if (!jobs) return <div className="text-center mt-8 text-gray-700">Job not found</div>;
//   return (
//     <div className="container mx-auto mt-8 px-4">
//       <h1 className="text-2xl font-bold mb-4">Unapproved Jobs</h1>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border-b">ID</th>
//               <th className="py-2 px-4 border-b">Position</th>
//               <th className="py-2 px-4 border-b">Location</th>
//               <th className="py-2 px-4 border-b">Experience</th>
//               <th className="py-2 px-4 border-b">Posted At</th>
//               <th className="py-2 px-4 border-b">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {jobs.map((job) => (
//               <tr key={job.id} className="hover:bg-gray-50">
//                 <td className="py-2 px-4 border-b">{job.id}</td>
//                 <td className="py-2 px-4 border-b">{job.position}</td>
//                 <td className="py-2 px-4 border-b">{job.location}</td>
//                 <td className="py-2 px-4 border-b">{job.experience} years</td>
//                 <td className="py-2 px-4 border-b">{new Date(job.postedAt).toLocaleDateString()}</td>
//                 <td className="py-2 px-4 border-b">
//                   <Link
//                     to={`/admin/verify/${job.id}`}
//                     className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
//                   >
//                     Verify
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
//     </div>
//   );
// };


// export default UnapprovedJobsTable;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../api/BaseUrl";
import Pagination from "../../../components/Pagination";

const UnapprovedJobsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobs = async (page) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BASE_URL}/api/jobs/getNotApproved?page=${page - 1}&size=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }
      const data = await response.json();
      setJobs(data.content);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-8 text-lg font-semibold">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500 font-semibold">Error: {error}</div>;
  if (!jobs) return <div className="text-center mt-8 text-gray-700">Job not found</div>;
  return (
    <div className="container mx-auto mt-20 px-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Jobs</h1>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-200 text-gray-700 text-left uppercase text-sm sticky top-0">
            <tr>
              <th className="py-3 px-4 border-b">ID</th>
              <th className="py-3 px-4 border-b">Position</th>
              <th className="py-3 px-4 border-b">Location</th>
              <th className="py-3 px-4 border-b">Experience</th>
              <th className="py-3 px-4 border-b">Posted At</th>
              <th className="py-3 px-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, index) => (
              <tr key={job.id} className={`border-b transition-all hover:bg-gray-100 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}>
                <td className="py-3 px-4">{job.id}</td>
                <td className="py-3 px-4 font-semibold">{job.position}</td>
                <td className="py-3 px-4">{job.location}</td>
                <td className="py-3 px-4">{job.experience} years</td>
                <td className="py-3 px-4">{new Date(job.postedAt).toLocaleDateString()}</td>
                <td className="py-3 px-4 text-center">
                  <Link
                    to={`/admin/verify/${job.id}`}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all"
                  >
                    Verify
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default UnapprovedJobsTable;
