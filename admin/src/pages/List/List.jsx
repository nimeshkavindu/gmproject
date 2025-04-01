// admin/src/pages/List/List.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { url } from '../../assets/assets';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/product/list`, {
      headers: { token: localStorage.getItem('adminToken') },
    });
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Error fetching products');
    }
  };

  const removeProduct = async (productId) => {
    const response = await axios.post(
      `${url}/product/remove`,
      { id: productId },
      { headers: { token: localStorage.getItem('adminToken') } }
    );
    if (response.data.success) {
      await fetchList();
      toast.success('Product removed');
    } else {
      toast.error('Error removing product');
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Products List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => (
          <div key={item.id} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt='' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}</p>
            <p onClick={() => removeProduct(item.id)} className='cursor'>
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;