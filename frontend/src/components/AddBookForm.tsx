import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const AddBookForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState<number | string>('');
  const [coverUrl, setCoverUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBook = { title, author, genre, year: Number(year), coverUrl };

    try {
      const response = await fetch('http://localhost:5000/api/books', { // Update URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBook),
      });
      if (!response.ok) {
        throw new Error('Failed to add book');
      }
      navigate('/');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Container>
      <h1>Add a New Book</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="genre">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="year">
          <Form.Label>Year</Form.Label>
          <Form.Control
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="coverUrl">
          <Form.Label>Cover URL</Form.Label>
          <Form.Control
            type="text"
            value={coverUrl}
            onChange={(e) => setCoverUrl(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Book
        </Button>
      </Form>
    </Container>
  );
};

export default AddBookForm;