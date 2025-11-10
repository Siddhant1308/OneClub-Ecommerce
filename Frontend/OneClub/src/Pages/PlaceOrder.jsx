import React, { useContext, useState, useEffect } from 'react';
import Title from '../Components/Title';
import CartTotal from '../Components/CartTotal';
import StripImage from '../assets/stripe.png';
import RazorpayImage from '../assets/razorpay.png';
import { SearchContext } from '../Contexts/SearchContext';

const PlaceOrder = () => {
  const [method, setMethod] = useState('cod');
  const [isLoading, setIsLoading] = useState(false);
  const { navigate } = useContext(SearchContext);

  // Disable scroll when loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // cleanup
    };
  }, [isLoading]);

  const handlePlaceOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/Order');
    }, 2000);
  };

  return (
    <div className="relative">
      {/* Loader Overlay */}
      {isLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-white border-gray-400 rounded-full animate-spin"></div>
            <p className="text-white text-lg font-semibold mt-4">Redirecting to checkout...</p>
          </div>
        </div>
      )}

      {/* Main Page Content */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t px-4 sm:px-8">
        {/* Left form */}
        <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
          <div className="text-xl sm:text-2xl my-3">
            <Title text1={'DELIVERY'} text2={'INFORMATION'} />
          </div>

          <div className="flex gap-3">
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="First name" />
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Last name" />
          </div>

          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="email" placeholder="Email address" />
          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Street" />

          <div className="flex gap-3">
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="City" />
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="State" />
          </div>

          <div className="flex gap-3">
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Zipcode" />
            <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="text" placeholder="Country" />
          </div>

          <input className="border border-gray-300 rounded py-1.5 px-3.5 w-full" type="number" placeholder="Phone" />
        </div>

        {/* Right side */}
        <div className="mt-8">
          <div className="mt-8 min-w-80">
            <CartTotal />
          </div>

          <div className="mt-12">
            <Title text1={'PAYMENT'} text2={'METHOD'} />
            <div className="flex gap-3 flex-col lg:flex-row">
              <div onClick={() => setMethod('stripe')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
                <img className="h-5 mx-4" src={StripImage} alt="Stripe" />
              </div>

              <div onClick={() => setMethod('razorpay')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                <img className="h-5 mx-4" src={RazorpayImage} alt="Razorpay" />
              </div>

              <div onClick={() => setMethod('cod')} className="flex items-center gap-3 border p-2 px-3 cursor-pointer">
                <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
                <p className="text-gray-500 text-sm font-medium mx-4">CASH ON DELIVERY</p>
              </div>
            </div>
          </div>

          <div className="w-full text-end mt-8">
            <button
              onClick={handlePlaceOrder}
              className="bg-black text-white px-16 py-3 text-sm cursor-pointer"
              disabled={isLoading}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;