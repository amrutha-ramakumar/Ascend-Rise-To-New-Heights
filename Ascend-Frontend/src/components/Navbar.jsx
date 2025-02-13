// import { Link, useLocation } from "react-router-dom";
// import { useAuth } from "../contexts/AuthContexts";
// import { useState, useEffect } from "react";

// export default function Navbar() {
//   const { isAuthenticated, userRole, logout } = useAuth();
//   const location = useLocation();
//   const [isScrolled, setIsScrolled] = useState(false);

//   const hideLinksPaths = [
//     "/employer/employer-plans",
//     "/jobseeker/jobseeker-plans",
//     "/employer/payment",
//     "/jobseeker/payment",
//   ];

//   const shouldHideLinks = hideLinksPaths.includes(location.pathname);

//   // Scroll event listener to change navbar style on scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 50);
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <nav
//       className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ${
//         isScrolled
//           ? "bg-white text-black shadow-lg"
//           : "bg-black text-white shadow-lg"
//       }  z-50`}
//     >
//       <div className="container mx-auto flex justify-between items-center">
//         {/* Left Section: Ascend Brand Name and Home Link */}
//         <div className="flex items-center space-x-4">
//           {/* Brand Name */}
//           <Link
//             to="/"
//             className="text-3xl font-bold tracking-widest text-indigo-600 hover:text-indigo-800 transition"
//           >
//             Ascend
//           </Link>
//           {/* Home Link */}
//           <Link
//             to="/"
//             className="text-xl font-semibold hover:text-blue-500 transition"
//           >
//             Home
//           </Link>
//         </div>

//         {/* Right Section: Navbar Links */}
//         <div className="flex items-center space-x-6">
//           {isAuthenticated ? (
//             <>
//               <Link
//                 to={`/${userRole}/dashboard`}
//                 className="hover:text-blue-500 transition"
//               >
//                 Dashboard
//               </Link>
//               {/* <Link
//                     to={`/chat/${userRole}`}
//                     className="hover:text-blue-500"
//                   >
//                     chat
//                   </Link> */}
//               {!shouldHideLinks && userRole === "employer" && (
//                 <>
//                   <Link to="/employer/profile" className="hover:text-blue-500">
//                     Profile
//                   </Link>
//                   <Link to="/employer/jobs" className="hover:text-blue-500">
//                     List Jobs
//                   </Link>
//                   <Link
//                     to="/employer/create-job"
//                     className="hover:text-blue-500"
//                   >
//                     Create Job
//                   </Link>

                  
                  
//                 </>
//               )}
//               {!shouldHideLinks && userRole === "jobseeker" && (
//                 <>
//                   <Link to="/jobseeker/profile" className="hover:text-blue-500">
//                     Profile
//                   </Link>
//                   <Link to="/jobseeker/jobs" className="hover:text-blue-500">
//                     Jobs
//                   </Link>
//                   <Link to="/jobseeker/my-jobs" className="hover:text-blue-500">
//                     My Jobs
//                   </Link>
//                   <Link
//                     to="/jobseeker/savedJobs"
//                     className="hover:text-blue-500"
//                   >
//                     Saved Jobs
//                   </Link>
//                 </>
//               )}
//               {/* {userRole === "admin" && (
//                 <>
//                   <Link
//                     to="/admin/jobseeker-list"
//                     className="hover:text-blue-500"
//                   >
//                     Jobseeker List
//                   </Link>
//                   <Link
//                     to="/admin/employer-list"
//                     className="hover:text-blue-500"
//                   >
//                     Employer List
//                   </Link>
//                   <Link
//                     to="/admin/subscription-plans"
//                     className="hover:text-blue-500"
//                   >
//                     Subscription List
//                   </Link>
//                 </>
//               )} */}
//               {userRole === "admin" && (
//                 <>
//                   <Link
//                     to="/admin/jobseeker-list"
//                     className="hover:text-blue-500"
//                   >
//                     Jobseeker List
//                   </Link>
//                   <Link
//                     to="/admin/employer-list"
//                     className="hover:text-blue-500"
//                   >
//                     Employer List
//                   </Link>
//                   <Link
//                     to="/admin/employer-verification"
//                     className="hover:text-blue-500"
//                   >
//                     Verify Employers
//                   </Link>
//                   <Link
//                     to="/admin/subscription-plans"
//                     className="hover:text-blue-500"
//                   >
//                     Subscription List
//                   </Link>
//                   <Link to="/admin/jobs" className="hover:text-blue-500">
//                     Verify Jobs
//                   </Link>
//                 </>
//               )}

