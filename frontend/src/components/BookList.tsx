import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookComponent from './Book'; 
import { Book } from '../types';

interface BookListProps {
  books: Book[];
  onDelete: (id: string) => void;
}

const BookList: React.FC<BookListProps> = ({ books, onDelete }) => {
  return (
    <Container>
      <h1>Book List</h1>
      <Row>
        {books.map((book) => (
          <Col key={book._id} sm={6} md={4} lg={3} className="mb-3">
            <BookComponent book={book} onDelete={onDelete} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;
