// Backend/routes/rentals.js
const express = require('express');
const router = express.Router();
const Rental = require('../models/Rental');
const Book = require('../models/Book');
const { protect } = require('../middleware/auth');
const jwt = require('jsonwebtoken');

// GET /api/v1/rentals/my-rentals
router.get('/my-rentals', protect, async (req, res) => {
  const rentals = await Rental.find({ user: req.user._id }).populate('book');
  res.json(rentals);
});

// POST /api/v1/rentals
router.post('/', protect, async (req, res) => {
  const { bookId, duration } = req.body; // duration in days

  const book = await Book.findById(bookId);
  if (!book) return res.status(404).json({ message: 'Book not found' });

  // Check if already rented
  const existingRental = await Rental.findOne({
    user: req.user._id,
    book: bookId,
    expiryDate: { $gt: new Date() },
  });

  if (existingRental) {
    return res.status(400).json({ message: 'You have already rented this book' });
  }

  const startDate = new Date();

  
  const durationInDays = parseFloat(duration);
  const durationInMilliseconds = durationInDays * 24 * 60 * 60 * 1000;
  const expiryDate = new Date(startDate.getTime() + durationInMilliseconds);
  

  const rental = new Rental({
    user: req.user._id,
    book: bookId,
    startDate,
    expiryDate,
  });

  const createdRental = await rental.save();
  res.status(201).json(createdRental);
});

// POST /api/v1/rentals/:rentalId/access
// This is the new endpoint we designed. It creates a short-lived token.
router.post('/:rentalId/access', protect, async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.rentalId).populate('book');

    if (!rental) {
      return res.status(404).json({ message: 'Rental not found' });
    }

    // Check if the rental belongs to the logged-in user
    if (rental.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Check if the rental is expired
    if (new Date() > new Date(rental.expiryDate)) {
      return res.status(403).json({ hasAccess: false, message: 'Rental has expired' });
    }

    // All checks passed!
    // Create a special, short-lived token (5 mins) just for PDF access.
    const access_token = jwt.sign(
      { rentalId: rental._id },
      process.env.JWT_SECRET,
      { expiresIn: '5m' }
    );

    // Send back the rental info, access status, and the secure URL
    res.json({
      hasAccess: true,
      rental: rental,
      access_url: `http://localhost:5000/api/v1/serve/pdf/${rental._id}?token=${access_token}`,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;