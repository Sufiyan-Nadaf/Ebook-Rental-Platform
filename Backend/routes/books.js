// Backend/routes/books.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');


router.get('/', async (req, res) => {
  const { genre } = req.query; // 

  const filter = {}; // Create an empty filter object

  if (genre) {
    filter.genre = genre; // If genre exists, add it to the filter
  }

  const books = await Book.find(filter);

  
  res.json(books);
});

router.get('/featured', async (req, res) => {
  const books = await Book.find({}).limit(4);
  res.json(books);
});

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (book) {
    res.json(book);
  } else {
    res.status(404).json({ message: 'Book not found' });
  }
});

module.exports = router;