import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import SingleProduct from "./SingleProduct";

function SearchResults(props) {
  const [searchResults, setSearchResults] = useState([]);
  const [minPrice, setMinPrice] = useState(""); 
  const [maxPrice, setMaxPrice] = useState(""); 
  const { searchQuery } = useParams();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/productsearch/?search=${searchQuery}`)
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error("Error searching for products:", error);
      });
  }, [searchQuery]);

  const handleFilter = () => {
    
    const filteredResults = searchResults.filter((product) => {
      const price = parseFloat(product.price);
      if (!isNaN(price)) {
        if ((minPrice === "" || price >= parseFloat(minPrice)) &&
            (maxPrice === "" || price <= parseFloat(maxPrice))) {
          return true;
        }
      }
      return false;
    });
    setSearchResults(filteredResults);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Search Results for: {searchQuery}</h3>
      <div className="row mb-4">
        <div className="mb-1">
          <label>Min Price:</label>
          <input
            type="text"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </div>
        <div className="mb-2">
          <label>Max Price:</label>
          <input
            type="text"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <div className="mb-3"><button className="btn btn-secondary" onClick={handleFilter}>Get Products</button></div>
        {
          searchResults.map((product) => <SingleProduct product={product} />)
        }
      </div>
      
    </div>
  );
}

export default SearchResults;

