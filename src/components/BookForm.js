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
    <div>
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={e => setTitle(e.target.value)} />
        </div>
        <div>
          <label>Author Name:</label>
          <input type="text" value={author} onChange={e => setAuthorId(e.target.value)} />
        </div>
        <div>
          <label>Isbn</label>
          <input type="text" value={isbn} onChange={e => setIsbn(e.target.value)} />
        </div>
        <div>
          <label>Publication Year</label>
          <input type="text" value={publication_year} onChange={e => setPublication_year(e.target.value)} />
        </div>
        <div>
          <label>Cover Image:</label>
          <input
            type="file"
            onChange={e => setCoverImage(e.target.files[0])} // Set the cover image
            accept="image/*"
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default BookForm;