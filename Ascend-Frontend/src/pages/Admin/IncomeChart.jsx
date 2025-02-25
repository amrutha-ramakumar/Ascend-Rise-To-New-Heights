import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import BASE_URL from "../../api/BaseUrl";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeChart = ({ type = "daily", year, month }) => {
  // Get current year & month
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // JS months are 0-based

  const [incomeData, setIncomeData] = useState([]);
  const [labels, setLabels] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    let url = `${BASE_URL}/api`;

    // Set default values if not provided
    const selectedYear = year || currentYear;
    const selectedMonth = month || currentMonth;

    if (type === "yearly") {
      url += `/yearly?year=${selectedYear}`;
    } else if (type === "monthly") {
      url += `/monthly?year=${selectedYear}`;
    } else {
      // Default to daily with current month and year
      url += `/daily?year=${selectedYear}&month=${selectedMonth}`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (!data || Object.keys(data).length === 0) {
          setIncomeData([]);
          setLabels([]);
          return;
        }

        if (type === "yearly") {
          if (typeof data === "number") {
            setIncomeData([data]); // Single-year value
            setLabels([String(selectedYear)]);
          } else {
            const sortedKeys = Object.keys(data).sort();
            setIncomeData(sortedKeys.map((key) => parseFloat(data[key])));
            setLabels(sortedKeys);
          }
        } else {
          const sortedKeys = Object.keys(data).sort((a, b) => Number(a) - Number(b));
          setIncomeData(sortedKeys.map((key) => parseFloat(data[key])));
          setLabels(
            sortedKeys.map((key) =>
              type === "monthly" ? `Month ${key}` : `Day ${key}`
            )
          );
        }
      })
      .catch((error) => console.error("Error fetching income data:", error));
  }, [type, year, month, token]);

  return (
    <div style={{ width: "100%", maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>
        {type.charAt(0).toUpperCase() + type.slice(1)} Income Chart
      </h2>
      <div style={{ height: "400px", padding: "10px" }}>
        {incomeData.length > 0 ? (
          <Bar
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Total Income",
                  data: incomeData,
                  backgroundColor: "rgba(75,192,192,0.6)",
                  borderColor: "rgba(75,192,192,1)",
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: {
                  title: { display: true, text: type === "yearly" ? "Year" : "Time Period" },
                },
                y: {
                  title: { display: true, text: "Income (USD)" },
                  beginAtZero: true,
                },
              },
              plugins: {
                legend: { display: true, position: "top" },
              },
            }}
          />
        ) : (
          <p style={{ textAlign: "center", fontSize: "18px" }}>No data available</p>
        )}
      </div>
    </div>
  );
};

// Prop Validation
IncomeChart.propTypes = {
  type: PropTypes.oneOf(["yearly", "monthly", "daily"]),
  year: PropTypes.number,
  month: PropTypes.number,
};

export default IncomeChart;
