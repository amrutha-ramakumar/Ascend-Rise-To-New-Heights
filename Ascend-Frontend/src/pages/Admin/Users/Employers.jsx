// without model and reason
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

//   const handleBlockUnblock = async (employer) => {
//     try {
//       const token = localStorage.getItem("token")
//       if (!token) {
//         throw new Error("Authentication token is missing.")
//       }

//       const userId = employer.user.id
//       if (!userId) {
//         throw new Error("User ID is missing.")
//       }

//       const action = employer.user.blocked ? "unblock" : "block"
//       const response = await fetch(`${BASE_URL}/api/admin/${action}/${userId}`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       })

//       const data = await response.json()

//       if (!response.ok) {
//         throw new Error(data.message || "Failed to change user status.")
//       }

//       // Update the employer's blocked status in the local state
//       setEmployers((prevEmployers) =>
//         prevEmployers.map((emp) =>
//           emp.user.id === userId ? { ...emp, user: { ...emp.user, blocked: !emp.user.blocked } } : emp,
//         ),
//       )

//       alert(data.message || "User status updated successfully.")
//     } catch (error) {
//       console.error("Error during block/unblock:", error)
//       alert(error.message || "An unexpected error occurred during block/unblock.")
//     }
//   }

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
//                 Action
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
//                   <button
//                     onClick={() => handleBlockUnblock(employer)}
//                     className={`px-4 py-2 text-sm font-semibold text-white rounded-md ${
//                       employer.user.blocked ?  "bg-green-500 hover:bg-green-600": "bg-red-500 hover:bg-red-600"
//                     }`}
//                   >
//                     {employer.user.blocked ? "Unblock" : "Block"}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-6 flex justify-between items-center">
//         <button
//           onClick={() => handlePageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md disabled:bg-gray-400"
//         >
//           <FaChevronLeft />
//         </button>
//         <span className="text-sm font-medium text-gray-700">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={() => handlePageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md disabled:bg-gray-400"
//         >
//           <FaChevronRight />
//         </button>
//       </div>
//     </div>
//   )
// }

// export default EmployerDirectory

// withmodel

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
  const [showModal, setShowModal] = useState(false) // State for modal visibility
  const [currentEmployer, setCurrentEmployer] = useState(null) // Store the employer being blocked/unblocked
  const [blockReason, setBlockReason] = useState("")

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

  const handleBlockUnblock = (employer) => {
    if (employer.user.blocked) {
      // If the user is already blocked, unblock them without showing the modal
      handleSubmitBlockUnblock(employer, null)
    } else {
      // If the user is not blocked, show the modal for blocking
      setCurrentEmployer(employer)
      setShowModal(true)
    }
  }

  const handleSubmitBlockUnblock = async (employer, reason) => {
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
        body: JSON.stringify({ reason: reason }), // Send the blocking reason in the request body
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
      setShowModal(false) // Close the modal after submission
      setBlockReason("") // Reset the block reason
    } catch (error) {
      console.error("Error during block/unblock:", error)
      alert(error.message || "An unexpected error occurred during block/unblock.")
    }
  }

  const handleModalSubmit = () => {
    if (!blockReason) {
      alert("Blocking reason is required.")
      return
    }
    handleSubmitBlockUnblock(currentEmployer, blockReason)
  }

  const handleModalClose = () => {
    setShowModal(false)
    setBlockReason("") // Reset the block reason
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

      {/* Table displaying employer data */}
      <div className="mt-8 overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
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
                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium">
                  <button
                    onClick={() => handleBlockUnblock(employer)}
                    className={`px-3 py-2 text-sm font-semibold rounded-md ${
                      employer.user.blocked ? "bg-green-500 text-white" : "bg-red-500 text-white"
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
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>
        <span className="text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm font-medium text-gray-700 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
      </div>

      {/* Block Reason Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md w-1/3">
            <h2 className="text-xl font-semibold mb-4">Block Reason</h2>
            <textarea
              value={blockReason}
              onChange={(e) => setBlockReason(e.target.value)}
              placeholder="Please provide a reason for blocking"
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            ></textarea>
            <div className="flex justify-between">
              <button onClick={handleModalClose} className="px-4 py-2 bg-gray-200 rounded-md">
                Cancel
              </button>
              <button onClick={handleModalSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-md">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployerDirectory

