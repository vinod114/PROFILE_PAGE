import React, { useState } from "react";
import axios from "axios";

function LoginScreen() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const response = await axios.post("/api/users/login/", {
        email: formData.email,
        password: formData.password
      });

      console.log(response.data);

      setMessage("Registration successful! You can now log in.");
      setFormData({  email: "", password: "",  });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
    console.log("User Logged in:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-sm w-full register-form-parent">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4 register-form">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className=" btn btn-success w-100 w-full 0 text-white py-3 rounded-lg hover:bg-indigo-600 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginScreen;
