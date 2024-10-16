import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("Error signing up");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/80 backdrop-blur-md p-10 rounded-lg shadow-2xl w-96 transform transition-all  duration-300 ease-in-out"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Create Account
        </h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="block w-full p-4 mb-4 text-gray-900 rounded-md border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full p-4 mb-4 text-gray-900 rounded-md border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full p-4 mb-6 text-gray-900 rounded-md border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full py-4 text-xl text-white bg-gradient-to-r from-blue-500 to-purple-500 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Sign Up
        </button>
        <p className="mt-6 text-lg text-center text-gray-400">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-500 hover:text-blue-600 transition ease-in-out duration-300"
          >
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
