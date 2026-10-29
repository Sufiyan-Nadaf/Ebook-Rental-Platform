// models/Rental.js
const mongoose = require('mongoose');

const RentalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Book',
  },
  startDate: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
});

module.exports = mongoose.model('Rental', RentalSchema);