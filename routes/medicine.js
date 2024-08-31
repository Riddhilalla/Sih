const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const { updateMedicineQuantity } = require('../controllers/medicineController'); // Ensure this path is correct


// Set up file upload directory
const upload = multer({ dest: path.join(__dirname, '../uploads') });

// Route for handling file upload and OCR processing
router.post('/upload', upload.single('image'), updateMedicineQuantity);
// Test route for file upload
router.post('/test-upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  res.send(`File uploaded successfully: ${req.file.originalname}`);
});

// Route to serve the index page
router.get('/', (req, res) => {
  res.render('index'); // Render the index.ejs file
});

module.exports = router;