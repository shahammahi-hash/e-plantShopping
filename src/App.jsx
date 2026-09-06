import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductList from "./components/ProductList";
import CartItem from "./components/CartItem";
import AboutUs from "./components/AboutUs";
import "./App.css";

function Home() {
  const [showProducts, setShowProducts] = useState(false);

  if (showProducts) {
    return <ProductList />;
  }

  return (
    <div className="home background-image">
      <h1>Welcome to Paradise Nursery</h1>

      <p>Bring nature into your home.</p>

      <button
        className="get-started"
        onClick={() => setShowProducts(true)}
      >
        Get Started
      </button>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;