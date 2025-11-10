import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductDetails = () => {
  const { id } = useParams(); // matches with :id in Route
  const [product, setProduct] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProduct(response.data);
      } catch (error) {
        toast.error('Failed to load product details');
        console.error('❌ Product fetch error:', error.response?.data || error.message);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <img
          src={product.image || 'https://via.placeholder.com/300'}
          alt={product.title}
          className="w-full max-h-[400px] object-contain rounded"
        />
      </div>

      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-700 text-lg">{product.description}</p>
        <p className="text-xl font-semibold text-blue-600">₹ {product.price}</p>
        <div className="text-yellow-500 text-lg">
          Rating: {product.rating || 3.5} ★
        </div>

        <button className="bg-black text-white px-6 py-2 mt-4 rounded hover:bg-gray-800">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
