import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // For extracting book ID and navigating
import axiosInstance from '../axiosInstance';
const UpdateBookForm = () => {
  const { bookId } = useParams();  // Extract book ID from the URL
  const navigate = useNavigate();  // To redirect after update
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publication_year, setPublicationYear] = useState('');
  const [cover_image, setCoverImage] = useState(null);

  // Fetch the book data when the component mounts
  useEffect(() => {
    axiosInstance.get(`/books/${bookId}`)  // Replace with your API endpoint
      .then((response) => {
        const book = response.data;
        setTitle(book.title);
        setAuthor(book.author);
        setIsbn(book.isbn);
        setPublicationYear(book.publication_year);
      })
      .catch((error) => {
        console.error("There was an error fetching the book!", error);
      });
  }, [bookId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
        title,
        author,
        isbn,
        publication_year,
        cover_image
      };
    
   
    // Send the updated book details to the API
    axiosInstance.put(`/books/${bookId}`, data)  // Replace with your API endpoint
      .then((response) => {
        console.log('Book updated successfully:', response.data);
        navigate('/');  // Redirect to books listing or another page
      })
      .catch((error) => {
        console.error('There was an error updating the book!', error);
      });
  };

  

  return (
    <div className="container mt-4">
      <h2>Update Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Title Field */}
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Author Field */}
        <div className="mb-3">
          <label className="form-label">Author Name:</label>
          <input
            type="text"
            className="form-control"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>

        {/* ISBN Field */}
        <div className="mb-3">
          <label className="form-label">ISBN:</label>
          <input
            type="text"
            className="form-control"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            required
          />
        </div>

        {/* Publication Year Field */}
        <div className="mb-3">
          <label className="form-label">Publication Year:</label>
          <input
            type="text"
            className="form-control"
            value={publication_year}
            onChange={(e) => setPublicationYear(e.target.value)}
            required
          />
        </div>

        {/* Cover Image Field */}
        <div className="mb-3">
          <label className="form-label">Cover Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setCoverImage(e.target.files[0])}  // Handle file upload
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Update Book
        </button>
      </form>
    </div>
  );
};

export default UpdateBookForm;