//               <button
//                 onClick={logout}
//                 className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition"
//               >
//                 Logout
//               </button>
//             </>
//           ) : (
//             <>
//               {/* Register Button */}
//               <Link
//                 to="/register"
//                 // className="border border-black text-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
//                 className={`${
//                   isScrolled
//                     ? "border border-black bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
//                     : "border border-white bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
//                 }`}
//               >
//                 Register
//               </Link>

//               {/* Login Button */}
//               <Link
//                 to="/login"
//                 className="bg-black text-white px-4 py-2 rounded border border-white hover:bg-white hover:text-black transition"
//               >
//                 Login
//               </Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContexts";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { isAuthenticated, userRole, logout } = useAuth();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  const hideLinksPaths = [
    "/employer/employer-plans",
    "/jobseeker/jobseeker-plans",
    "/employer/payment",
    "/jobseeker/payment",
  ];

  const shouldHideLinks = hideLinksPaths.includes(location.pathname);

  // Scroll event listener to change navbar style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full p-4 transition-all duration-300 ${
        isScrolled
          ? "bg-white text-black shadow-lg"
          : "bg-black text-white shadow-lg"
      }  z-50`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section: Ascend Brand Name and Home Link */}
        <div className="flex items-center space-x-4">
          {/* Brand Name */}
          <Link
            // to="/"
            className="text-3xl font-bold tracking-widest text-indigo-600 hover:text-indigo-800 transition"
          >
            Ascend
          </Link>

          {/* Hide Home when shouldHideLinks is true */}
          {!shouldHideLinks && (
            <Link
              to="/"
              className="text-xl font-semibold hover:text-blue-500 transition"
            >
              Home
            </Link>
          )}
        </div>

        {/* Right Section: Navbar Links */}
        <div className="flex items-center space-x-6">
          {isAuthenticated ? (
            <>
              {/* Hide Dashboard when shouldHideLinks is true */}
              {!shouldHideLinks && (
                <Link
                  to={`/${userRole}/dashboard`}
                  className="hover:text-blue-500 transition"
                >
                  Dashboard
                </Link>
              )}

              {!shouldHideLinks && userRole === "employer" && (
                <>
                  <Link to="/employer/profile" className="hover:text-blue-500">
                    Profile
                  </Link>
                  <Link to="/employer/jobs" className="hover:text-blue-500">
                    List Jobs
                  </Link>
                  <Link to="/employer/expiredjobs" className="hover:text-blue-500">
                    Expired Jobs
                  </Link>
                  <Link
                    to="/employer/create-job"
                    className="hover:text-blue-500"
                  >
                    Create Job
                  </Link>
                </>
              )}

              {!shouldHideLinks && userRole === "jobseeker" && (
                <>
                  <Link to="/jobseeker/profile" className="hover:text-blue-500">
                    Profile
                  </Link>
                  <Link to="/jobseeker/jobs" className="hover:text-blue-500">
                    Jobs
                  </Link>
                  <Link to="/jobseeker/my-jobs" className="hover:text-blue-500">
                    My Jobs
                  </Link>
                  <Link
                    to="/jobseeker/savedJobs"
                    className="hover:text-blue-500"
                  >
                    Saved Jobs
                  </Link>
                </>
              )}

              {userRole === "admin" && (
                <>
                  <Link
                    to="/admin/jobseeker-list"
                    className="hover:text-blue-500"
                  >
                    Jobseeker List
                  </Link>
                  <Link
                    to="/admin/employer-list"
                    className="hover:text-blue-500"
                  >
                    Employer List
                  </Link>
                  <Link
                    to="/admin/employer-verification"
                    className="hover:text-blue-500"
                  >
                    Verify Employers
                  </Link>
                  <Link
                    to="/admin/subscription-plans"
                    className="hover:text-blue-500"
                  >
                    Subscription List
                  </Link>
                  <Link to="/admin/jobs" className="hover:text-blue-500">
                    Verify Jobs
                  </Link>
                </>
              )}

              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              {/* Register Button */}
              <Link
                to="/register"
                className={`${
                  isScrolled
                    ? "border border-black bg-black text-white px-4 py-2 rounded hover:bg-white hover:text-black transition"
                    : "border border-white bg-white text-black px-4 py-2 rounded hover:bg-black hover:text-white transition"
                }`}
              >
                Register
              </Link>

              {/* Login Button */}
              <Link
                to="/login"
                className="bg-black text-white px-4 py-2 rounded border border-white hover:bg-white hover:text-black transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
