// routes/serve.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Rental = require('../models/Rental');
const path = require('path');
const fs = require('fs');

router.get('/pdf/:rentalId', async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(401).send('Access denied. No token.');
  }

  try {
    // 1. Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 2. Check if the token matches the rental ID
    if (decoded.rentalId !== req.params.rentalId) {
      return res.status(401).send('Access denied. Invalid token.');
    }

    // 3. Get the rental and book data
    const rental = await Rental.findById(req.params.rentalId).populate('book');
    if (!rental) {
      return res.status(404).send('Rental not found.');
    }

    // 4. Check expiry again (as a final safeguard)
    if (new Date() > new Date(rental.expiryDate)) {
      return res.status(403).send('Rental has expired.');
    }

    // 5. Get the PDF file path
    const pdfKey = rental.book.pdfKey;
    const filePath = path.join(__dirname, '..', 'private_pdfs', pdfKey);

    // 6. Check if file exists and stream it
    if (fs.existsSync(filePath)) {
      res.contentType('application/pdf');
      fs.createReadStream(filePath).pipe(res);
    } else {
      res.status(404).send('Book file not found.');
    }
  } catch (error) {
    res.status(401).send('Access denied. Invalid or expired token.');
  }
});

module.exports = router;