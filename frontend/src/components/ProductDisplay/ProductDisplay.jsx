import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import { StoreContext } from '../../Context/StoreContext';
import ProductItem from '../ProductItem/ProductItem';

const ProductDisplay = ({ category }) => {
  const { product_list } = useContext(StoreContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (category === 'All') {
      setFilteredProducts(product_list);
    } else {
      setFilteredProducts(product_list.filter((item) => item.category === category));
    }
  }, [category, product_list]);

  return (
    <div className='product-display' id='product-display'>
      <h2>Top Gym Products for You</h2>
      <div className='product-display-list'>
        {filteredProducts.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
            price={item.price}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductDisplay;