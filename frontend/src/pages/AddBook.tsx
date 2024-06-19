import React from 'react';
import { Container } from 'react-bootstrap';
import AddBookForm from '../components/AddBookForm';

const AddBook: React.FC = () => {
  return (
    <Container className="py-4">
      <AddBookForm />
    </Container>
  );
};

export default AddBook;