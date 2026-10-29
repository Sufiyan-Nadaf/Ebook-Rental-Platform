const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db.js');
const Book = require('./models/Book.js');
const Rental = require('./models/Rental.js');
const User = require('./models/User.js');

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Rental.deleteMany();
    await Book.deleteMany();
    await User.deleteMany();

    const sampleBooks = [
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
        description:
          'A proven framework for improving every day through tiny habit changes.',
        pages: 256,
        rentalPrice: 185,
        pdfKey: 'atomic_habits.pdf',
        genre: 'non-fiction',
      },
      {
        title: 'The Midnight Library',
        author: 'Matt Haig',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9781786892720-L.jpg',
        description:
          'A novel about choices, regrets, and the infinite possibilities of life.',
        pages: 304,
        rentalPrice: 200,
        pdfKey: 'the_midnight_library.pdf',
        genre: 'fiction',
      },
      {
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg',
        description:
          'A classic exploring justice and racial inequality in the American South.',
        pages: 324,
        rentalPrice: 180,
        pdfKey: 'to_kill_a_mockingbird.pdf',
        genre: 'fiction',
      },
      {
        title: 'The Book Thief',
        author: 'Markus Zusak',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780375842207-L.jpg',
        description:
          'A story of a young girl who finds comfort in books during WWII.',
        pages: 552,
        rentalPrice: 180,
        pdfKey: 'the_book_thief.pdf',
        genre: 'fiction',
      },
      {
        title: 'Sapiens: A Brief History of Humankind',
        author: 'Yuval Noah Harari',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780099590088-L.jpg',
        description:
          'A journey through the evolution and impact of Homo sapiens.',
        pages: 443,
        rentalPrice: 250,
        pdfKey: 'sapiens.pdf',
        genre: 'non-fiction',
      },
      {
        title: 'And Then There Were None',
        author: 'Agatha Christie',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780007136834-L.jpg',
        description:
          'Ten strangers trapped on an island start dying one by one.',
        pages: 224,
        rentalPrice: 220,
        pdfKey: 'and_then_there_were_none.pdf',
        genre: 'mystery',
      },
      {
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780141199078-L.jpg',
        description:
          'A timeless romance involving love, class, and society.',
        pages: 279,
        rentalPrice: 200,
        pdfKey: 'pride_and_prejudice.pdf',
        genre: 'romance',
      },
      {
        title: 'The Martian',
        author: 'Andy Weir',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780553418026-L.jpg',
        description:
          'An astronaut stranded on Mars must use ingenuity to survive.',
        pages: 384,
        rentalPrice: 230,
        pdfKey: 'the_martian.pdf',
        genre: 'sci-fi',
      },
      {
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780061122415-L.jpg',
        description:
          'A philosophical journey about following one’s dreams.',
        pages: 136,
        rentalPrice: 190,
        pdfKey: 'the_alchemist.pdf',
        genre: 'fiction',
      },
      {
        title: '1984',
        author: 'George Orwell',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
        description:
          'A dystopian novel about surveillance and totalitarianism.',
        pages: 284,
        rentalPrice: 210,
        pdfKey: '1984.pdf',
        genre: 'fiction',
      },
      {
        title: 'The Subtle Art of Not Giving a F*ck',
        author: 'Mark Manson',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780062457714-L.jpg',
        description:
          'A refreshing guide to prioritizing what truly matters in life.',
        pages: 152,
        rentalPrice: 180,
        pdfKey: 'subtle_art.pdf',
        genre: 'non-fiction',
      },
      {
        title: 'Harry Potter and the Philosopher’s Stone',
        author: 'J.K. Rowling',
        coverImage:
          'https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg',
        description:
          'The magical beginning of the Harry Potter saga.',
        pages: 228,
        rentalPrice: 200,
        pdfKey: 'harry_potter_1.pdf',
        genre: 'fiction',
      },
    ];

    await Book.insertMany(sampleBooks);
    console.log('Database seeded');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
