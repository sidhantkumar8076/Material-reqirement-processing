import React, { useState, useEffect } from 'react';
import * as orderService from '../services/orderService';
import * as supplierService from '../services/supplierService';
import * as materialService from '../services/materialService';
import * as requirementService from '../services/requirementService';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    requirement_id: '',
    supplier_id: '',
    material_id: '',
    quantity_ordered: '',
    order_date: '',
    expected_delivery_date: '',
    actual_delivery_date: '',
    status: 'pending',
    total_amount: '',
    notes: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [ord, sup, mat, req] = await Promise.all([
        orderService.getOrders(),
        supplierService.getSuppliers(),
        materialService.getMaterials(),
        requirementService.getRequirements()
      ]);
      setOrders(ord.data);
      setSuppliers(sup.data);
      setMaterials(mat.data);
      setRequirements(req.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const submitData = {
        ...formData,
        requirement_id: formData.requirement_id || null,
        quantity_ordered: formData.quantity_ordered ? parseFloat(formData.quantity_ordered) : null,
        total_amount: formData.total_amount ? parseFloat(formData.total_amount) : null
      };
      
      if (editingId) {
        await orderService.updateOrder(editingId, submitData);
        alert('Order updated successfully!');
      } else {
        await orderService.createOrder(submitData);
        alert('Order created successfully!');
      }
      setFormData({
        requirement_id: '',
        supplier_id: '',
        material_id: '',
        quantity_ordered: '',
        order_date: '',
        expected_delivery_date: '',
        actual_delivery_date: '',
        status: 'pending',
        total_amount: '',
        notes: ''
      });
      setShowForm(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error saving order:', error);
      alert(`Error saving order: ${error.response?.data?.error || error.message}`);
    }
  };

  const handleEdit = (order) => {
    setFormData(order);
    setEditingId(order.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await orderService.deleteOrder(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting order:', error);
        alert('Error deleting order');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Orders Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Create Order'}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: '2rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
          <h2>{editingId ? 'Edit Order' : 'Create New Order'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Requirement</label>
                <select
                  className="form-control"
                  name="requirement_id"
                  value={formData.requirement_id}
                  onChange={handleInputChange}
                >
                  <option value="">Select Requirement</option>
                  {requirements.map(r => (
                    <option key={r.id} value={r.id}>{r.project_name} - {r.required_quantity} units</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Material *</label>
                <select
                  className="form-control"
                  name="material_id"
                  value={formData.material_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Material</option>
                  {materials.map(m => (
                    <option key={m.id} value={m.id}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Supplier *</label>
                <select
                  className="form-control"
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Supplier</option>
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Quantity Ordered</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity_ordered"
                  value={formData.quantity_ordered}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Order Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="order_date"
                  value={formData.order_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Expected Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="expected_delivery_date"
                  value={formData.expected_delivery_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Actual Delivery Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="actual_delivery_date"
                  value={formData.actual_delivery_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  className="form-control"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Total Amount</label>
                <input
                  type="number"
                  className="form-control"
                  name="total_amount"
                  value={formData.total_amount}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Notes</label>
              <textarea
                className="form-control"
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              {editingId ? 'Update Order' : 'Create Order'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        {orders.length === 0 ? (
          <div className="no-data">No orders found. Create one to get started.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Supplier</th>
                <th>Quantity</th>
                <th>Order Date</th>
                <th>Expected Delivery</th>
                <th>Status</th>
                <th>Total Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td><strong>{order.material_name}</strong></td>
                  <td>{order.supplier_name}</td>
                  <td>{order.quantity_ordered}</td>
                  <td>{new Date(order.order_date).toLocaleDateString()}</td>
                  <td>{new Date(order.expected_delivery_date).toLocaleDateString()}</td>
                  <td><span style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>{order.status}</span></td>
                  <td>${parseFloat(order.total_amount || 0).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(order)} style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(order.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Orders;
