const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.services');
const employeeModel = require('../models/employee.model');

module.exports.registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { firstname, lastname, email, password, phonenumber } = req.body;

    // Validate phone number
    if (phonenumber && !/^\d{10}$/.test(phonenumber)) {
      return res.status(400).json({
        message: "Invalid phone number format. Please provide a 10-digit number."
      });
    }

    // Check if user exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please try logging in."
      });
    }

    // Hash password and create user
    const hashedPassword = await userModel.hashPassword(password);
    const user = await userService.cerateUser({
      firstname,
      lastname,
      email,
      phonenumber,
      password: hashedPassword,
    });

    // Generate token and send response
    const token = user.generateAuthToken();
    
    // Remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({ 
      success: true,
      message: "Registration successful",
      token, 
      user: userResponse 
    });

  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({
      success: false,
      message: "An unexpected error occurred. Please try again later."
    });
  }
};

module.exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const { email, password } = req.body;
    
    // Find user and include password for verification
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Verify password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        success: false,
        message: "Invalid email or password" 
      });
    }

    // Generate token
    const token = user.generateAuthToken();

    // Set cookie and remove password from response
    const userResponse = user.toObject();
    delete userResponse.password;

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse
    });
    
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again."
    });
  }
};

module.exports.getProfile = async (req, res, next) => {
  try {
    // User is already attached to req by the auth middleware
    const user = req.user;

    // Return user data without sensitive information
    return res.status(200).json({
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      phonenumber: user.phonenumber,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error("Error in getProfile:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

// CREATE EMPLOYEE
module.exports.createEmployee = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg });
    }

    const employeeData = {
      ...req.body,
      createdBy: req.user._id
    };

    const employee = await employeeModel.create(employeeData);
    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      employee
    });
  } catch (error) {
    console.error("Error in creating an Employee:", error);
    return res.status(500).json({ message: "Error in Employee creation" });
  }
};

// READ EMPLOYEES (ALL OR BY ADMIN)
module.exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await employeeModel.find({ createdBy: req.user._id });
    res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return res.status(500).json({ message: "Error fetching employees" });
  }
};

// UPDATE EMPLOYEE
module.exports.updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedEmployee = await employeeModel.findOneAndUpdate(
      { _id: id, createdBy: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      employee: updatedEmployee
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    return res.status(500).json({ message: "Error updating employee" });
  }
};

// DELETE EMPLOYEE
module.exports.deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedEmployee = await employeeModel.findOneAndDelete({
      _id: id,
      createdBy: req.user._id
    });

    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found or unauthorized" });
    }

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    return res.status(500).json({ message: "Error deleting employee" });
  }
};

