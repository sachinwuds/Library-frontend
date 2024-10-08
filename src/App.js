import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import UpdateBookForm from './components/UpdatebookForm';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from './services/PrivateRoute';
import { AuthProvider } from './services/AuthContext';

function App() {

  

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<BookList />}/>
        <Route path="/create-book" element={<PrivateRoute>
              <BookForm />
            </PrivateRoute>
          } />
        <Route path="/update-book/:bookId" element={<PrivateRoute>
              <UpdateBookForm />
            </PrivateRoute>
          } />

        
      </Routes>
    </Router>
    </AuthProvider>
  );  
}

export default App;