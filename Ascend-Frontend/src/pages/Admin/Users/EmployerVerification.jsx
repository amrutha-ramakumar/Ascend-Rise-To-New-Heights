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
//         employer.user.approved === false && // Only show employers with approved = false
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

//   const handleVerify = async (userId) => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(`${BASE_URL}/api/admin/verify`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ id: userId }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to verify employer.");
//       }

//       // Trigger a refetch of the employers after successful verification
//       setCurrentPage(1);  // This will refetch the data from page 1
//     } catch (error) {
//       setError(error.message || "An unexpected error occurred while verifying.");
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

//   if (filteredEmployers.length === 0) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <img src="/src/assets/NoData.png" alt="No data available" />
//       </div>
//     );
//   }
  

//   return (
//     <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Employer Directory</h1>

//       <div className="mb-6 flex flex-col sm:flex-row gap-4">
//         <div className="w-full sm:w-1/2">
//           <label htmlFor="industryFilter" className="block text-sm font-medium text-gray-700 mb-1">
//             <FaFilter className="h-5 w-5 inline-block mr-1 text-gray-400" />
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
//             <FaSearch className="h-5 w-5 inline-block mr-1 text-gray-400" />
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

//       <div className="mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        // <table className="min-w-full divide-y divide-gray-300">
        //   <thead className="bg-gray-50">
        //     <tr>
        //       <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
        //       <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
        //       <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
        //       <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
        //       <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Industry</th>
        //       <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Website</th>
        //       <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
        //       <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
        //     </tr>
        //   </thead>
        //   <tbody className="divide-y divide-gray-200 bg-white">
        //     {filteredEmployers.map((employer) => (
        //       <tr key={employer.email}>
        //         <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
        //           {employer.firstName} {employer.lastName}
        //         </td>
        //         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.email}</td>
        //         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.phone}</td>
        //         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyName}</td>
        //         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.industryType}</td>
        //         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyWebsite}</td>
        //         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{employer.companyAddress}</td>
        //         <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        //           <button
        //             onClick={() => handleVerify(employer.empId)}
        //             className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
        //           >
        //             Verify
        //           </button>
        //         </td>
        //       </tr>
        //     ))}
        //   </tbody>
        // </table>
//       </div>

//       {/* Pagination logic */}
//       {filteredEmployers.length > 0 && (
//         <div className="mt-4 flex justify-between items-center">
//           <button
//             onClick={() => handlePageChange(currentPage - 1)}
//             disabled={currentPage === 1}
//             className="p-2 bg-gray-300 rounded-md text-gray-600"
//           >
//             <FaChevronLeft />
//           </button>
//           <span className="text-gray-700">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={() => handlePageChange(currentPage + 1)}
//             disabled={currentPage === totalPages}
//             className="p-2 bg-gray-300 rounded-md text-gray-600"
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployerDirectory;


import { useState, useEffect, useMemo } from "react"
import { FaChevronLeft, FaChevronRight, FaSearch, FaFilter } from "react-icons/fa"
import { data, useNavigate } from "react-router-dom"
import BASE_URL from "../../../api/BaseUrl"

const EmployerDirectory = () => {
  const navigate = useNavigate()
  const [employers, setEmployers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [pageSize] = useState(10)
  const [industryFilter, setIndustryFilter] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // useEffect(() => {
  //   const fetchEmployers = async () => {
  //     setLoading(true)
  //     setError("")

  //     try {
  //       const token = localStorage.getItem("token")
  //       if (!token) {
  //         throw new Error("Authentication token is missing.")
  //       }

  //       const response = await fetch(
  //         `${BASE_URL}/api/admin/getemployerdetails?page=${currentPage - 1}&size=${pageSize}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         },
  //       )

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch employer details.")
  //       }

  //       const data = await response.json()
  //       setEmployers(data.content)
  //       setTotalPages(data.totalPages)
  //     } catch (error) {
  //       setError(error.message || "An unexpected error occurred.")
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchEmployers()
  // }, [currentPage, pageSize])
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
  
        // Filter out only those employers whose approvedStatus is false
        const unapprovedEmployers = data.content.filter((employer) => !employer.user.approved)
  
        setEmployers(unapprovedEmployers)
        setTotalPages(data.totalPages)
      } catch (error) {
        setError(error.message || "An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }
  
    fetchEmployers()
  }, [currentPage, pageSize,data])
  
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

  const handleViewDetails = (empId) => {
    navigate(`/admin/employer-details/${empId}`)
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

  if (filteredEmployers.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img src="/src/assets/NoData.png" alt="No data available" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Employer Directory</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:w-1/2">
          <label htmlFor="industryFilter" className="block text-sm font-medium text-gray-700 mb-1">
            <FaFilter className="h-5 w-5 inline-block mr-1 text-gray-400" />
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
            <FaSearch className="h-5 w-5 inline-block mr-1 text-gray-400" />
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

      <div className="mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        {/* <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Industry</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
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
                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                  <button
                    onClick={() => handleViewDetails(employer.empId)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Company</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Industry</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Website</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Address</th>
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Action</th>
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
                    onClick={() => handleViewDetails(employer.empId)}
                    className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredEmployers.length > 0 && (
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-gray-300 rounded-md text-gray-600"
          >
            <FaChevronLeft />
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-300 rounded-md text-gray-600"
          >
            <FaChevronRight />
          </button>
        </div>
      )}
    </div>
  )
}

export default EmployerDirectory


