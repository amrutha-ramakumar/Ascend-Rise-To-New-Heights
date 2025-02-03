import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import BASE_URL from "../../../api/BaseUrl"

const EmployerDetails = () => {
  const { empId } = useParams()
  const navigate = useNavigate()
  const [employer, setEmployer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchEmployerDetails = async () => {
      setLoading(true)
      setError("")

      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("Authentication token is missing.")
        }
        const response = await fetch(`${BASE_URL}/api/admin/getemployer/${empId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        
        // const response = await fetch(`${BASE_URL}/api/admin/getemployer`, {
        //   method: "POST",
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //     "Content-Type": "application/json",
        //   },
          
        //   body: JSON.stringify({ id: empId }),
          
        // })
        console.log(empId);
        if (!response.ok) {
          throw new Error("Failed to fetch employer details.")
        }

        const data = await response.json()
        setEmployer(data)
      } catch (error) {
        setError(error.message || "An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }

    fetchEmployerDetails()
  }, [empId])

  const handleVerify = async (status) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`${BASE_URL}/api/admin/verify`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: employer.user.id, status }),
      })

      if (!response.ok) {
        throw new Error("Failed to update employer status.")
      }

      // Update the local state
      setEmployer((prev) => ({
        ...prev,
        user: { ...prev.user, approved: status },
      }))
    } catch (error) {
      setError(error.message || "An unexpected error occurred while updating status.")
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

  if (!employer) {
    return <div className="text-center mt-8 text-gray-600 font-semibold">No employer data found.</div>
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Employer Details</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {employer.firstName} {employer.lastName}
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{employer.email}</p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employer.phone}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employer.gender}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employer.companyName}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Industry Type</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employer.industryType}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company Website</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employer.companyWebsite}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Company Address</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{employer.companyAddress}</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Approval Status</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {employer.user.approved ? "Approved" : "Not Approved"}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div className="mt-8 flex justify-end space-x-4">
        <button
          onClick={() => handleVerify(true)}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          disabled={employer.user.approved}
        >
          Verify
        </button>
        {/* <button
          onClick={() => handleVerify(false)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          disabled={!employer.user.approved}
        >
          Reject
        </button> */}
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Back
        </button>
      </div>
      
    </div>
  )
}

export default EmployerDetails

