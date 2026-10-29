// Backend/models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  coverImage: { type: String, required: true },
  description: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  pdfKey: { type: String, required: true },
  genre: { type: String, required: true }, // <-- ADD THIS LINE
});

// This tells Mongoose to create a virtual 'id' field
BookSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

BookSchema.set('toJSON', {
  virtuals: true,
});

module.exports = mongoose.model('Book', BookSchema);