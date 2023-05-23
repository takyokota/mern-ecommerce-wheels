import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ProductsContextProvider } from "./context/ProductsContext";
import Home from "./routes/Home";
import UpdatePage from "./routes/AdminUpdatePage";
import AdminPage from "./routes/AdminPage";
import AddPage from "./routes/AdminAddPage";
import ProductDetailPage from "./routes/ProductDetailPage";
import ProductPage from "./routes/ProductPage";
import LoginPage from "./routes/LoginPage";
import { AuthContextProvider } from "./context/AuthContext";
import CartPage from "./routes/CartPage";
import { CartContextProvider } from "./context/CartContext";
import AdminProductPage from "./routes/AdminProductPage";
import SignupPage from "./routes/SignupPage";

const App = () => {
  return (
    <AuthContextProvider>
      <ProductsContextProvider>
        <CartContextProvider>
          <div className="container">
            <Router>
              <Routes>
                <Route exact path="/admin/products/add" element={<AddPage />} />
                <Route exact path="/admin/products/update/:id" element={<UpdatePage />} />
                <Route exact path="/admin/products" element={<AdminProductPage />} />
                <Route exact path="/admin" element={<AdminPage />} />
                <Route exact path="/cart" element={<CartPage />} />
                <Route exact path="/signup" element={<SignupPage />} />
                <Route exact path="/login" element={<LoginPage />} />
                <Route exact path="/products/:id" element={<ProductDetailPage />} />
                <Route exact path="/products" element={<ProductPage />} />
                <Route exact path="/" element={<Home />} />
              </Routes>
            </Router>
          </div>
        </CartContextProvider>
      </ProductsContextProvider>
    </AuthContextProvider>
  );
};

export default App;
