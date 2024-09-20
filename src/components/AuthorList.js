import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios.get('/api/authors')
      .then(response => setAuthors(response.data))
      .catch(error => console.error('Error fetching authors:', error));
  }, []);

  return (
    <div>
      <h2>Authors</h2>
      <ul>
        {authors.map(author => (
          <li key={author.id}>{author.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default AuthorList;