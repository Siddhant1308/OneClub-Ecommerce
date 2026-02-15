import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import toast from "react-hot-toast";

const Page = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { cartItems, addToCart, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const qty =
    cartItems.find((item) => item.id === product?.id)?.qty || 0;

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart 🛒");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-xl font-bold">Loading...</h1>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-[70vh]">
        <h1 className="text-xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Image */}
        <img
          src={product.ImageUrl || "https://via.placeholder.com/400"}
          alt={product.name}
          className="w-full h-80 object-cover rounded border"
        />

        {/* Details */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-gray-800">
            ₹ {product.price}
          </p>

          <p className="text-gray-600">
            {product.description || "No description available."}
          </p>

          {/* CART ACTION */}
          {qty === 0 ? (
            <button
              onClick={handleAddToCart}
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center gap-6 mt-4">
              <button
                onClick={() => decreaseQty(product.id)}
                className="px-4 py-2 border rounded text-xl"
              >
                −
              </button>

              <span className="text-xl font-bold">{qty}</span>

              <button
                onClick={() => increaseQty(product.id)}
                className="px-4 py-2 border rounded text-xl"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;