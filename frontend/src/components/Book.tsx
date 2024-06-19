import React from 'react';
import { Card } from 'react-bootstrap';
import { Book } from '../types'; // Adjust the path if necessary

interface Props {
  book: Book;
}

const BookComponent: React.FC<Props> = ({ book }) => {
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
      </Card.Body>
    </Card>
  );
};

export default BookComponent;