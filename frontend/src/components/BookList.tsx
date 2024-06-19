import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import BookComponent from './Book'; // Adjust the import if necessary
import { Book as BookType } from '../types'; // Adjust the path if necessary

interface BookListProps {
  books: BookType[];
}

const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
    <Container>
      <h1>Book List</h1>
      <Row>
        {books.map((book) => (
          <Col key={book._id} sm={6} md={4} lg={3} className="mb-3">
            <BookComponent book={book} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BookList;