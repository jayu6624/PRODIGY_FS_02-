const router = require("express").Router();
const {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employee.controller");

const { protect } = require("../middleware/auth");

// All routes here are protected (require authentication)
router.use(protect);

router.post("/employee", createEmployee); // Create employee
router.get("/employee", getEmployees); // Get all employees
router.put("/employee/:id", updateEmployee); // Update employee
router.delete("/employee/:id", deleteEmployee); // Delete employee

module.exports = router;
