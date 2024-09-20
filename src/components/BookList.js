import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
// import axios from 'axios';
import axiosInstance from '../axiosInstance';
import config from '../config';
import { useAuth } from '../services/AuthContext';

const baseURL = config.baseURL;
function BookList() {
  const [books, setBooks] = useState([]);
  const [alertMessage, setAlertMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State to control alert visibility
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); 
  const { logout } = useAuth();
   

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

 const DeleteBook = async (id) =>{
    try {
        const response = await axiosInstance.delete(`/books/${id}`);
        setBooks(books.filter(book => book.id !== id)); 
        console.log(response.data) ;
         // Show success alert
        setAlertMessage('Book successfully deleted!');
        setShowAlert(true); // Trigger the fade-in animation
        // Hide alert after 3 seconds
        setTimeout(() => {
            setShowAlert(false); // Trigger the fade-out animation
        }, 3000); 
        // Remove the message completely after the fade-out
        setTimeout(() => {
            setAlertMessage(null);
        }, 3500);

      } catch (error) {
        console.error('Error delete Book:', error);
      }
 };

 return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">My Bookstore</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">Books</Link>
              </li>
            </ul>
            
            {isAuthenticated ? (
              <button className="btn btn-outline-primary" onClick={handleLogout}>Logout</button>
            ) : (
              <button className="btn btn-outline-primary" onClick={handleLogin}>Login</button>
            )}
          </div>
        </div>
      </nav>


    {/* Bootstrap Alert with Fade In/Out Effect */}
    {alertMessage && (
        <div
          className={`alert alert-success alert-dismissible fade ${showAlert ? 'show' : ''} position-fixed top-0 start-50 translate-middle-x mt-3`}
          role="alert"
          style={{
            zIndex: 1050,
            transition: 'opacity 0.8s ease-in-out, visibility 0.8s ease-in-out',
            opacity: showAlert ? 1 : 0, // Set opacity for fade effect
            visibility: showAlert ? 'visible' : 'hidden', // Control visibility when fading out
          }}
        >
          {alertMessage}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      {/* Book List */}
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="text-center">Books</h2>
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

          {/* Update and Delete Links */}
          {isAuthenticated && (
            <div className="d-flex justify-content-center">
              <Link 
                to={`/update-book/${book.id}`} 
                className="btn btn-warning btn-sm me-2 d-flex align-items-center"
              >
                <i className="bi bi-pencil me-1"></i> Update
              </Link>
              <button 
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                    DeleteBook(book.id);
                  }
                }} 
                className="btn btn-danger btn-sm d-flex align-items-center"
              >
                <i className="bi bi-trash me-1"></i> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};


export default BookList;