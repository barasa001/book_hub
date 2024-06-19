// src/components/Book.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Book as BookType } from '../types';

interface Props {
  book: BookType;
  onDelete: (id: string) => void;
}

const Book: React.FC<Props> = ({ book, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    onDelete(book._id);
  };

  return (
    <Card>
      <Card.Img variant="top" src={book.coverUrl} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          <strong>Author:</strong> {book.author}
          <br />
          <strong>Genre:</strong> {book.genre}
          <br />
          <strong>Year:</strong> {book.year}
        </Card.Text>
        <Button variant="primary" onClick={() => navigate(`/edit-book/${book._id}`)}>Edit</Button>
        <Button variant="danger" onClick={handleDelete}>Delete</Button>
      </Card.Body>
    </Card>
  );
};

export default Book;