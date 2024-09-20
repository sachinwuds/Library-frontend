import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import AuthorList from './components/AuthorList';
import AuthorForm from './components/AuthorForm';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<Register />} />
        <Route path="/create-book" element={< BookForm/>} />
        <Route path="/update-book" element={<BookForm />} />
        <Route path="/" element={<BookList />}/>
      </Routes>
    </Router>
  );  
}

export default App;