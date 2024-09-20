import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

function BookForm() {
  const [title, setTitle] = useState('');
  const [author, setAuthorId] = useState('');
  const [isbn, setIsbn] = useState('');
  const [publication_year, setPublication_year] = useState('');
  const [cover_image, setCoverImage] = useState(null); 

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance.post('/books', { title, author, isbn, publication_year ,cover_image})
      .then(response => {
        console.log('Book added:', response.data);
        alert('User created successfully');
        setIsbn("");
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div className="container mt-4">
      <h2>Add Book</h2>
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
            onChange={(e) => setAuthorId(e.target.value)}
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
            onChange={(e) => setPublication_year(e.target.value)}
            required
          />
        </div>

        {/* Cover Image Field */}
        <div className="mb-3">
          <label className="form-label">Cover Image:</label>
          <input
            type="file"
            className="form-control"
            onChange={(e) => setCoverImage(e.target.files[0])} // Set the cover image
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">
          Add Book
        </button>
      </form>
    </div>
  );
};


export default BookForm;