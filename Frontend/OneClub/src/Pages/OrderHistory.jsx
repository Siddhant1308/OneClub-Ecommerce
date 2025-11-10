import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Title from '../Components/Title';
import OrderItem from '../Components/OrderItem'; // ✅ use correct filename

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:9000/orders/history', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [token]);

  return (
    <div className="border-t border-gray-200 pt-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-2xl font-bold text-gray-800 mb-6">
        <Title text={''} text2="ORDER'S HISTORY" />
      </div>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <p className="text-gray-500 text-center">You have no orders yet.</p>
        ) : (
          orders.map((order) => <OrderItem key={order.id} order={order} />)
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
