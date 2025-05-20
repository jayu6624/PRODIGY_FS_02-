import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import employeeApi from "../services/employee";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    email: "",
    position: "",
    department: "",
    startDate: "",
    salary: "",
  });

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const employee = await employeeApi.getEmployeeById(id);
        setFormData({
          employeeID: employee.employeeID,
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          position: employee.position,
          department: employee.department,
          startDate: employee.startDate.split("T")[0], // Format date for input
          salary: employee.salary,
        });
      } catch (error) {
        toast.error("Failed to fetch employee details");
        navigate("/home/list");
      }
    };

    fetchEmployee();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await employeeApi.updateEmployee(id, formData);
      toast.success("Employee updated successfully!");
      navigate("/home/list");
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again");
        navigate("/login");
      } else {
        toast.error(error.message || "Failed to update employee");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Edit Employee
        </h2>
        <p className="text-gray-400 mt-2">Update employee information</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Employee ID
          </label>
          <input
            type="text"
            name="employeeID"
            value={formData.employeeID}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          >
            <option value="">Select Department</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Salary</label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
            required
          />
        </div>

        <div className="md:col-span-2 flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/home/list")}
            className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition duration-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-600 transition duration-300"
          >
            Update Employee
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployee;
