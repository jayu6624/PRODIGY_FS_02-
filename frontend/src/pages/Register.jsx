import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phonenumber: "",
    password: "",
  });
  const { signUp } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData);
      toast.success("Registration successful! Welcome aboard!");
      navigate("/home");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://img.freepik.com/free-vector/gradient-technological-background_23-2148884155.jpg?ga=GA1.1.625766992.1688508670&semt=ais_hybrid&w=740')`,
      }}
    >
      <div className="w-full max-w-2xl p-8 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="bg-gray-900/80 p-10 rounded-xl shadow-2xl border border-gray-700/50"
        >
          <h2 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            Create Account
          </h2>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
                className="w-full p-4 bg-gray-800/90 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 placeholder-gray-400"
                required
              />
              <input
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
                className="w-full p-4 bg-gray-800/90 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              />
            </div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 bg-gray-800/90 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
            <input
              name="phonenumber"
              placeholder="Phone Number"
              value={formData.phonenumber}
              onChange={handleChange}
              className="w-full p-4 bg-gray-800/90 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-4 bg-gray-800/90 text-white border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition duration-200 placeholder-gray-400"
              required
            />
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Register
            </button>
          </div>
          <p className="mt-6 text-center text-gray-300">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-cyan-400 hover:text-cyan-300 transition duration-200"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
