import React from "react";
import { useCart } from "../Contexts/CartContext";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty } = useCart();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shippingFee = subtotal > 100 ? 0 : 25;
  const total = subtotal + shippingFee;

  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-2xl font-semibold mb-8">YOUR CART</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* LEFT SIDE – CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.length === 0 && (
            <p className="text-gray-500">Cart is empty</p>
          )}

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border rounded-lg p-5"
            >
              {/* LEFT */}
              <div className="flex items-center gap-5">
                <img
                  src={item.ImageUrl}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h3 className="font-semibold text-lg">
                    {item.name}
                  </h3>

                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="px-3 py-1 text-lg"
                      >
                        −
                      </button>

                      <span className="px-4 py-1 border-x font-semibold">
                        {item.qty}
                      </span>

                      <button
                        onClick={() => increaseQty(item.id)}
                        className="px-3 py-1 text-lg"
                      >
                        +
                      </button>
                    </div>

                    <span className="text-gray-500">
                      × ₹ {item.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT PRICE */}
              <p className="font-semibold text-lg">
                ₹ {(item.price * item.qty).toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE – CART TOTAL */}
        <div className="border rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold border-b pb-4">
            CART TOTAL
          </h2>

          <div className="flex justify-between mt-4">
            <span>Subtotal</span>
            <span>₹ {subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between mt-3">
            <span>Shipping Fee</span>
            <span
              className={shippingFee === 0 ? "text-green-600" : ""}
            >
              ₹ {shippingFee}
            </span>
          </div>

          {shippingFee === 0 && (
            <div className="bg-green-100 text-green-700 text-sm p-2 rounded mt-3">
              Congrats! You got free shipping.
            </div>
          )}

          <div className="flex justify-between font-semibold text-lg mt-6">
            <span>Amount to pay</span>
            <span>₹ {total.toFixed(2)}</span>
          </div>

          <p className="text-sm text-gray-500 mt-2">
            * All taxes and GST included.
          </p>

          <button className="w-full bg-black text-white py-3 mt-6 hover:bg-gray-800 transition">
            CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;