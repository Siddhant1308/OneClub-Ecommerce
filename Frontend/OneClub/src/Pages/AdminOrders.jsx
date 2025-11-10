import React, { useEffect, useState } from 'react';
import AdminOrderItem from '../Components/AdminOrderItem.jsx';
import axios from 'axios';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch all orders
  const fetchAllOrders = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:9000/orders', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  // Update delivery status
  const handleChangeDeliveryStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `http://localhost:9000/orders/${orderId}/delivery-status?status=${newStatus}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update local state to reflect change
      setOrders(prevOrders =>
        prevOrders.map(order =>
          order.id === orderId ? { ...order, deliveryStatus: newStatus } : order
        )
      );
    } catch (err) {
      console.error('Failed to update delivery status', err);
      alert('Failed to update delivery status. Please try again.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All Orders (Admin View)</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="space-y-2">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            orders.map(order => (
              <AdminOrderItem
                key={order.id}
                order={order}
                onChangeDeliveryStatus={handleChangeDeliveryStatus}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;