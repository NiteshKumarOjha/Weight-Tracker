import React, { useState } from "react";
import api from "../../utils/api";

const FamilyMemberForm = ({ setFamilyMembers }) => {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await api.post(
        "/user/family",
        { name, relation },
        { headers: { "x-auth-token": token } } 
      );
      setFamilyMembers(response.data);
      setName("");
      setRelation("");
    } catch (error) {
      console.error("Error adding family member:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-4 rounded-lg shadow-md mb-4"
    >
      <h3 className="text-xl font-semibold mb-2">Add Family Member</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full p-2 mb-2 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Relation"
        value={relation}
        onChange={(e) => setRelation(e.target.value)}
        required
        className="w-full p-2 mb-4 bg-gray-700 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition duration-200"
      >
        Add Member
      </button>
    </form>
  );
};

export default FamilyMemberForm;
