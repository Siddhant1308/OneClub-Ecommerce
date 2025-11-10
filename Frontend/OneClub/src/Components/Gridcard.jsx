import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import QuantityCounter from '../Components/QuantityCounter'; // ✅ import here

const Gridcard = ({ product, isInitiallyFavorite = false, onRemove }) => {
  const [isFavorite, setIsFavorite] = useState(isInitiallyFavorite);
  const [count, setCount] = useState(0);
  const [cartItemId, setCartItemId] = useState(null);
  const rating = product.rating || 3.5;

  useEffect(() => {
    if (!isInitiallyFavorite) {
      const fetchFavIds = async () => {
        try {
          const token = localStorage.getItem('token');
          if (!token) return;
          const { data } = await axios.get('http://localhost:9000/products/fav/ids', {
            headers: { Authorization: `Bearer ${token}` }
          });
          setIsFavorite(data.includes(product.id));
        } catch (err) {
          console.error('Fetch fav ids error:', err);
        }
      };
      fetchFavIds();
    }
  }, [product.id, isInitiallyFavorite]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const { data } = await axios.get('http://localhost:9000/cart', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const item = data.find(i => i.prodId === product.id);
        if (item) {
          setCount(item.quantity);
          setCartItemId(item.id);
        } else {
          setCount(0);
          setCartItemId(null);
        }
      } catch (err) {
        console.error('Fetch cart error:', err);
        toast.error('Could not load cart data');
      }
    };
    fetchCart();
  }, [product.id]);

  const toggleFavorite = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await axios.put(`http://localhost:9000/products/fav/${product.id}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const updated = !isFavorite;
      setIsFavorite(updated);
      toast.success(updated ? 'Added to favorites' : 'Removed from favorites');
      if (!updated && onRemove) onRemove(product.id);
    } catch (err) {
      console.error('Toggle favorite error:', err);
      toast.error('Failed to update favorites');
    }
  };

  const addToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const { data } = await axios.post('http://localhost:9000/cart/add', {
        prodId: product.id,
        quantity: 1
      }, { headers: { Authorization: `Bearer ${token}` } });
      setCount(1);
      setCartItemId(data.id);
      toast.success('Added to cart');
    } catch (err) {
      console.error('Add to cart error:', err);
      toast.error('Failed to add to cart');
    }
  };

  const increaseQuantity = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const { data } = await axios.patch(`http://localhost:9000/cart/increase/${cartItemId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCount(data.quantity);
    } catch (err) {
      console.error('Increase quantity error:', err);
      toast.error('Failed to increase quantity');
    }
  };

  const decreaseQuantity = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      const { data } = await axios.patch(`http://localhost:9000/cart/decrease/${cartItemId}`, null, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!data) {
        setCount(0);
        setCartItemId(null);
      } else {
        setCount(data.quantity);
      }
    } catch (err) {
      console.error('Decrease quantity error:', err);
      toast.error('Failed to decrease quantity');
    }
  };

  const handleBuyNow = () => {
    toast.info('Buy Now clicked!');
    // Ideally: navigate to checkout page with product info
  };

  return (
    <div className="bg-white rounded overflow-hidden shadow hover:-translate-y-1 hover:shadow-md transition cursor-pointer m-2">
      {/* Image */}
      <div className="relative pt-[100%]">
        <img
          src={product.image}
          alt={product.title || 'Product'}
          onError={(e) => { e.target.src = 'https://i.ibb.co/chQJy4G7/p-img1.png'; }}
          className="absolute top-0 left-0 w-full h-full object-contain"
        />
        <div
          onClick={toggleFavorite}
          className={`absolute top-2 right-2 bg-white w-6 h-6 rounded-full flex items-center justify-center cursor-pointer z-10 ${isFavorite ? 'text-pink-600' : 'text-gray-600'}`}
        >
          {isFavorite ? <AiFillHeart /> : <AiOutlineHeart />}
        </div>
      </div>

      {/* Details */}
      <div className="p-3">
        <div className="text-sm text-black mb-2 truncate">
          {product.title}
        </div>
        <div className="flex items-center gap-1 mb-2">
          <span className="text-sm font-semibold text-green-800">₹{product.price}</span>
          {product.originalPrice && <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>}
          {product.discount && <span className="text-xs text-orange-500 font-semibold">{product.discount}% OFF</span>}
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-600 mb-2">
          {[...Array(5)].map((_, i) => (
            <span key={`star-${i}`} className={`${i + 1 <= Math.floor(rating) ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
          ))}
          <span>({rating})</span>
        </div>

        {/* Cart & Buy Now buttons */}
        {count === 0 ? (
          <div className="flex gap-2 mt-2">
            <button
              onClick={addToCart}
              className="flex-1 bg-black text-white text-xs rounded px-2 py-1"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 border border-black text-black text-xs rounded px-2 py-1"
            >
              Buy Now
            </button>
          </div>
        ) : (
          <div className="flex gap-2 mt-2">
            <QuantityCounter
              quantity={count}
              onDecrease={decreaseQuantity}
              onIncrease={increaseQuantity}
            />
            <button
              onClick={handleBuyNow}
              className="flex-1 border border-black text-black text-xs rounded px-2 py-1"
            >
              Buy Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gridcard;