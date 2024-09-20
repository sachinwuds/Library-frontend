import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import axiosInstance from '../axiosInstance';
import config from '../config';
const baseURL = config.baseURL;
function BookList() {
  const [books, setBooks] = useState([]);

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

  return (
    <div>
        <h2>books</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {books.map((books) => (
          <div key={books.id} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px', margin: '16px', width: '200px', textAlign: 'center' }}>
            <h3>{books.title}</h3>
            <p>{books.author}</p>
            <p><strong>${books.isbn}</strong></p>
            {books.cover_image ? (
              <img
                src={`${baseURL}/${books.cover_image}`} // Ensure correct image path
                alt={books.title}
                style={{ width: '100px', height: '100px' }}
              />
            ) : (
              <p>No Image Available</p>
            )}
          </div>
        ))}
         </div>
    </div>
  );
}

export default BookList;