import React, { useContext, useEffect, useState } from 'react';
import './ExploreCategories.css';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';

const ExploreCategories = ({ category, setCategory }) => {
  const { url } = useContext(StoreContext);
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${url}/product/list`); 
      const products = response.data.data;
      const uniqueCategories = [
        'All',
        ...new Set(products.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className='explore-categories' id='explore-categories'>
      <h1>Explore Gym Categories</h1>
      <p className='explore-categories-text'>
        Browse our wide range of gym products by category to find exactly what you need for your fitness journey.
      </p>
      <div className='explore-categories-list'>
        {categories.map((item, index) => (
          <div
            onClick={() => setCategory(item)}
            key={index}
            className={`explore-categories-item ${category === item ? 'active' : ''}`}
          >
            <p>{item}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreCategories;