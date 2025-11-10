import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SearchContext } from "../Contexts/SearchContext";
import CartTotal from "../Components/CartTotal";
import CartItemList from "../Components/CartItemList";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const { navigate } = useContext(SearchContext);

  const getToken = () => localStorage.getItem("token");

  const fetchProductDetails = async (items, token) => {
    try {
      const requests = items.map(item =>
        axios.get(`http://localhost:9000/products/${item.prodId}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
      const responses = await Promise.all(requests);
      return items.map((item, idx) => ({
        ...item,
        title: responses[idx].data.title || "Unknown Product",
        image: responses[idx].data.image || ""
      }));
    } catch (error) {
      console.error("Error fetching product details:", error);
      toast.error("Failed to load product details");
      return items;
    }
  };

  useEffect(() => {
    const fetchCart = async () => {
      const token = getToken();
      if (!token) {
        toast.error("Please login to view cart");
        setLoading(false);
        return;
      }
      try {
        const { data: items = [] } = await axios.get("http://localhost:9000/cart", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const enriched = await fetchProductDetails(items, token);
        setCartItems(enriched);
      } catch (error) {
        console.error("Fetch cart error:", error);
        toast.error("Could not load cart");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Automatically clean up scroll if user navigates away or something fails
  useEffect(() => {
    if (checkoutLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup on unmount
    };
  }, [checkoutLoading]);

  const updateQuantity = async (cartItemId, action) => {
    try {
      const token = getToken();
      const res = await axios.patch(
        `http://localhost:9000/cart/${action}/${cartItemId}`,
        null,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (!res.data) {
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      } else {
        setCartItems(prev =>
          prev.map(item =>
            item.id === cartItemId ? { ...item, quantity: res.data.quantity } : item
          )
        );
      }
    } catch (error) {
      console.error(`${action} quantity error:`, error);
      toast.error(`Failed to ${action} quantity`);
    }
  };

  const removeItem = async (cartItemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:9000/cart/remove/${cartItemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      toast.success("Item removed from cart");
    } catch (err) {
      console.error("Remove item error:", err);
      toast.error("Failed to remove item");
    }
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    setCheckoutLoading(true);
    setTimeout(() => {
      document.body.style.overflow = "auto"; // ✅ Re-enable scroll before navigating
      navigate('/place-order', {
        state: { cartItems, paymentMethod: 'razorpay' },
      });
    }, 1000); // 1s delay for loader effect
  };

  return (
    <div className="border-t relative min-h-[300px]">
      
      {checkoutLoading && (
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-40 flex justify-center items-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-white border-gray-500 rounded-full animate-spin"></div>
            <p className="text-black text-lg font-semibold mt-4">Redirecting to checkout...</p>
          </div>
        </div>
      )}

      {/* Loader during initial cart fetch */}
      {loading ? (
        <div className="w-full flex justify-center items-center min-h-[300px]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-white border-gray-500 rounded-full animate-spin"></div>
            <p className="text-gray-700 text-lg font-semibold mt-4">Loading your cart...</p>
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="text-center my-10">Your cart is empty.</p>
      ) : (
        <div className="flex justify-between items-start my-10 w-full px-4">
          <CartItemList
            cartItems={cartItems}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
          />
          <div className="w-full max-w-[400px]">
            <CartTotal totalAmount={totalAmount} />
            <div className="w-full text-end">
              <button
                onClick={handleCheckout}
                className="bg-black text-white text-sm my-4 px-6 py-3 cursor-pointer"
                disabled={checkoutLoading}
              >
                {checkoutLoading ? "Processing..." : "CHECKOUT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;