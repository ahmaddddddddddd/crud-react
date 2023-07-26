import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
  const [nameProduct, setProduct] = useState('');
  const [price, setPrice] = useState(0);
  const [expired, setExpired] = useState('');
  const [userId, setUserId] = useState('');
  const [dropdown, setDropdown] = useState([]);

  const navigate = useNavigate();

  const { id } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://192.168.18.210:4012/api/product/${id}`);
      const data = response.data;
      setProduct(data.nameProduct);
      setPrice(data.price);
      setExpired(data.expired);
      setUserId(data.userId);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  const getDropdown = async () => {
    try {
      const response = await axios.get('http://192.168.18.210:4012/api/user/');
      setDropdown(response.data);
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    getDropdown();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://192.168.18.210:4012/api/product/${id}`, {
        nameProduct: nameProduct,
        price: parseInt(price),
        expired: expired,
        userId: userId,
      });
      navigate('/product'); // Use "navigate" instead of "Navigate"
    } catch (error) {
      // Handle error here
      console.error(error);
    }
  };

  return (
    <div>
      <form className='row g-3 m-5' onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label htmlFor="nameProduct">Name</label>
          <input type="text" id="nameProduct" className="form-control" value={nameProduct} onChange={(e) => setProduct(e.target.value)} placeholder='Your Name' />
        </div>
        <div className="col-6">
          <label htmlFor="price">Price</label>
          <input type="text" id="price" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
        </div>
        <div className="col-md-6">
          <label htmlFor="expired">Expired</label>
          <input type="text" id="expired" className="form-control" value={expired} onChange={(e) => setExpired(e.target.value)} placeholder='Expired' />
        </div>
        <div className="col-md-6">
          <label htmlFor="userId">User ID</label>
          <select id="userId" className="form-control" value={userId} onChange={(e) => setUserId(e.target.value)} placeholder='User ID'>
            {dropdown.map((item, index) => (
              <option value={item.id} key={index}>{item.name}</option>
            ))}
          </select>
        </div>
        <div className="col-12">
          <button className="btn btn-primary" type="submit">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
