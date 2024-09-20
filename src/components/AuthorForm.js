import React, { useState } from 'react';
import axios from 'axios';

function AuthorForm() {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/authors', { name })
      .then(response => {
        console.log('Author added:', response.data);
        setName('');
      })
      .catch(error => console.error('Error adding author:', error));
  };

  return (
    <div>
      <h2>Add Author</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <button type="submit">Add Author</button>
      </form>
    </div>
  );
}

export default AuthorForm;