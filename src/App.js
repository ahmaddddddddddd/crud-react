import React from "react";
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import HomePage  from "./pages/HomePage";
import DashBoard from "./pages/DashBoard";
import 'bootstrap/dist/css/bootstrap.min.css';
import DummyAPI from "./pages/DummyAPI";
import Create from "./pages/Create";
import EditFrom from "./pages/EditForm";
import ProductApi from "./pages/ProductApi"
import EditProduct from "./pages/EditProduct";
import CreateProduct from "./pages/CreateProduct"

function App() {
  return (
    <>
    
    <BrowserRouter>
    
    
    <Routes>
    <Route path={'/homepage'} element={<HomePage/>}></Route>
    <Route path={'/dashboard'} element={<DashBoard/>}></Route>
    <Route path={'/dummyApi'} element={<DummyAPI/>}></Route>
    <Route path={'/create'} element={<Create/>}></Route>
    <Route path={'/editform/:id'} element={<EditFrom/>}></Route>
    <Route path={'/product'} element={<ProductApi/>}></Route>
    <Route path={'/editproduct/:id'} element={<EditProduct/>}></Route>
    <Route path={'/createproduk'} element={<CreateProduct/>}></Route>
     
    </Routes>
    
    
    </BrowserRouter>
    
    </>
  );
}

export default App;
