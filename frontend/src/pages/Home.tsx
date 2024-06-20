import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookList from '../components/BookList';
import Filters from '../components/Filters';
import SearchForm from '../components/SearchForm';
import { Book as BookType } from '../types';

const Home: React.FC = () => {
  const [books, setBooks] = useState<BookType[]>([]); // State for books list
  const [filteredBooks, setFilteredBooks] = useState<BookType[]>([]); // State for filtered books
  const [genres, setGenres] = useState<string[]>([]); // State for unique genres

  // Fetch books and set unique genres on component mount
  useEffect(() => {
    fetchBooks();
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [books]);

  // Fetch books from API
  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books'); // Update URL
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data); // Initialize filteredBooks with all books
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch unique genres from books data
  const fetchGenres = () => {
    const uniqueGenres = Array.from(new Set(books.map((book) => book.genre)));
    setGenres(uniqueGenres);
  };

  // Filter books based on genre, author, and publication year
  const applyFilters = ({ genre, author, year }: { genre: string; author: string; year: number | undefined }) => {
    let filteredResults = [...books];

    if (genre) {
      filteredResults = filteredResults.filter((book) => book.genre === genre);
    }
    if (author) {
      const normalizedAuthor = author.toLowerCase().trim();
      filteredResults = filteredResults.filter((book) =>
        book.author.toLowerCase().includes(normalizedAuthor)
      );
    }
    if (year) {
      filteredResults = filteredResults.filter((book) => book.year === year);
    }

    setFilteredBooks(filteredResults);
  };

  // Handle search logic
  const handleSearch = (query: string) => {
    const normalizedQuery = query.toLowerCase().trim();
    if (normalizedQuery === '') {
      setFilteredBooks([...books]);
    } else {
      const searchResults = books.filter(
        (book) =>
          book.title.toLowerCase().includes(normalizedQuery) ||
          book.author.toLowerCase().includes(normalizedQuery) ||
          book.genre.toLowerCase().includes(normalizedQuery)
      );
      setFilteredBooks(searchResults);
    }
  };

  // Handle book deletion
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, { // Update URL
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
      setBooks(books.filter((book) => book._id !== id));
      setFilteredBooks(filteredBooks.filter((book) => book._id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={3}>
          <Filters genres={genres} onApplyFilters={applyFilters} />
        </Col>
        <Col md={9}>
          <SearchForm onSearch={handleSearch} />
          <BookList books={filteredBooks} onDelete={handleDelete} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;