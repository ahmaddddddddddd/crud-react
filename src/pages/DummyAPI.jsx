import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DummyAPI = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Ganti nilai ini sesuai dengan jumlah item yang ingin ditampilkan per halaman

  const fetchData = async () => {
    const response = await axios.get('http://192.168.18.210:4012/api/user');
    setProduct(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlerDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.18.210:4012/api/user/${id}`);
      fetchData();
    } catch (error) {
      console.log('Error something wrong');
    }
  };

  // Ambil data item yang sesuai dengan halaman yang aktif
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = product.slice(indexOfFirstItem, indexOfLastItem);

  // Fungsi untuk mengganti halaman yang aktif
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container m-5">

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name</th>
              <th scope="col">address</th>
              <th scope="col">action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.address}</td>
                <td>    
                  <Link to={`/create/${item.id}`} className="btn btn-primary me-3">
                    Edit
                  </Link>
                  <button onClick={() => handlerDelete(item.id)} className="btn btn-danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Tampilkan tombol pagination */}
        <div className="pagination">
          {Array.from({ length: Math.ceil(product.length / itemsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
            
          ))}
             <div style={{ marginLeft: 'auto' }}>
            <Link to={`/create`} className="btn btn-success ms-3">Add</Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DummyAPI;