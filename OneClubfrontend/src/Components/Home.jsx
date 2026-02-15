import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../Contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

const Home = () => {
  const [products, setProducts] = useState([]);
  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((res) => setProducts(res.data || []))
      .catch(() => setProducts([]));
  }, []);

  const getQty = (id) =>
    cartItems.find((item) => item.id === id)?.qty || 0;

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success(`added to cart 🛒`);
  };

  const handleIncrease = (product) => {
    increaseQty(product.id);
    toast.info(`Increased quantity of ${product.name}`);
  };

  const handleDecrease = (product) => {
    decreaseQty(product.id);
    toast.warn(`Decreased quantity of ${product.name}`);
  };

  return (
    <div className="p-6 min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/products/${product.id}`)}
            className="border rounded p-4 flex flex-col gap-3 cursor-pointer hover:shadow-lg transition"
          >
            <img
              src={product.ImageUrl || "https://via.placeholder.com/200"}
              alt={product.name}
              className="h-40 object-cover rounded"
            />

            <h2 className="font-bold">{product.name}</h2>
            <p>₹ {product.price}</p>

            {/* CART ACTIONS */}
            {getQty(product.id) === 0 ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="bg-blue-600 text-white py-2 rounded"
              >
                Add to Cart
              </button>
            ) : (
              <div
                className="flex justify-between items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => handleDecrease(product)}
                  className="px-3 py-1 border rounded"
                >
                  −
                </button>

                <span className="font-bold">
                  {getQty(product.id)}
                </span>

                <button
                  onClick={() => handleIncrease(product)}
                  className="px-3 py-1 border rounded"
                >
                  +
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;