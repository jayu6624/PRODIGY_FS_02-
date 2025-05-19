import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";

const Home = () => {
  const { user, signOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    toast.info("You have been logged out successfully");
    navigate("/");
  };

  const isActivePath = (path) => {
    return location.pathname.includes(path);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      <div className="flex flex-col md:flex-row min-h-screen">
        {/* Mobile Menu Button */}
        {user && (
          <button
            onClick={toggleSidebar}
            className="md:hidden fixed top-4 right-4 z-50 p-2 rounded-lg bg-gray-800 text-white"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isSidebarOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        )}

        {/* Sidebar */}
        {user && (
          <aside
            className={`${
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0 fixed md:static top-0 left-0 h-full md:h-auto w-64 bg-gray-900 border-r border-gray-700 transition-transform duration-300 ease-in-out z-40`}
          >
            <div className="p-6 space-y-6 sticky top-0">
              {/* Logo or Brand */}
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-2xl font-bold">E</span>
                </div>
                <span className="text-xl font-bold">EMS</span>
              </div>

              <nav className="space-y-3">
                <Link
                  to="/home/create"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActivePath("/create")
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xl">➕</span>
                  <span>Create Employee</span>
                </Link>
                <Link
                  to="/home/list"
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition ${
                    isActivePath("/list")
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400"
                      : "hover:bg-gray-800"
                  }`}
                >
                  <span className="text-xl">📋</span>
                  <span>List of Employees</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 hover:from-red-500/30 hover:to-pink-500/30 transition"
                >
                  <span className="text-xl">🚪</span>
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </aside>
        )}

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-6">
          <div className="max-w-6xl mx-auto">
            {user ? (
              <div className="space-y-8">
                {/* Welcome Header */}
                <div className="text-center">
                  <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                    Welcome to Your Dashboard
                  </h1>
                  <p className="text-gray-400 text-lg md:text-xl">
                    We're glad to have you here!
                  </p>
                </div>

                {/* User Info Card */}
                <div className="bg-gray-800/50 p-6 rounded-2xl shadow-xl border border-gray-700/50 backdrop-blur-sm">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

                    {/* Quick Stats */}
                    <div className="flex gap-4">
                      <div className="text-center px-6 py-3 bg-gray-800/50 rounded-xl">
                        <div className="text-2xl font-bold text-cyan-400">
                          12
                        </div>
                        <div className="text-sm text-gray-400">
                          Total Employees
                        </div>
                      </div>
                      <div className="text-center px-6 py-3 bg-gray-800/50 rounded-xl">
                        <div className="text-2xl font-bold text-purple-400">
                          5
                        </div>
                        <div className="text-sm text-gray-400">Departments</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nested Routes Content */}
                <div className="bg-gray-800/40 p-6 rounded-xl shadow-lg border border-gray-700/30 backdrop-blur-sm">
                  <Outlet />
                </div>
              </div>
            ) : (
              // If user not logged in
              <div className="text-center space-y-8 mt-10">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Welcome to Our Platform
                </h1>
                <p className="text-xl text-gray-400">
                  Please login to access your personalized dashboard
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
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
        </main>
      </div>
    </div>
  );
};

export default Home;
