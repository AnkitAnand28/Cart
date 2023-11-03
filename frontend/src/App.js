import { Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";

// Cart
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ProductDetail from "./components/ProductDetail";
import Categories from "./components/Categories";
import CategoryProducts from "./components/CategoryProducts";
import AllProducts from "./components/AllProducts";
import Checkout from "./components/Checkout";
import OrderSuccess from "./components/OrderSuccess";
import OrderFailure from "./components/OrderFailure";
import SearchResults from "./components/SearchResults";

// Customer
import Register from "./components/Customer/Register";
import Login from "./components/Customer/Login";
import DashBoard from "./components/Customer/DashBoard";
import Orders from "./components/Customer/Orders";
import AddressList from "./components/Customer/AddressList";
import CustomerLogout from "./components/Customer/CustomerLogout";
import Profile from "./components/Customer/Profile";

// Seller
import SellerLogin from "./components/Seller/SellerLogin";
import SellerRegister from "./components/Seller/SellerRegister";
import SellerDashBoard from "./components/Seller/SellerDashBoard";
import SellerProducts from "./components/Seller/SellerProducts";
import AddProduct from "./components/Seller/AddProduct";
import VendorOrders from "./components/Seller/VendorOrders";
import VendorChangePassword from "./components/Seller/VendorChangePassword";


import { CartContext } from "./Context";
import { useState } from "react";
const checkCart=localStorage.getItem('cartData');

function App() {
  const [cartData,setCartData]=useState(JSON.parse(checkCart));
  return (
    <CartContext.Provider value={{cartData,setCartData}}>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:category_slug/:category_id' element={<CategoryProducts />} />
        <Route path='/product/:product_slug/:product_id' element={<ProductDetail />} />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='/order/success' element={<OrderSuccess />} />
        <Route path="/search/:searchQuery" element={<SearchResults />} />
        <Route path='/order/failure' element={<OrderFailure />} />
        <Route path='/customer/register' element={<Register />} />
        <Route path='/customer/login/' element={<Login />} />
        <Route path='/customer/logout' element={<CustomerLogout />} />
        <Route path='/customer/dashboard' element={<DashBoard />} />
        <Route path='/customer/orders' element={<Orders />} />
        <Route path='/customer/profile' element={<Profile />} />
        <Route path='/customer/addresses' element={<AddressList />} />
        <Route path='/seller/register' element={<SellerRegister />} />
        <Route path='/seller/login' element={<SellerLogin/>} />
        <Route path='/seller/dashboard' element={<SellerDashBoard />} />
        <Route path='/seller/products' element={<SellerProducts />} />
        <Route path='/seller/add-product' element={<AddProduct />} />
        <Route path='/seller/orders' element={<VendorOrders />} />
        <Route path='/seller/change-password' element={<VendorChangePassword/>} />
        
        
      </Routes>

      <Footer />
    </CartContext.Provider>
  );
}

export default App;
