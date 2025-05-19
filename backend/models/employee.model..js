const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    required: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  employeeID: {
    type: String,
    required: true,
    unique: true
  },
  dateOfJoining: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Resigned', 'Terminated'],
    default: 'Active'
  },
  dateOfBirth: {
    type: Date
  },
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Employee', employeeSchema);
