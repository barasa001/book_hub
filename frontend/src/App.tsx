import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import AppNavbar from './components/Navbar';
import Home from './pages/Home';
import AddBook from './pages/AddBook'; // Update import
import EditBookForm from './components/EditBookForm';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <AppNavbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-book" element={<AddBook />} /> {/* Update path */}
          <Route path="/edit-book/:id" element={<EditBookForm />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </Router>
  );
};

export default App;