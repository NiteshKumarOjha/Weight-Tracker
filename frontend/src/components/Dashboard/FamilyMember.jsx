import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaWeight, FaCalendarAlt } from "react-icons/fa";
import api from "../../utils/api";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FamilyMemberDetails = () => {
  const { memberId } = useParams();
  const [name, setName] = useState("");
  const [weightHistory, setWeightHistory] = useState([]);
  const [newWeight, setNewWeight] = useState("");
  const [date, setDate] = useState("");
  const [unit, setUnit] = useState("kg");
  const [chartUnit, setChartUnit] = useState("kg");
  const [error, setError] = useState("");
  const [viewType, setViewType] = useState("table");
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const navigate = useNavigate();

  const fetchName = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/user/family/${memberId}/name`, {
        headers: {
          "x-auth-token": token,
        },
      });

      setName(response.data.name);
    } catch (error) {
      console.error("Error fetching name:", error);
      setError("Failed to fetch name");
    }
  };

  const fetchWeightHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get(`/user/family/${memberId}/history`, {
        headers: {
          "x-auth-token": token,
        },
      });
      setWeightHistory(response.data);
    } catch (error) {
      console.error("Error fetching weight history:", error);
      setError("Failed to fetch weight history");
    }
  };

  const handleAddWeight = async (e) => {
    e.preventDefault();
    try {
      const weightInKg = unit === "lbs" ? newWeight / 2.20462 : newWeight;
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/user/family/${memberId}/weight`,
        { weight: weightInKg, date },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );
      setWeightHistory(response.data);
      setNewWeight("");
      setDate("");
    } catch (error) {
      console.error("Error adding weight record:", error);
      setError("Failed to add weight record");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  useEffect(() => {
    fetchWeightHistory();
    fetchName();
  }, [memberId]);

  const chartData = {
    labels: weightHistory.map((record) =>
      new Date(record.date).toLocaleDateString()
    ),
    datasets: [
      {
        label: `Weight (${chartUnit})`,
        data: weightHistory.map((record) =>
          chartUnit === "lbs" ? record.weight * 2.20462 : record.weight
        ),
        borderColor: "rgba(63, 81, 181, 1)",
        backgroundColor: "rgba(63, 81, 181, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 px-8 py-12 font-sans">
      <h2 className="text-4xl lg:text-6xl font-bold mb-12 lg:mb-16 text-center text-white">
        {`${name}'s`} Weight Tracker
      </h2>
      {error && <p className="text-red-400 text-center">{error}</p>}

      <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto">
        <button
          onClick={handleBackToDashboard}
          className="py-2 px-4 bg-green-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-green-700 transition-transform transform hover:scale-105"
        >
          Dashboard
        </button>

        <button
          onClick={handleLogout}
          className="py-2 px-4 bg-red-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-red-700 transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleAddWeight}
        className="mb-10 max-w-3xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md"
      >
        <h3 className="text-3xl font-bold text-center text-white mb-8">
          Add Weight Record
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center space-x-4">
            <div className="relative w-full">
              <FaWeight className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                placeholder={`Weight (${unit})`}
                value={newWeight}
                onChange={(e) => setNewWeight(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 p-3 pl-12 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:shadow-md"
                required
              />
            </div>
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="bg-gray-700 text-gray-100 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:shadow-md"
            >
              <option value="kg">Kilograms (kg)</option>
              <option value="lbs">Pounds (lbs)</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative w-full">
              <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-gray-700 text-gray-100 placeholder-gray-400 p-3 pl-12 rounded-lg w-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition hover:shadow-md"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="mt-8 w-full py-3 px-6 bg-blue-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Add Weight Record
        </button>
      </form>

      <h3 className="text-4xl font-bold mb-6 mt-16 text-center text-white">
        Weight History
      </h3>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setViewType("table")}
          className={`mr-4 py-2 px-4 rounded-lg transition ${
            viewType === "table"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Table View
        </button>
        <button
          onClick={() => {
            setViewType("chart");
            setIsChartModalOpen(true);
          }}
          className={`py-2 px-4 rounded-lg transition ${
            viewType === "chart"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 text-gray-300 hover:bg-gray-700"
          }`}
        >
          Chart View
        </button>
      </div>

      {viewType === "table" && (
        <>
          {weightHistory.length > 0 ? (
            <div className="overflow-x-auto max-w-4xl mx-auto">
              <table className="w-full bg-gray-800 text-gray-100 rounded-lg shadow-lg border border-gray-600">
                <thead>
                  <tr className="bg-gray-700">
                    <th className="p-4 text-left text-lg font-medium border-b border-gray-600">
                      Date
                    </th>
                    <th className="p-4 text-left text-lg font-medium border-b border-gray-600">
                      Weight (kg)
                    </th>
                    <th className="p-4 text-left text-lg font-medium border-b border-gray-600">
                      Weight (lbs)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {weightHistory.map((record, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-600 transition-transform transform hover:bg-gray-600 ${
                        index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"
                      }`}
                    >
                      <td className="p-4 border-r border-gray-600">
                        {new Date(record.date).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </td>
                      <td className="p-4 border-r border-gray-600">
                        {record.weight.toFixed(2)} kg
                      </td>
                      <td className="p-4">
                        {(record.weight * 2.20462).toFixed(2)} lbs
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-center text-gray-300">
              No weight history found.
            </p>
          )}
        </>
      )}

      {isChartModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setIsChartModalOpen(false)}
        >
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-3/4">
            <h3 className="text-3xl font-bold text-center text-white mb-4">
              Weight History Chart
            </h3>
            <Line data={chartData} options={{ responsive: true }} />
            <button
              className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              onClick={() => setIsChartModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FamilyMemberDetails;
