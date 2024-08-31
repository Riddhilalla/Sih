const mongoose = require("mongoose");
const Medicine = require("./models/medicine"); // Adjust the path if needed

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/registermedicine", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Additional dummy data
const dummyMedicines = [
  {
    name: "Paracetamol",
    batchNumber: "P1234",
    expiryDate: new Date("2024-10-01"), // Expires in over a month
    storageConditions: "Store in a cool, dry place",
    quantity: 5,
  },
  {
    name: "Ibuprofen",
    batchNumber: "I5678",
    expiryDate: new Date("2024-09-15"), // Expires in less than a month
    storageConditions: "Store below 25°C",
    quantity: 10,
  },
  {
    name: "Aspirin",
    batchNumber: "A4321",
    expiryDate: new Date("2024-08-31"), // Already expired
    storageConditions: "Protect from light",
    quantity: 20,
  },
  {
    name: "Amoxicillin",
    batchNumber: "AM0987",
    expiryDate: new Date("2024-09-30"), // Expires in a month
    storageConditions: "Store at room temperature",
    quantity: 15,
  },
  {
    name: "Cetirizine",
    batchNumber: "C7654",
    expiryDate: new Date("2025-01-20"), // Safe for a while
    storageConditions: "Keep tightly closed",
    quantity: 50,
  },
  {
    name: "Cough Syrup",
    batchNumber: "CS8765",
    expiryDate: new Date("2024-08-25"), // Already expired
    storageConditions: "Do not refrigerate",
    quantity: 30,
  },
  {
    name: "Vitamin C Tablets",
    batchNumber: "VC5555",
    expiryDate: new Date("2024-11-10"), // Safe for over a month
    storageConditions: "Keep in a dry place",
    quantity: 100,
  },
  {
    name: "Metformin",
    batchNumber: "M4321",
    expiryDate: new Date("2024-09-05"), // Expires in a few days
    storageConditions: "Store in a cool place",
    quantity: 25,
  }
];

// Insert dummy data
Medicine.insertMany(dummyMedicines)
  .then(() => {
    console.log("Dummy data inserted successfully.");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error inserting dummy data:", err);
    mongoose.connection.close();
  });
