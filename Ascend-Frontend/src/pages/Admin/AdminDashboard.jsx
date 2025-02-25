// // import React from 'react'
// import { useAuth } from '../../contexts/AuthContexts'

// const AdminDashboard = () => {
//   const { logout } = useAuth()

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
//       <p className="mb-4">Welcome to the admin dashboard!</p>
//       <button
//         onClick={logout}
//         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//       >
//         Logout
//       </button>
//     </div>
//   )
// }

// export default AdminDashboard

// import { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import BASE_URL from '../../api/BaseUrl';

// const AdminDashboard = () => {
//   const [dashboardData, setDashboardData] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           throw new Error("No token found. Please login.");
//         }

//         console.log("Fetching API with token:", token); // Debugging

//         const response = await fetch(`${BASE_URL}/api/admin/total-amount`, {
//           headers: { 'Authorization': `Bearer ${token}` },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();  // Get error message from API
//           console.error("API Error:", errorText);
//           throw new Error('Failed to fetch data from API');
//         }

//         const data = await response.json();
//         console.log("API Response:", data); // Debugging response

//         if (!data || !data.totalAmount) {
//           throw new Error('Data format is incorrect or totalAmount not found');
//         }

//         setDashboardData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);  // Debugging error
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   if (isLoading) {
//     return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center text-lg">{`Error: ${error}`}</div>;
//   }

//   return (
//     <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-100 to-white p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-extrabold text-blue-900">Admin Dashboard</h1>
//         </div>

//         {/* Welcome Message */}
//         <div className="bg-white border-l-4 border-white p-6 mb-8 rounded-xl shadow-md">
//           <h2 className="text-3xl font-semibold text-black mb-4">Welcome, Admin</h2>
//           <p className="text-black-700 text-lg">
//             Monitor and manage all activities on the platform with real-time insights.
//           </p>
//         </div>

//         {/* Dashboard Cards */}
//         {dashboardData ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//             <DashboardCard
//               title="Total Amount"
//               value={`$${dashboardData.totalAmount.toLocaleString()}`}
//               icon={<span className="h-10 w-10 text-green-600 text-2xl font-bold">₹</span>}
//             />
//           </div>
//         ) : (
//           <div>No data available</div>
//         )}
//       </div>
//     </div>
//   );
// };

// const DashboardCard = ({ title, value, icon }) => (
//   <div className="bg-gradient-to-r from-white to-white text-black rounded-xl shadow-md p-6 flex items-center">
//     <div className="mr-4">{icon}</div>
//     <div>
//       <h2 className="text-lg font-semibold">{title}</h2>
//       <p className="text-3xl font-bold">{value}</p>
//     </div>
//   </div>
// );

// DashboardCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
//   icon: PropTypes.node.isRequired,
// };

// export default AdminDashboard;
import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import BASE_URL from "../../api/BaseUrl"
import IncomeChart from "./IncomeChart"
const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const [type, setType] = useState("monthly");
  const [year, setYear] = useState(currentYear);
  const [month, setMonth] = useState(currentMonth);
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          throw new Error("No token found. Please login.")
        }

        console.log("Fetching API with token:", token) // Debugging

        const response = await fetch(`${BASE_URL}/api/admin/total-amount`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          const errorText = await response.text() // Get error message from API
          console.error("API Error:", errorText)
          throw new Error("Failed to fetch data from API")
        }

        const data = await response.json()
        console.log("API Response:", data) // Debugging response

        if (!data || typeof data.totalAmount !== "number" || typeof data.totalUsers !== "number") {
          throw new Error("Data format is incorrect or required fields are missing")
        }

        setDashboardData(data)
      } catch (error) {
        console.error("Error fetching data:", error) // Debugging error
        setError(error.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>
  }

  if (error) {
    return <div className="text-red-500 text-center text-lg">{`Error: ${error}`}</div>
  }

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-b from-gray-100 to-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-900">Admin Dashboard</h1>
        </div>

        {/* Welcome Message */}
        <div className="bg-white border-l-4 border-white p-6 mb-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold text-black mb-4">Welcome, Admin</h2>
          <p className="text-black-700 text-lg">
            Monitor and manage all activities on the platform with real-time insights.
          </p>
        </div>

        {/* Dashboard Cards */}
        {dashboardData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <DashboardCard
              title="Total Amount"
              value={`₹${dashboardData.totalAmount.toLocaleString()}`}
              icon={<span className="h-10 w-10 text-green-600 text-2xl font-bold">₹</span>}
            />
            <DashboardCard
              title="Total Users"
              value={dashboardData.totalUsers.toLocaleString()}
              icon={<span className="h-10 w-10 text-blue-600 text-2xl font-bold">👥</span>}
            />
          </div>
        ) : (
          <div>No data available</div>
        )}
      </div>
      <div>
        <label>Chart Type:</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {/* <option value="yearly">Yearly</option> */}
          <option value="monthly">Monthly</option>
          <option value="daily">Daily</option>
        </select>

        <label>Year:</label>
        <input type="number" value={year} onChange={(e) => setYear(e.target.value)} />

        {type === "daily" && (
          <>
            <label>Month:</label>
            <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} />
          </>
        )}
      </div>

      <IncomeChart type={type} year={year} month={month} />
    </div>
  )
}

const DashboardCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-r from-white to-white text-black rounded-xl shadow-md p-6 flex items-center">
    <div className="mr-4">{icon}</div>
    <div>
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-3xl font-bold">{value}</p>
    </div>
    
  </div>
)

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.node.isRequired,
}

export default AdminDashboard

