const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// GET all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST a new book
router.post('/', async (req, res) => {
  const { title, author, genre, year, coverUrl } = req.body;
  try {
    const newBook = new Book({ title, author, genre, year, coverUrl });
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT update a book by ID
router.put('/:id', async (req, res) => {
  const { title, author, genre, year, coverUrl } = req.body;
  const { id } = req.params;
  try {
    const updatedBook = await Book.findByIdAndUpdate(id, { title, author, genre, year, coverUrl }, { new: true });
    if (!updatedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE a book by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;