// admin/src/pages/Orders/Orders.jsx
import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/order/list`, {
      headers: { token: localStorage.getItem('adminToken') },
    });
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(
      `${url}/order/status`,
      {
        orderId,
        status: event.target.value,
      },
      { headers: { token: localStorage.getItem('adminToken') } }
    );
    if (response.data.success) {
      await fetchAllOrders();
      toast.success('Order status updated');
    } else {
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Gym Orders Page</h3>
      <div className='order-list'>
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt='' />
            <div>
              <p className='order-item-products'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return `${item.name} x ${item.quantity}`;
                  } else {
                    return `${item.name} x ${item.quantity}, `;
                  }
                })}
              </p>
              <p className='order-item-name'>
                {order.address.firstName + ' ' + order.address.lastName}
              </p>
              <div className='order-item-address'>
                <p>{order.address.street + ','}</p>
                <p>
                  {order.address.city +
                    ', ' +
                    order.address.state +
                    ', ' +
                    order.address.country +
                    ', ' +
                    order.address.zipcode}
                </p>
              </div>
              <p className='order-item-phone'>{order.address.phone}</p>
            </div>
            <p>Items: {order.items.length}</p>
            <p>
              {currency}
              {order.amount}
            </p>
            <select
              onChange={(e) => statusHandler(e, order.id)} 
              value={order.status}
            >
              <option value='Processing'>Processing</option>
              <option value='Shipped'>Shipped</option>
              <option value='Delivered'>Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;