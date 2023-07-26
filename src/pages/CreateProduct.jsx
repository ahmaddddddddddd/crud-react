import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [nameProduct, setNameProduct] = useState('');
    const [price, setPrice] = useState(0);
    const [expired, setExpired] = useState('');
    const [userId, setUserId] = useState('');
    const [Dropdown, setDropdown] = useState([]);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            console.log(nameProduct)
            await axios.post('http://192.168.18.210:4012/api/product', {
                nameProduct: nameProduct,
                price: parseInt(price),
                expired: expired,
                userId: userId
            });
            navigate('/dummyProduct');
        } catch (error) {
            // Handle any errors that occur during the API call
            console.error('Error submitting form:', error);
        }
    };

    const getDropDown = async () => {
        const response = await axios.get(`http://192.168.18.210:4012/api/user/`)
        console.log(response.data)
        setDropdown(response.data)
    }

    useEffect(() => {
        getDropDown()
    }, [])

    return (
        <div className='m-5'>
            <form className="row g-3" onSubmit={handleSubmit}>
                <div className="col-md-6">
                    <label htmlFor="inputNama" className="form-label">
                        Nama Product
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={nameProduct}
                        onChange={(e) => setNameProduct(e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">
                        Price
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <label htmlFor="inputAddress" className="form-label">
                        Expired
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        value={expired}
                        onChange={(e) => setExpired(e.target.value)}
                    />
                </div>
                <div className="col-6">
                    <select className='form-control'
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    >
                        {Dropdown.map((item, index) => (
                            <option value={item.id} key={index}>{item.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <Link to={`/dummyProduct/`} className="btn btn-danger">Back</Link>
                </div>
            </form>
        </div>
    );
};

export default CreateProduct;