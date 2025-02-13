import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const InterviewNotification = () => {
  const [interviews, setInterviews] = useState([]);
console.log(interviews)
  useEffect(() => {
    // Fetch today's interviews
    const fetchInterviews = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/interviews/today");
        const data = await response.json();
        setInterviews(data);

        // Show notification if there are interviews today
        if (data.length > 0) {
          data.forEach((interview) => {
            toast.info(`Interview Scheduled at ${interview.interviewTime}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
            });
          });
        }
      } catch (error) {
        console.error("Error fetching interviews:", error);
      }
    };

    fetchInterviews();
  }, []);

  return null;
};

export default InterviewNotification;
