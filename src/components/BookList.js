import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
// import axios from 'axios';
import axiosInstance from '../axiosInstance';
import config from '../config';
import { useAuth } from '../services/AuthContext';

const baseURL = config.baseURL;
function BookList() {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  const { logout } = useAuth();
   

//   useEffect(() => {
//     axiosInstance.get('/books')
//       .then(response => setBooks(response.data))
//       .catch(error => console.error('Error fetching books:', error));
//   }, []);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get('/books');
        setBooks(response.data);
        console.log(response.data)   
      } catch (error) {
        console.error('Error fetching Books:', error);
      }
    };

    fetchBooks();
  }, []);

  

  // Login function to navigate to 'login' page
  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    navigate('/');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-center">Books</h2>
        {isAuthenticated && (
        <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
        )}
        {!isAuthenticated && (
        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
        )}
      </div>
      
      <div className="row">
        {books.map((book) => (
          <div key={book.id} className="col-md-3 mb-4">
            <div className="card h-100">
              {book.cover_image ? (
                <img
                  src={`${baseURL}/${book.cover_image}`}
                  className="card-img-top"
                  alt={book.title}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
              ) : (
                <div className="card-img-top d-flex align-items-center justify-content-center" style={{ height: '200px', backgroundColor: '#f0f0f0' }}>
                  <p>No Image Available</p>
                </div>
              )}
              <div className="card-body text-center">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">{book.author}</p>
                <p><strong>{book.isbn}</strong></p>
                
                
                
                {isAuthenticated && (
              <Link to={`/update-book/${book.id}`}>Update {book.title}</Link>
            )}

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default BookList;