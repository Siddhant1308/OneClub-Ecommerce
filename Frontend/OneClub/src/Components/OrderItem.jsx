import React from 'react';
import freeDeliveryLogo from '../assets/freeDelivery.png';

const OrderItem = ({ order }) => {
  return (
    <div className="relative border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-white">
      
      <div className="flex justify-between items-center border-b border-gray-200 bg-black text-white rounded-t-xl p-4">
        <span>Order ID: {order.id}</span>
        <span className="text-xs">{new Date(order.orderDate).toLocaleString()}</span>
      </div>

      
      {order.freeDelivery === 1 && (
        <img
          src={freeDeliveryLogo}
          alt="Free Delivery"
          className="absolute top-5 right-4 w-75 h-auto"
        />
      )}

      
      <div className="px-4 pt-4 pb-2 flex justify-between text-md text-black">
        <span>
          Status:{' '}
          <span
            className={
              order.status === 'PENDING'
                ? 'font-medium text-orange-500'
                : order.status === 'DELIVERED'
                ? 'font-medium text-green-600'
                : order.status === 'CANCELLED'
                ? 'font-medium text-red-500'
                : 'font-medium text-black'
            }
          >
            {order.status}
          </span>
        </span>
        {order.freeDelivery === 0 && <span>Delivery Fee: ₹ 25</span>}
      </div>
      <div className="px-4 text-md text-black">
        Total Amount: <span className="font-semibold">₹ {order.totalAmount}</span>
      </div>

     
      <div className="m-5">
        <h2 className="text-base font-semibold text-black">Order Items</h2>
      </div>
      <div className="border border-black rounded-lg overflow-hidden m-5">
        <table className="w-full text-sm">
          <thead className="bg-black">
            <tr>
              <th className="font-semibold text-white px-2 py-1 text-left">Product</th>
              <th className="font-semibold text-white px-2 py-1 text-center">Quantity</th>
              <th className="font-semibold text-white px-2 py-1 text-center">Price</th>
              <th className="font-semibold text-white px-2 py-1 text-center">Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.id} className="border-t border-black">
                <td className="text-black px-2 py-1 text-left">{item.id}</td>
                <td className="text-black px-2 py-1 text-center">{item.quantity}</td>
                <td className="text-black px-2 py-1 text-center">₹ {item.price}</td>
                <td className="text-black px-2 py-1 text-center">₹ {item.quantity * item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

  
      <div className="mt-3 px-4 pb-4 text-sm text-black space-y-1">
        <p>
          <span className="font-medium">Shipping Address:</span>{' '}
          {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
          {order.shippingAddress.state}, {order.shippingAddress.country} -{' '}
          {order.shippingAddress.zip}
        </p>
        <p>
          <span className="font-medium">Receiver's Name:</span> {order.receiverName}
        </p>
        <p>
          <span className="font-medium">Receiver's Contact:</span> {order.receiverPhone}
        </p>
      </div>
    </div>
  );
};

export default OrderItem;
