import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductApi = () => {
  const [product, setProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Ganti nilai ini sesuai dengan jumlah item yang ingin ditampilkan per halaman

  const fetchData = async () => {
    const response = await axios.get('http://192.168.18.210:4012/api/product/');
    setProduct(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlerDelete = async (id) => {
    try {
      await axios.delete(`http://192.168.18.210:4012/api/product/${id}`);
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
      <Link to={`/createproduk`} className="btn btn-success me-3">
                    add
     </Link>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">name produtch</th>  
              <th scope="col">price</th>
              <th scope="col">expired</th>
              <th scope="col">userId</th>
              <th scope="col">create at</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nameProduct}</td>
                <td>{item.price}</td>
                <td>{item.expired}</td>
                <td>{item.userId}</td>
                <td>{item.createdAt}</td>
                <td>
                  <Link to={`/editproduct/${item.id}`} className="btn btn-primary me-3">
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
        </div>
      </div>
    </div>
  );
};

export default ProductApi;