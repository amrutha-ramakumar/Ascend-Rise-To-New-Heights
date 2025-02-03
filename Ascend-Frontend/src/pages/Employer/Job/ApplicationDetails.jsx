import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BASE_URL from "../../../api/BaseUrl";
import Pagination from "../../../components/Pagination";
import { useNavigate } from 'react-router-dom';
export default function ApplicationList() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const applicationsPerPage = 10;
  const navigate = useNavigate();
  useEffect(() => {
    fetchApplications();
  }, [jobId, currentPage]);

  const fetchApplications = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${BASE_URL}/api/applications/job/${jobId}?page=${currentPage}&size=${applicationsPerPage}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setError(
        "Failed to fetch applications. Please try again. " + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (applicationId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      console.log(applicationId+" "+newStatus);
      const response = await fetch(`${BASE_URL}/api/applications/${applicationId}/status`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ applicationStatus: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      setApplications(
        applications.map((app) =>
          app.applicationId === applicationId
            ? { ...app, applicationStatus: newStatus }
            : app
        )
      );
    } catch (error) {
      console.error("Error updating application status:", error);
      setError(
        "Failed to update application status. Please try again. " +
          error.message
      );
    }
  };

  // Function to determine allowed status options based on current status
  const getStatusOptions = (currentStatus) => {
    switch (currentStatus) {
      case "Applied":
        return ["Applied", "Pending", "Interview", "Rejected", "Selected"];
      case "Pending":
        return ["Pending", "Interview", "Rejected", "Selected"];
      case "Interview":
        return ["Interview", "Rejected", "Selected"];
      case "Rejected":
      case "Selected":
        return []; // No options for Rejected or Selected
      default:
        return [];
    }
  };
  // const handleChat = async (applicationId) => {
  //   const token = localStorage.getItem('token');
  
  //   // Create a chat for the application
  //   const response = await fetch(`${BASE_URL}/api/chats?applicationId=${applicationId}`, {
  //     method: "POST",
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //   });
  
  //   if (response.ok) {
  //     const chat = await response.json();
  //     window.location.href = `/employer/chat/${chat.id}`;  // Redirect to the chat page
  //   } else {
  //     alert("Error creating chat.");
  //   }
  // };
  
  const handleChat = async (applicationId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User is not authenticated. Please log in.");
        return;
      }
  
      // API call to create a chat
      const response = await fetch(`${BASE_URL}/api/chat?applicationId=${applicationId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const chat = await response.json();
        navigate(`/employer/chat/${chat.id}`); // Redirect to the chat page
      } else {
        const error = await response.json();
        alert(`Error creating chat: ${error.message || "Unknown error occurred."}`);
      }
    } catch (err) {
      console.error("Error occurred while creating chat:", err);
      alert("Something went wrong. Please try again later.");
    }
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-20 px-4 py-8 max-w-full">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Applications
      </h1>
      {applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No applications
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            No applications have been submitted for this job yet.
          </p>
        </div>
      ) : (
        <div className="shadow-lg rounded-lg overflow-hidden bg-white">
          <table className="w-full table-fixed">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-[3%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  ID
                </th>
                <th className="w-[8%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Name
                </th>
                <th className="w-[15%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Email
                </th>
                <th className="w-[6%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Phone
                </th>
                {/* <th className="w-[7%] px-6 py-4 text-left text-sm font-semibold text-gray-900">Qualification</th> */}
                <th className="w-[7%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Portfolio
                </th>
                <th className="w-[10%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Skills
                </th>
                <th className="w-[8%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Details
                </th>
                <th className="w-[5%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Resume
                </th>
                <th className="w-[6%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="w-[6%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Actions
                </th>
                <th className="w-[6%] px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  More
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((application) => (
                <tr key={application.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {application.applicationId}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {application.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 truncate">
                    {application.email}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {application.phone}
                  </td>
                  <td className="px-6 py-4 text-sm text-blue-600">
                    <a
                      href={application.portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Portfolio
                    </a>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {application.skills.join(", ")}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {application.additionalDetails || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <a
                      href={`${BASE_URL}/download-resume/${application.resumePath
                        .split("/")
                        .pop()}`}
                      className="text-indigo-600 hover:text-indigo-900 font-medium"
                      download
                    >
                      Download
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        application.applicationStatus === "Applied"
                          ? "bg-blue-100 text-blue-800"
                          : application.applicationStatus ===
                            "Pending Interview"
                          ? "bg-yellow-100 text-yellow-800"
                          : application.applicationStatus === "Rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {application.applicationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={application.applicationStatus}
                      onChange={(e) =>
                        handleStatusChange(application.applicationId, e.target.value)
                      }
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                      {getStatusOptions(application.applicationStatus).map(
                        (status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        )
                      )}
                    </select>
                  </td>
<td className="px-6 py-4 text-sm text-gray-500">
  {(application.applicationStatus === "Interview" ||
    application.applicationStatus === "Selected") && (
    <button
      onClick={() => handleChat(application.applicationId)}
      className="bg-green-500 text-white px-4 py-2 rounded-lg"
    >
      Chat
    </button>
  )}
</td>


                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {applications.length != 0 && (<div className="mt-8">
        <Pagination
          currentPage={currentPage + 1}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page - 1)}
        />
      </div>
      )}
    </div>
  );
}
