import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AllVendors = () => {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        setError('');

        const token = localStorage.getItem('token');
        if (!token) {
          setError('You must be logged in to view this data.');
          setLoading(false);
          return;
        }

        const res = await axios.get('http://localhost:9000/users/vendors', {
          headers: { Authorization: `Bearer ${token}` }  // ✅ Fixed string interpolation
        });

        const sorted = (res.data || []).sort(
          (a, b) => (b.unitsSold ?? 0) - (a.unitsSold ?? 0)
        );

        setVendors(sorted);
      } catch (err) {
        console.error('Failed to fetch vendors:', err);
        setError('Could not load vendors. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchVendors();
  }, []);

  if (loading) return <div className="p-4">Loading vendors...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">All Vendors (sorted by units sold)</h2>
      {vendors.length === 0 ? (
        <p>No vendors found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">ID</th>
                <th className="px-3 py-2 border">Name</th>
                <th className="px-3 py-2 border">Email</th>
                <th className="px-3 py-2 border">Phone</th>
                <th className="px-3 py-2 border">Total Units Sold</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.userDTO.id}>
                  <td className="px-3 py-2 border text-center">{vendor.userDTO.id}</td>
                  <td className="px-3 py-2 border">{vendor.userDTO.name}</td>
                  <td className="px-3 py-2 border">{vendor.userDTO.email}</td>
                  <td className="px-3 py-2 border">{vendor.userDTO.phone}</td>
                  <td className="px-3 py-2 border text-center">{vendor.unitsSold ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllVendors;