import React from 'react';
import { Container } from 'react-bootstrap';

const NotFound: React.FC = () => {
  return (
    <Container className="py-4">
      <h1>404 - Not Found</h1>
      <p>The page you're looking for does not exist.</p>
    </Container>
  );
};

export default NotFound;