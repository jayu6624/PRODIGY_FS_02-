const router = require('express').Router();
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} = require('../controllers/user.controller'); // or use employee.controller.js if you've separated it
const { protect } = require('../middleware/auth');

// Protected Routes for Employee CRUD
router.post('/employee', protect, createEmployee);           // Create
router.get('/employee', protect, getEmployees);              // Read All for Logged In Admin
router.put('/employee/:id', protect, updateEmployee);        // Update
router.delete('/employee/:id', protect, deleteEmployee);     // Delete

module.exports = router;
