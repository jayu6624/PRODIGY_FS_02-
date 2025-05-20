import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import employeeApi from "../services/employee";

function EmployeeList() {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      position: "Software Engineer",
      department: "Engineering",
      startDate: "2023-01-15",
      salary: 85000,
    },
    // Add more dummy data as needed
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("");
  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.employeeID?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.position.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDepartment =
      !filterDepartment || employee.department === filterDepartment;

    return matchesSearch && matchesDepartment;
  });
  const fetchEmployees = async () => {
    try {
      const data = await employeeApi.getAllEmployees();
      setEmployees(data);
    } catch (error) {
      toast.error(error.message || "Failed to fetch employees");
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);
  const handleDelete = async (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await employeeApi.deleteEmployee(employeeId);
        toast.success("Employee deleted successfully");
        fetchEmployees(); // Refresh the list
      } catch (error) {
        toast.error(error.message || "Failed to delete employee");
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
          Employee Directory
        </h2>
        <p className="text-gray-400 mt-2">
          Manage your organization's workforce
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
          />
        </div>
        <div className="w-full md:w-48">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none transition text-white"
          >
            <option value="">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          {" "}
          <thead>
            <tr className="bg-gray-800/50">
              <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-700">
                Employee ID
              </th>
              <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-700">
                Name
              </th>
              <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-700">
                Position
              </th>
              <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-700">
                Department
              </th>
              <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-700">
                Start Date
              </th>
              <th className="p-4 text-left text-gray-300 font-semibold border-b border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((employee) => (
              <tr
                key={employee._id}
                className="hover:bg-gray-800/30 transition-colors"
              >
                <td className="p-4 border-b border-gray-700">
                  <span className="font-mono text-cyan-400">
                    {employee.employeeID}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-700">
                  <div>
                    <div className="font-medium text-white">{`${employee.firstName} ${employee.lastName}`}</div>
                    <div className="text-sm text-gray-400">
                      {employee.email}
                    </div>
                  </div>
                </td>
                <td className="p-4 border-b border-gray-700">
                  {employee.position}
                </td>
                <td className="p-4 border-b border-gray-700">
                  <span className="px-3 py-1 rounded-full text-sm bg-gray-700">
                    {employee.department}
                  </span>
                </td>
                <td className="p-4 border-b border-gray-700">
                  {new Date(employee.startDate).toLocaleDateString()}
                </td>
                <td className="p-4 border-b border-gray-700">
                  <div className="flex gap-2">
                    {" "}
                    <button
                      className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 rounded-lg transition"
                      onClick={() => navigate(`/home/edit/${employee._id}`)}
                    >
                      Edit
                    </button>
                    <button
                      className="px-3 py-1 text-sm bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-lg transition"
                      onClick={() => handleDelete(employee._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredEmployees.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No employees found matching your search criteria
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
