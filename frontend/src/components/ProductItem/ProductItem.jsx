import React, { useContext } from 'react';
import './ProductItem.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const ProductItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='product-item'>
      <div className='product-item-img-container'>
        <img
          className='product-item-image'
          src={`${url}/images/${image}`}
          alt=''
          onClick={() => navigate(`/product/${id}`)}
        />
        {!cartItems[id] ? (
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt=''
          />
        ) : (
          <div className='product-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt=''
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt=''
            />
          </div>
        )}
      </div>
      <div className='product-item-info'>
        <div className='product-item-name-rating'>
          <p>{name}</p>
        </div>
        <p className='product-item-desc'>{description}</p>
        <p className='product-item-price'>${price}</p>
      </div>
    </div>
  );
};

export default ProductItem;