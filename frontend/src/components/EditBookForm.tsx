import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button, Container } from 'react-bootstrap';

const EditBookForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState<number | string>('');
  const [coverUrl, setCoverUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`); // Update URL
      if (!response.ok) {
        throw new Error('Failed to fetch book');
      }
      const data = await response.json();
      setTitle(data.title);
      setAuthor(data.author);
      setGenre(data.genre);
      setYear(data.year);
      setCoverUrl(data.coverUrl);
    } catch (error) {
      console.error('Error fetching book:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBook = { title, author, genre, year: Number(year), coverUrl };

    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBook),
      });
      if (!response.ok) {
        throw new Error('Failed to update book');
      }
      navigate('/');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <Container>
      <h1>Edit Book</h1>
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
          Update Book
        </Button>
      </Form>
    </Container>
  );
};

export default EditBookForm;