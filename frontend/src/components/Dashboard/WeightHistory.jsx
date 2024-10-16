import React, { useEffect, useState } from "react";
import api from "../../utils/api"; 

const WeightHistory = ({ member }) => {
  const [weightHistory, setWeightHistory] = useState([]);
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    setWeightHistory(member.weightHistory || []); 
  }, [member]);

  const handleWeightSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await api.post(
        `/user/family/${member._id}/weight`,
        { weight, date },
        {
          headers: { "x-auth-token": token }, 
        }
      );

     
      setWeightHistory(response.data.weightHistory || []);
      setWeight("");
      setDate("");
    } catch (error) {
      console.error("Error adding weight record:", error);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold mb-4">
        {member.name}'s Weight History
      </h3>

      <form
        onSubmit={handleWeightSubmit}
        className="mb-4 flex flex-col sm:flex-row"
      >
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="p-2 mb-2 sm:mb-0 sm:mr-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          className="p-2 mb-2 sm:mb-0 sm:mr-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
        <button
          type="submit"
          className="bg-orange-500 text-white p-2 rounded hover:bg-orange-400 transition duration-200"
        >
          Add Weight
        </button>
      </form>
    </div>
  );
};

export default WeightHistory;
