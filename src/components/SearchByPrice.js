import React, { useState, useEffect } from 'react';

export default function SearchByPriceRange() {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/products/searchByPrice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ minPrice, maxPrice })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      setSearchResults(data);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container">
      <h2>Search Products by Price Range</h2>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <label htmlFor="minPrice" className="form-label">Min Price</label>
          <input
            type="number"
            className="form-control"
            id="minPrice"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maxPrice" className="form-label">Max Price</label>
          <input
            type="number"
            className="form-control"
            id="maxPrice"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <div>
        <h4>Search Results:</h4>
        {searchResults.map((product) => (
          <div key={product.name} className="ml-5">
            <ul>
              <li>
                <p>{product.name}</p>
              </li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};


