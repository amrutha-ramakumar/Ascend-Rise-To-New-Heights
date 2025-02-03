// import { useAuth } from '../../contexts/AuthContexts'

// const JobseekerDashboard = () => {
//   const { logout } = useAuth()

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <h1 className="text-3xl font-bold mb-8">Jobseeker Dashboard</h1>
//       <p className="mb-4">Welcome to your jobseeker dashboard!</p>
//       <button
//         onClick={logout}
//         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
//       >
//         Logout
//       </button>
      
//     </div>
//   )
// }

// export default JobseekerDashboard




import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {  ChevronRight, Search } from 'lucide-react';
import BASE_URL from "../../api/BaseUrl";

export default function Home() {
  const navigate = useNavigate();
  // const [industries, setIndustries] = useState([]);
  // const [currentIndustryIndex, setCurrentIndustryIndex] = useState(0);
  const [searchData, setSearchData] = useState({
    skills: "",
    designation: "",
    company: "",
    experience: "0-2",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [jobsError, setJobsError] = useState(null);

  useEffect(() => {
    // const fetchIndustries = async () => {
    //   try {
    //     const response = await fetch(`${BASE_URL}/industry`);
    //     const data = await response.json();
    //     setIndustries(data);
    //   } catch (error) {
    //     console.error("Failed to fetch industries:", error);
    //   }
    // };

    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${BASE_URL}/api/jobs/listalljob`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await response.json();
        setJobs(data.slice(0, 6)); // Only take the first 6 jobs
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
        setJobsError("Failed to load job listings. Please try again later.");
      }
    };

    // fetchIndustries();
    fetchJobs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/jobs/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(searchData),
      });

      if (response.ok) {
        const data = await response.json();
        navigate("/search-results", { state: { results: data } });
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyNow = (jobId) => {
    navigate(`/jobseeker/apply-job/${jobId}`);
  };

  const experienceOptions = [
    { value: "0-2", label: "0-2 Years" },
    { value: "2-5", label: "2-5 Years" },
    { value: "5-8", label: "5-8 Years" },
    { value: "8+", label: "8+ Years" },
  ];

  // const handlePrevIndustries = () => {
  //   setCurrentIndustryIndex((prev) => Math.max(0, prev - 3));
  // };

  // const handleNextIndustries = () => {
  //   setCurrentIndustryIndex((prev) =>
  //     Math.min(industries.length - 3, prev + 3)
  //   );
  // };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gray-50 py-24 mt-8 shadow-md">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-4">Find Your Dream Job Now</h1>
            <p className="text-xl text-gray-600">Rise To New Heights</p>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-5xl mx-auto">
            <div className="flex items-center bg-white rounded-full shadow-lg p-2">
              <div className="flex items-center flex-1 min-w-0">
                <Search className="h-5 w-5 text-gray-400 ml-3" />
                <div className="flex-1 flex">
                  <input
                    type="text"
                    placeholder="Skills"
                    className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
                    value={searchData.skills}
                    onChange={(e) =>
                      setSearchData({ ...searchData, skills: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Designation"
                    className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
                    value={searchData.designation}
                    onChange={(e) =>
                      setSearchData({
                        ...searchData,
                        designation: e.target.value,
                      })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Company"
                    className="flex-1 px-3 py-2 text-gray-700 focus:outline-none"
                    value={searchData.company}
                    onChange={(e) =>
                      setSearchData({ ...searchData, company: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="h-6 w-px bg-gray-300 mx-2" />
              <div className="relative min-w-[180px]">
                <select
                  className="w-full px-3 py-2 appearance-none focus:outline-none text-gray-700"
                  value={searchData.experience}
                  onChange={(e) =>
                    setSearchData({ ...searchData, experience: e.target.value })
                  }
                >
                  <option value="" disabled>
                    SELECT EXPERIENCE
                  </option>
                  {experienceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronRight className="h-4 w-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 transform rotate-90" />
              </div>
              <div className="h-6 w-px bg-gray-300 mx-2" />
              <input
                type="text"
                placeholder="LOCATION"
                className="px-3 py-2 min-w-[150px] text-gray-700 focus:outline-none"
                value={searchData.location}
                onChange={(e) =>
                  setSearchData({ ...searchData, location: e.target.value })
                }
              />
              <button
                type="submit"
                disabled={isLoading}
                className="ml-2 px-8 py-2 bg-black text-white rounded-full hover:bg-gray-800 transition-colors disabled:bg-gray-400"
              >
                {isLoading ? "Searching..." : "SEARCH"}
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">Latest Job Openings</h3>
            <Link to="/jobseeker/jobs" className="text-blue-600 hover:underline">
              Explore more
            </Link>
          </div>
          {jobsError ? (
            <p className="text-red-500 text-center">{jobsError}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold mb-2">{job.position}</h4>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-sm text-gray-500 mb-2">{job.location}</p>
                  <p className="text-sm text-gray-500 mb-4">Experience: {job.experience}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      Posted: {new Date(job.postedAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => job.hasApplied ? null : handleApplyNow(job.id)}
                      className={`px-4 py-2 rounded transition-colors ${
                        job.hasApplied
                          ? 'bg-green-500 text-white cursor-default'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                      disabled={job.hasApplied}
                    >
                      {job.hasApplied ? 'Applied' : 'Apply Now'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Companies Section */}
      {/* <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">
              Popular Industries
            </h3>
            <p className="text-sm text-gray-500">
              Explore job opportunities by industry
            </p>
          </div>

          <div className="flex justify-between mb-4">
            <button
              onClick={handlePrevIndustries}
              disabled={currentIndustryIndex === 0}
              className="p-2 bg-white rounded-full shadow-md disabled:opacity-50 hover:bg-gray-50 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextIndustries}
              disabled={currentIndustryIndex >= industries.length - 6}
              className="p-2 bg-white rounded-full shadow-md disabled:opacity-50 hover:bg-gray-50 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries
              .slice(currentIndustryIndex, currentIndustryIndex + 6)
              .map((industry) => (
                <Link
                  key={industry.id}
                  to={`/jobs/${industry.slug}`}
                  className="group relative bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="p-6 flex flex-col items-center text-center">
                    <span className="p-4 bg-blue-100 rounded-full mb-4">
                      <svg
                        className="h-10 w-10 text-blue-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            industry.icon ||
                            "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          }
                        />
                      </svg>
                    </span>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600">
                      {industry.industryType}
                    </h4>
                    <p className="text-sm text-gray-600">
                      Explore job roles in {industry.industryType}
                    </p>
                  </div>
                  <div className="absolute inset-0 bg-blue-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                </Link>
              ))}
          </div>
        </div>
      </section> */}

      {/* Discover Section */}
      <section className="bg-white py-16 shadow-inner">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="text-4xl font-bold mb-4">
                Discover jobs across popular roles
              </h2>
              <p className="text-lg text-gray-600">
                Find the perfect position for your next career move.
              </p>
              <p className="mt-4 text-gray-700">
                <strong>For Employers:</strong> Our platform offers a seamless
                way to connect with top talent across various industries,
                ensuring you find the right candidates for your job openings.
              </p>
              <p className="mt-2 text-gray-700">
                <strong>For Developers and Job Seekers:</strong> Whether
                you&apos;re a fresher or an experienced professional, explore a
                wide range of job opportunities tailored to your skills,
                experience, and aspirations.
              </p>
            </div>
            <div className="w-full md:w-1/3">
              <img
                src="/src/assets/JobSearch.png"
                alt="Job search illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}




