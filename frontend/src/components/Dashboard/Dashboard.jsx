import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import FamilyMemberForm from "./FamilyMemberForm";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [familyMembers, setFamilyMembers] = useState([]);
  const [weightSummaries, setWeightSummaries] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/user/profile", {
        headers: {
          "x-auth-token": token,
        },
      });
      setUserProfile(response.data);
      setFamilyMembers(response.data.familyMembers || []);
      fetchWeightSummaries(response.data.familyMembers);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to fetch user profile");
    }
  };

  const fetchWeightSummaries = async (members) => {
    const token = localStorage.getItem("token");
    const summaries = {};

    for (const member of members) {
      try {
        const response = await api.get(`/user/family/${member._id}/summary`, {
          headers: {
            "x-auth-token": token,
          },
        });
        console.log(response.data);
        summaries[member._id] = response.data;
      } catch (error) {
        console.error("Error fetching weight summary:", error);
        setError("Failed to fetch weight summary for some family members");
      }
    }

    setWeightSummaries(summaries);
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleMemberClick = (memberId) => {
    navigate(`/dashboard/family/${memberId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-8">
      <div className="flex justify-between w-full max-w-3xl mb-6">
        <h2 className="text-4xl font-bold">Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition duration-200"
        >
          Logout
        </button>
      </div>
      {error && <p className="text-red-400 mb-4">{error}</p>}
      {userProfile ? (
        <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-3xl border border-gray-700">
          <h3 className="text-3xl font-semibold mb-3">
            Welcome, {userProfile.name}
          </h3>
          <p className="mb-4 text-lg">Email: {userProfile.email}</p>

          <FamilyMemberForm setFamilyMembers={setFamilyMembers} />

          <h4 className="text-2xl font-semibold mt-6">Family Members</h4>
          {familyMembers.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 mt-4">
              {familyMembers.map((member) => (
                <div
                  key={member._id}
                  onClick={() => handleMemberClick(member._id)}
                  className="bg-gray-700 text-white p-6 rounded-lg shadow-lg hover:bg-gray-600 transition duration-200 flex flex-col justify-between"
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold">{member.name}</span>
                    <span className="text-lg">{member.relation}</span>
                  </div>
                  {weightSummaries[member._id] && (
                    <div className="text-sm">
                      <div className="text-lg">
                        <strong>Highest:</strong>{" "}
                        {weightSummaries[member._id].highestWeight || "N/A"} kg
                        (
                        {weightSummaries[member._id].highestWeight
                          ? (
                              weightSummaries[member._id].highestWeight *
                              2.20462
                            ).toFixed(2)
                          : "N/A"}{" "}
                        lbs) on
                        {weightSummaries[member._id].highestWeightDates && (
                          <span>
                            {" "}
                            {weightSummaries[
                              member._id
                            ].highestWeightDates.join(", ")}
                          </span>
                        )}
                      </div>
                      <div className="text-lg">
                        <strong>Lowest:</strong>{" "}
                        {weightSummaries[member._id].lowestWeight || "N/A"} kg (
                        {weightSummaries[member._id].lowestWeight
                          ? (
                              weightSummaries[member._id].lowestWeight * 2.20462
                            ).toFixed(2)
                          : "N/A"}{" "}
                        lbs) on
                        {weightSummaries[member._id].lowestWeightDates && (
                          <span>
                            {" "}
                            {weightSummaries[member._id].lowestWeightDates.join(
                              ", "
                            )}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 mt-4">No family members added.</p>
          )}
        </div>
      ) : (
        <p className="text-gray-400">Loading profile...</p>
      )}
    </div>
  );
};

export default Dashboard;
