import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Phone, MapPin, Clock, Trash2, Edit, X, Check } from 'lucide-react';
import { ordersAPI } from '../../services/api.js';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [cashAmount, setCashAmount] = useState('');

  const statusOptions = [
    'pending',
    'processing',
    'shipped',
    'exchanged',
    'cancelled',
    'cash-collected'
  ];

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    exchanged: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800',
    'cash-collected': 'bg-green-100 text-green-800'
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await ordersAPI.getAll();
      if (res.data.success) {
        setOrders(res.data.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      }
    } catch (err) {
      alert('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (id) => {
    try {
      const data = { status: editStatus };
      if (editStatus === 'cash-collected') {
        data.cashCollected = parseInt(cashAmount) || 0;
      }
      await ordersAPI.update(id, data);
      fetchOrders();
      setEditingId(null);
      setCashAmount('');
    } catch (err) {
      alert('Update failed');
    }
  };

  const deleteOrder = async (id) => {
  if (!window.confirm('Delete this order permanently?')) return;
  
  try {
    // USE ordersAPI.delete() → it goes to correct backend URL + adds token automatically
    await ordersAPI.delete(id);
    fetchOrders(); // refresh list
  } catch (err) {
    console.error('Delete failed:', err);
    alert('Delete failed — check console');
  }
};

  if (loading) {
    return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Orders Management</h1>
          <p className="text-gray-600 dark:text-gray-300">Total Orders: {orders.length}</p>
        </div>
      </div>

      <div className="grid gap-6">
        {orders.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No orders yet</div>
        ) : (
          orders.map((order) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-lg font-bold text-purple-600">Order #{order.orderId || order._id.slice(-6)}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString('en-BD')}
                    </p>
                  </div>

                  {editingId === order._id ? (
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateOrder(order._id)} className="p-2 bg-green-600 text-white rounded hover:bg-green-700">
                        <Check size={18} />
                      </button>
                      <button onClick={() => { setEditingId(null); setCashAmount(''); }} className="p-2 bg-gray-600 text-white rounded hover:bg-gray-700">
                        <X size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEditingId(order._id); setEditStatus(order.status); setCashAmount(order.cashCollected || ''); }} className="p-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                        <Edit size={18} />
                      </button>
                      <button onClick={() => deleteOrder(order._id)} className="p-2 bg-red-600 text-white rounded hover:bg-red-700">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Customer Info */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                      <Package className="text-purple-600" size={18} /> Customer Details
                    </h3>
                    <div className="space-y-1 text-sm">
                      <p><strong>Name:</strong> {order.customer.name}</p>
                      <p className="flex items-center gap-2"><Phone size={14} /> {order.customer.phone}</p>
                      {order.customer.email && <p><strong>Email:</strong> {order.customer.email}</p>}
                      <p className="flex items-center gap-2"><MapPin size={14} /> {order.customer.address}, {order.customer.city}</p>
                      <p><strong>Shipping:</strong> {order.shippingArea === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'} (৳{order.shippingCost})</p>
                      {order.customer.notes && <p><strong>Notes:</strong> {order.customer.notes}</p>}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Order Items</h3>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span>{item.name} × {item.quantity}</span>
                          <span>৳{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="border-t pt-2 font-bold flex justify-between">
                        <span>Total Amount</span>
                        <span className="text-purple-600">৳{order.totalAmount.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status & Cash */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <span className="font-medium">Status:</span>
                    {editingId === order._id ? (
                      <select
                        value={editStatus}
                        onChange={(e) => setEditStatus(e.target.value)}
                        className="px-3 py-1 border rounded-md"
                      >
                        {statusOptions.map(s => (
                          <option key={s} value={s}>{s.replace('-', ' ')}</option>
                        ))}
                      </select>
                    ) : (
                      <span className={`px-4 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status.replace('-', ' ')}
                      </span>
                    )}
                  </div>

                  {editingId === order._id && editStatus === 'cash-collected' && (
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Cash collected"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                        className="w-32 px-3 py-1 border rounded-md"
                      />
                      <span>BDT</span>
                    </div>
                  )}

                  {order.status === 'cash-collected' && order.cashCollected > 0 && (
                    <div className="text-green-600 font-bold">
                      Cash Collected: ৳{order.cashCollected.toLocaleString()}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminOrders;