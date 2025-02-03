// import { useState, useEffect, useMemo } from "react"
// import { FaChevronLeft, FaChevronRight, FaSearch, FaFilter } from "react-icons/fa"
// import BASE_URL from "../../../api/BaseUrl"

// const EmployerDirectory = () => {
//   const [employers, setEmployers] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(0)
//   const [pageSize] = useState(10)
//   const [industryFilter, setIndustryFilter] = useState("")
//   const [searchTerm, setSearchTerm] = useState("")

//   useEffect(() => {
//     const fetchEmployers = async () => {
//       setLoading(true)
//       setError("")

//       try {
//         const token = localStorage.getItem("token")
//         if (!token) {
//           throw new Error("Authentication token is missing.")
//         }

//         const response = await fetch(
//           `${BASE_URL}/api/admin/getemployerdetails?page=${currentPage - 1}&size=${pageSize}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           },
//         )

//         if (!response.ok) {
//           throw new Error("Failed to fetch employer details.")
//         }

//         const data = await response.json()
//         setEmployers(data.content)
//         setTotalPages(data.totalPages)
//       } catch (error) {
//         setError(error.message || "An unexpected error occurred.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchEmployers()
//   }, [currentPage, pageSize])

//   const industries = useMemo(() => {
//     return [...new Set(employers.map((employer) => employer.industryType))]
//   }, [employers])

//   const filteredEmployers = useMemo(() => {
//     return employers.filter(
//       (employer) =>
//         (industryFilter === "" || employer.industryType === industryFilter) &&
//         (searchTerm === "" ||
//           `${employer.firstName} ${employer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           employer.companyName.toLowerCase().includes(searchTerm.toLowerCase())),
//     )
//   }, [employers, industryFilter, searchTerm])

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage)
//   }

//   const handleIndustryFilterChange = (e) => {
//     setIndustryFilter(e.target.value)
//     setCurrentPage(1)
//   }

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value)
//     setCurrentPage(1)
//   }

//   // const handleVerify = async (employer) => {
//   //   try {
//   //     const token = localStorage.getItem('token')
//   //     if (!token) {
//   //       throw new Error("Authentication token is missing.")
//   //     }

//   //     const userId = employer.user.id
//   //     if (!userId) {
//   //       throw new Error("User ID is missing.")
//   //     }

//   //     console.log("Verifying user with ID:", userId)

//   //     const response = await fetch(`${BASE_URL}/api/admin/verify`, {
//   //       method: "POST",
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         "Content-Type": "application/json",
//   //       },
//   //       body: JSON.stringify({ id: userId }),
//   //     })

//   //     const data = await response.json()
      
//   //     if (!response.ok) {
//   //       throw new Error(data.message || "Failed to verify employer.")
//   //     }

//   //     // Update the employer's approved status in the local state
//   //     // setEmployers((prevEmployers) =>
//   //     //   prevEmployers.map((emp) => (emp.user.id === userId ? { ...emp, user: { ...emp.user, approved: true } } : emp)),
//   //     // )

//   //     // Show success message
//   //     alert(data.message || "User approved successfully.")
//   //   } catch (error) {
//   //     console.error("Error during verification:", error)
//   //     alert(error.message || "An unexpected error occurred during verification.")
//   //   }
//   // }
//   const handleVerify = async (employer) => {
//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         throw new Error("Authentication token is missing.");
//       }
  
//       const userId = employer.user.id;
//       if (!userId) {
//         throw new Error("User ID is missing.");
//       }
  
//       console.log("Verifying user with ID:", userId);
  
//       const response = await fetch(`${BASE_URL}/api/admin/verify`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: userId }),
//       });
  
//       // Parse JSON response
//       const data = await response.json();
  
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to verify employer.");
//       }
  
//       // Show success message
//       alert(data.message || "User approved successfully.");
//     } catch (error) {
//       console.error("Error during verification:", error);
//       alert(error.message || "An unexpected error occurred during verification.");
//     }
//   };
  
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600 font-semibold">{error}</div>
//   }

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Employer Directory</h1>

//       <div className="mb-6 flex flex-col sm:flex-row gap-4">
//         <div className="w-full sm:w-1/2">
//           <label htmlFor="industryFilter" className="block text-sm font-medium text-gray-700 mb-1">
//             <FaFilter className="h-5 w-5 inline-block mr-1 text-gray-400" /> {/* Filter icon */}
//             Filter by Industry
//           </label>
//           <select
//             id="industryFilter"
//             value={industryFilter}
//             onChange={handleIndustryFilterChange}
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="">All Industries</option>
//             {industries.map((industry) => (
//               <option key={industry} value={industry}>
//                 {industry}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2">
//           <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
//             <FaSearch className="h-5 w-5 inline-block mr-1 text-gray-400" /> {/* Search icon */}
//             Search
//           </label>
//           <input
//             type="text"
//             id="search"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search by name, email, or company"
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//       </div>

//       {/* Table displaying employer data */}
//       <div className="mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                 Name
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Email
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Phone
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Company
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Industry
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Website
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Address
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Status
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {filteredEmployers.map((employer) => (
//               <tr key={employer.email}>
//                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
//                   {employer.firstName} {employer.lastName}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.email}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.phone}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyName}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.industryType}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyWebsite}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyAddress}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   {employer.user.approved ? (
//                     <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
//                       Approved
//                     </span>
//                   ) : (
//                     <button
//                       onClick={() => handleVerify(employer)}
//                       className="rounded-md bg-blue-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
//                     >
//                       Verify
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-5 flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
//         <div className="flex flex-1 justify-between sm:hidden">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//         <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
//           <div>
//             <p className="text-sm text-gray-700">
//               Showing <span className="font-medium">{(currentPage - 1) * pageSize + 1}</span> to{" "}
//               <span className="font-medium">{Math.min(currentPage * pageSize, filteredEmployers.length)}</span> of{" "}
//               <span className="font-medium">{filteredEmployers.length}</span> results
//             </p>
//           </div>
//           <div>
//             <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
//               <button
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Previous</span>
//                 <FaChevronLeft className="h-5 w-5" aria-hidden="true" />
//               </button>
//               {[...Array(totalPages).keys()].map((page) => (
//                 <button
//                   key={page + 1}
//                   onClick={() => handlePageChange(page + 1)}
//                   className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
//                     currentPage === page + 1
//                       ? "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                       : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//                   }`}
//                 >
//                   {page + 1}
//                 </button>
//               ))}
//               <button
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
//               >
//                 <span className="sr-only">Next</span>
//                 <FaChevronRight className="h-5 w-5" aria-hidden="true" />
//               </button>
//             </nav>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default EmployerDirectory

// import { useState, useEffect, useMemo } from "react";
// import { FaChevronLeft, FaChevronRight, FaSearch, FaFilter } from "react-icons/fa";
// import BASE_URL from "../../../api/BaseUrl";

// const EmployerDirectory = () => {
//   const [employers, setEmployers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(0);
//   const [pageSize] = useState(10);
//   const [industryFilter, setIndustryFilter] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchEmployers = async () => {
//       setLoading(true);
//       setError("");

//       try {
//         const token = localStorage.getItem("token");
//         if (!token) {
//           throw new Error("Authentication token is missing.");
//         }

//         const response = await fetch(
//           `${BASE_URL}/api/admin/getemployerdetails?page=${currentPage - 1}&size=${pageSize}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to fetch employer details.");
//         }

//         const data = await response.json();
//         setEmployers(data.content);
//         setTotalPages(data.totalPages);
//       } catch (error) {
//         setError(error.message || "An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEmployers();
//   }, [currentPage, pageSize]);

//   const industries = useMemo(() => {
//     return [...new Set(employers.map((employer) => employer.industryType))];
//   }, [employers]);

//   const filteredEmployers = useMemo(() => {
//     return employers.filter(
//       (employer) =>
//         (industryFilter === "" || employer.industryType === industryFilter) &&
//         (searchTerm === "" ||
//           `${employer.firstName} ${employer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           employer.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
//     );
//   }, [employers, industryFilter, searchTerm]);

//   const handlePageChange = (newPage) => {
//     setCurrentPage(newPage);
//   };

//   const handleIndustryFilterChange = (e) => {
//     setIndustryFilter(e.target.value);
//     setCurrentPage(1);
//   };

//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//     setCurrentPage(1);
//   };

//   // const handleBlock = async (userId) => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     if (!token) {
//   //       throw new Error("Authentication token is missing.");
//   //     }

//   //     const response = await fetch(`${BASE_URL}/api/admin/block/${userId}`, {
//   //       method: "POST",
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         "Content-Type": "application/json",
//   //       },
//   //     });

//   //     const data = await response.json();
//   //     if (!response.ok) {
//   //       throw new Error(data.message || "Failed to block employer.");
//   //     }

//   //     // Update the blocked status locally
//   //     setEmployers((prevEmployers) =>
//   //       prevEmployers.map((employer) =>
//   //         employer.user.id === userId ? { ...employer, user: { ...employer.user, blocked: true } } : employer
//   //       )
//   //     );

//   //     alert(data.message || "User blocked successfully.");
//   //   } catch (error) {
//   //     console.error("Error during blocking:", error);
//   //     alert(error.message || "An unexpected error occurred during blocking.");
//   //   }
//   // };
//   const handleBlock = async (userId) => {
//     try {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage
//       if (!token) {
//         throw new Error("Authentication token is missing.");
//       }
  
//       const response = await fetch(`${BASE_URL}/api/admin/block/${userId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
  
//       const data = await response.json(); // Parse JSON response
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to block employer.");
//       }
  
//       // Update the blocked status locally
//       setEmployers((prevEmployers) =>
//         prevEmployers.map((employer) =>
//           employer.user.id === userId ? { ...employer, user: { ...employer.user, blocked: true } } : employer
//         )
//       );
  
//       alert(data.message || "User blocked successfully.");
//     } catch (error) {
//       console.error("Error during blocking:", error);
//       alert(error.message || "An unexpected error occurred during blocking.");
//     }
//   };
  
//   // const handleUnblock = async (userId) => {
//   //   try {
//   //     const token = localStorage.getItem("token");
//   //     if (!token) {
//   //       throw new Error("Authentication token is missing.");
//   //     }

//   //     const response = await fetch(`${BASE_URL}/api/admin/unblock/${userId}`, {
//   //       method: "POST",
//   //       headers: {
//   //         Authorization: `Bearer ${token}`,
//   //         "Content-Type": "application/json",
//   //       },
//   //     });

//   //     const data = await response.json();
//   //     if (!response.ok) {
//   //       throw new Error(data.message || "Failed to unblock employer.");
//   //     }

//   //     // Update the blocked status locally
//   //     setEmployers((prevEmployers) =>
//   //       prevEmployers.map((employer) =>
//   //         employer.user.id === userId ? { ...employer, user: { ...employer.user, blocked: false } } : employer
//   //       )
//   //     );

//   //     alert(data.message || "User unblocked successfully.");
//   //   } catch (error) {
//   //     console.error("Error during unblocking:", error);
//   //     alert(error.message || "An unexpected error occurred during unblocking.");
//   //   }
//   // };
//   const handleUnblock = async (userId) => {
//     try {
//       const token = localStorage.getItem("token"); // Retrieve token from localStorage
//       if (!token) {
//         throw new Error("Authentication token is missing.");
//       }
  
//       const response = await fetch(`${BASE_URL}/api/admin/unblock/${userId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
  
//       const data = await response.json(); // Parse JSON response
//       if (!response.ok) {
//         throw new Error(data.message || "Failed to unblock employer.");
//       }
  
//       // Update the blocked status locally
//       setEmployers((prevEmployers) =>
//         prevEmployers.map((employer) =>
//           employer.user.id === userId ? { ...employer, user: { ...employer.user, blocked: false } } : employer
//         )
//       );
  
//       alert(data.message || "User unblocked successfully.");
//     } catch (error) {
//       console.error("Error during unblocking:", error);
//       alert(error.message || "An unexpected error occurred during unblocking.");
//     }
//   };
  

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-center mt-8 text-red-600 font-semibold">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto mt-24 px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Employer Directory</h1>

//       <div className="mb-6 flex flex-col sm:flex-row gap-4">
//         <div className="w-full sm:w-1/2">
//           <label htmlFor="industryFilter" className="block text-sm font-medium text-gray-700 mb-1">
//             <FaFilter className="h-5 w-5 inline-block mr-1 text-gray-400" /> {/* Filter icon */}
//             Filter by Industry
//           </label>
//           <select
//             id="industryFilter"
//             value={industryFilter}
//             onChange={handleIndustryFilterChange}
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           >
//             <option value="">All Industries</option>
//             {industries.map((industry) => (
//               <option key={industry} value={industry}>
//                 {industry}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="w-full sm:w-1/2">
//           <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
//             <FaSearch className="h-5 w-5 inline-block mr-1 text-gray-400" /> {/* Search icon */}
//             Search
//           </label>
//           <input
//             type="text"
//             id="search"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             placeholder="Search by name, email, or company"
//             className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
//           />
//         </div>
//       </div>

//       {/* Table displaying employer data */}
//       <div className="mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
//         <table className="min-w-full divide-y divide-gray-300">
//           <thead className="bg-gray-50">
//             <tr>
//               <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
//                 Name
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Email
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Phone
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Company
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Industry
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Website
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Address
//               </th>
//               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
//                 Action
//               </th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200 bg-white">
//             {filteredEmployers.map((employer) => (
//               <tr key={employer.id}>
//                 <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
//                   {employer.firstName} {employer.lastName}
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.email}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.phone}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyName}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.industryType}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
//                   <a href={employer.companyWebsite} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
//                     {employer.companyWebsite}
//                   </a>
//                 </td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyAddress}</td>
//                 <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
//                   {employer.user.blocked ? (
//                     <button
//                       onClick={() => handleUnblock(employer.user.id)}
//                       className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
//                     >
//                       Unblock
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => handleBlock(employer.user.id)}
//                       className="inline-flex items-center px-3 py-2 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
//                     >
//                       Block
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 flex justify-between items-center">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-3 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
//         >
//           <FaChevronLeft />
//         </button>
//         <span className="text-sm font-medium text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-3 py-2 text-sm font-semibold text-white bg-gray-600 rounded-md hover:bg-gray-700"
//         >
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default EmployerDirectory;


import { useState, useEffect, useMemo } from "react"
import { FaChevronLeft, FaChevronRight, FaSearch, FaFilter } from "react-icons/fa"
import BASE_URL from "../../../api/BaseUrl"

const EmployerDirectory = () => {
  const [employers, setEmployers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize] = useState(10)
  const [industryFilter, setIndustryFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const fetchEmployers = async () => {
      setLoading(true)
      setError("")

      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("Authentication token is missing.")
        }

        const response = await fetch(
          `${BASE_URL}/api/admin/getemployerdetails?page=${currentPage - 1}&size=${pageSize}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )

        if (!response.ok) {
          throw new Error("Failed to fetch employer details.")
        }

        const data = await response.json()
        setEmployers(data.content)
        setTotalPages(data.totalPages)
      } catch (error) {
        setError(error.message || "An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployers()
  }, [currentPage, pageSize])

  const industries = useMemo(() => {
    return [...new Set(employers.map((employer) => employer.industryType))]
  }, [employers])

  const filteredEmployers = useMemo(() => {
    return employers.filter(
      (employer) =>
        (industryFilter === "" || employer.industryType === industryFilter) &&
        (searchTerm === "" ||
          `${employer.firstName} ${employer.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employer.companyName.toLowerCase().includes(searchTerm.toLowerCase())),
    )
  }, [employers, industryFilter, searchTerm])

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleIndustryFilterChange = (e) => {
    setIndustryFilter(e.target.value)
    setCurrentPage(1)
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleBlockUnblock = async (employer) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("Authentication token is missing.")
      }

      const userId = employer.user.id
      if (!userId) {
        throw new Error("User ID is missing.")
      }

      const action = employer.user.blocked ? "unblock" : "block"
      const response = await fetch(`${BASE_URL}/api/admin/${action}/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Failed to change user status.")
      }

      // Update the employer's blocked status in the local state
      setEmployers((prevEmployers) =>
        prevEmployers.map((emp) =>
          emp.user.id === userId ? { ...emp, user: { ...emp.user, blocked: !emp.user.blocked } } : emp,
        ),
      )

      alert(data.message || "User status updated successfully.")
    } catch (error) {
      console.error("Error during block/unblock:", error)
      alert(error.message || "An unexpected error occurred during block/unblock.")
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600 font-semibold">{error}</div>
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Employer Directory</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label htmlFor="industryFilter" className="block text-sm font-medium text-gray-700 mb-1">
            <FaFilter className="h-5 w-5 inline-block mr-1 text-gray-400" /> {/* Filter icon */}
            Filter by Industry
          </label>
          <select
            id="industryFilter"
            value={industryFilter}
            onChange={handleIndustryFilterChange}
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-1/2">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            <FaSearch className="h-5 w-5 inline-block mr-1 text-gray-400" /> {/* Search icon */}
            Search
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by name, email, or company"
            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Table displaying employer data */}
      <div className="mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                Name
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Email
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Phone
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Company
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Industry
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Website
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Address
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {filteredEmployers.map((employer) => (
              <tr key={employer.email}>
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                  {employer.firstName} {employer.lastName}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.email}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.phone}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyName}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.industryType}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyWebsite}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyAddress}</td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button
                    onClick={() => handleBlockUnblock(employer)}
                    className={`px-4 py-2 text-sm font-semibold text-white rounded-md ${
                      employer.user.blocked ?  "bg-green-500 hover:bg-green-600": "bg-red-500 hover:bg-red-600"
                    }`}
                  >
                    {employer.user.blocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md disabled:bg-gray-400"
        >
          <FaChevronLeft />
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md disabled:bg-gray-400"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  )
}

export default EmployerDirectory
