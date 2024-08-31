const express = require("express");
const mongoose = require("mongoose");
const Tesseract = require("tesseract.js");
const multer = require("multer");
const path = require("path");
const medicineRoutes = require('./routes/medicine');
const app = express();
const port = 2001;

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/registermedicine', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware for handling file uploads
const upload = multer({ dest: path.join(__dirname, 'uploads') });

// Routes
app.use('/', medicineRoutes);



// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
