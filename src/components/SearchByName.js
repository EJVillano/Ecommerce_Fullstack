import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchByName = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      fetch(`${process.env.REACT_APP_API_URL}/products/searchByName`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productName: searchTerm }),
      })
        .then((res) => res.json())
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => console.error('Error searching products:', error));
    }
  };

  return (
    <Container className='container-fluid'>
      <div className='row d-flex justify-content-center'>
        
      <Form.Group className='col-9 m-3'>
        <Form.Control
          type="text"
          placeholder="Enter product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>
      <Link className="btn btn-dark col-1 my-auto" variant="dark" onClick={handleSearch}>SEARCH</Link>
      </div>
      <hr />
      <h4>Search Results:</h4>
      {searchResults.length > 0 ? (
        <ul>
          {searchResults.map((product) => (
            <li key={product._id}>
              <Link to={`/products/${product._id}`}>{product.name}</Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found.</p>
      )}
    </Container>
  );
};

export default SearchByName;