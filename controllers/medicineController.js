const Tesseract = require('tesseract.js');
const Medicine = require('../models/medicine');

// Function to handle file upload and OCR processing for inventory bill
const updateMedicineQuantity = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const filePath = req.file.path;

  try {
    // Process the image and recognize text
    const { data: { text } } = await Tesseract.recognize(filePath, 'eng', { logger: (m) => console.log(m) });
    console.log("OCR Extracted Text:\n", text);

    // Extract relevant fields from OCR output
    const lines = text.split("\n");
    const alerts = [];
    await Promise.all(lines.map(async (line) => {
      const [medicineName, quantityStr] = line.split(":");
      
      if (medicineName && quantityStr) {
        const name = medicineName.trim();
        const quantity = parseInt(quantityStr.trim(), 10);

        if (!isNaN(quantity) && quantity > 0) {
          try {
            const existingMedicine = await Medicine.findOne({ name });

            if (existingMedicine) {
              existingMedicine.quantity = Math.max(existingMedicine.quantity - quantity, 0);
              await existingMedicine.save();
              console.log(`Updated ${name}: New Quantity = ${existingMedicine.quantity}`);

              // Check for low inventory and expiry
              if (existingMedicine.quantity < 10) {
                alerts.push(`Low inventory alert: ${name}. Current quantity: ${existingMedicine.quantity}`);
              }

              const alertDate = new Date();
              alertDate.setMonth(alertDate.getMonth() + 1);
              if (existingMedicine.expiryDate && existingMedicine.expiryDate <= alertDate) {
                alerts.push(`Expiry alert: ${name} (Batch: ${existingMedicine.batchNumber}) is nearing expiry on ${new Date(existingMedicine.expiryDate).toDateString()}`);
              }
            } else {
              console.log(`Medicine ${name} not found in database.`);
            }
          } catch (err) {
            console.error("Error updating medicine quantity:", err);
            return res.status(500).send("Error updating medicine quantity.");
          }
        } else {
          console.log(`Invalid quantity for ${name}: ${quantityStr}`);
        }
      }
    }));

    // Fetch updated inventory details
    const inventory = await Medicine.find();

    // Render update.ejs with inventory data and alerts
    res.render('update', { inventory, alerts });
  } catch (err) {
    console.error("OCR Error:", err);
    res.status(500).send("Error processing OCR data.");
  }
};

module.exports = { updateMedicineQuantity };
