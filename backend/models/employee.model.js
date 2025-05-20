const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    employeeID: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    department: {
      type: String,
      required: [true, "Department is required"],
      enum: ["Engineering", "Marketing", "Sales", "HR", "Finance"],
      trim: true,
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Resigned", "Terminated"],
      default: "Active",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
employeeSchema.index({ createdBy: 1 });
employeeSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("Employee", employeeSchema);
