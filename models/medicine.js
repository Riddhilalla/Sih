const mongoose = require('mongoose');

// Define the Medicine schema
const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  batchNumber: String,
  expiryDate: String,
  storageConditions: String,
  quantity: { type: Number, default: 1 },
});

// Export the Medicine model
module.exports = mongoose.model('Medicine', medicineSchema);
