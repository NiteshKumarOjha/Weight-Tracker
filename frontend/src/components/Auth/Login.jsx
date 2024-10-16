import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/80 backdrop-blur-md p-10 rounded-lg shadow-2xl w-96 transform transition-all  duration-300 ease-in-out"
      >
        <h2 className="text-4xl font-extrabold text-center text-white mb-8">
          Welcome
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="block w-full p-4 mb-4 text-gray-900 rounded-md border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="block w-full p-4 mb-6 text-gray-900 rounded-md border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="w-full py-4 text-xl text-white bg-purple-600 rounded-md hover:bg-purple-700 transition duration-300 ease-in-out transform hover:-translate-y-1"
        >
          Login
        </button>
        <p className="mt-6 text-lg text-center text-gray-400">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-purple-400 hover:text-purple-600 transition ease-in-out duration-300"
          >
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;
