import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Home = () => {  const { user, signOut } = useContext(AuthContext);

  const handleLogout = () => {
    signOut();
    toast.info("You have been logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {user ? (
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
                  Welcome to Your Dashboard
                </h1>
                <p className="text-gray-400 text-xl">
                  We're glad to have you here!
                </p>
              </div>

              <div className="bg-gray-800/50 p-8 rounded-2xl shadow-2xl border border-gray-700/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">
                          {user.fullname?.firstname?.[0]?.toUpperCase() || "?"}
                        </span>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-white">
                          {user.fullname?.firstname} {user.fullname?.lastname}
                        </h2>
                        <p className="text-gray-400">{user.email}</p>
                      </div>
                    </div>
                  </div>                  <button
                    onClick={handleLogout}
                    className="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg font-semibold hover:from-red-600 hover:to-pink-600 transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center space-y-8">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Welcome to Our Platform
              </h1>
              <p className="text-xl text-gray-400">
                Please login to access your personalized dashboard
              </p>
              <div className="flex justify-center gap-4">
                <Link
                  to="/login"
                  className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
                >
                  Register
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
