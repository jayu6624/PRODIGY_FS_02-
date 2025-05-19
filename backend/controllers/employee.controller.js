const Employee = require("../models/employee.model");
const asyncHandler = require("express-async-handler");

// @desc    Create new employee
// @route   POST /api/employee
// @access  Private
const createEmployee = asyncHandler(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    position,
    department,
    startDate,
    salary,
  } = req.body;

  const employee = await Employee.create({
    firstName,
    lastName,
    email,
    position,
    department,
    startDate,
    salary,
    createdBy: req.user._id,
  });

  res.status(201).json(employee);
});

// @desc    Get all employees
// @route   GET /api/employee
// @access  Private
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await Employee.find({ createdBy: req.user._id });
  res.json(employees);
});

// @desc    Update employee
// @route   PUT /api/employee/:id
// @access  Private
const updateEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Make sure user owns employee
  if (employee.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this employee");
  }

  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.json(updatedEmployee);
});

// @desc    Delete employee
// @route   DELETE /api/employee/:id
// @access  Private
const deleteEmployee = asyncHandler(async (req, res) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    res.status(404);
    throw new Error("Employee not found");
  }

  // Make sure user owns employee
  if (employee.createdBy.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this employee");
  }

  await employee.deleteOne();
  res.json({ message: "Employee removed" });
});

module.exports = {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
};
