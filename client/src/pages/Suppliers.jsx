import React, { useState, useEffect } from 'react';
import * as supplierService from '../services/supplierService';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: '',
    lead_time_days: ''
  });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await supplierService.getSuppliers();
      setSuppliers(response.data);
    } catch (error) {
      console.error('Error fetching suppliers:', error);
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
      if (editingId) {
        await supplierService.updateSupplier(editingId, formData);
      } else {
        await supplierService.createSupplier(formData);
      }
      setFormData({
        name: '',
        contact_person: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        country: '',
        lead_time_days: ''
      });
      setShowForm(false);
      setEditingId(null);
      fetchSuppliers();
    } catch (error) {
      console.error('Error saving supplier:', error);
      alert('Error saving supplier');
    }
  };

  const handleEdit = (supplier) => {
    setFormData(supplier);
    setEditingId(supplier.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      try {
        await supplierService.deleteSupplier(id);
        fetchSuppliers();
      } catch (error) {
        console.error('Error deleting supplier:', error);
        alert('Error deleting supplier');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading suppliers...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">🏭 Suppliers Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ fontSize: '0.95rem' }}>
          {showForm ? '✕ Cancel' : '+ Add Supplier'}
        </button>
      </div>

      {showForm && (
        <div style={{ 
          marginBottom: '2rem', 
          backgroundColor: 'white', 
          padding: '2.5rem', 
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(102, 126, 234, 0.1)'
        }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '1.5rem', color: '#2c3e50', fontWeight: '700' }}>
            {editingId ? '✏️ Edit Supplier' : '➕ Add New Supplier'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Supplier Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter supplier name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Person</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact_person"
                  value={formData.contact_person}
                  onChange={handleInputChange}
                  placeholder="Enter contact person name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="email@example.com"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
              <div className="form-group">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter city"
                />
              </div>
              <div className="form-group">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter state"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Country</label>
                <input
                  type="text"
                  className="form-control"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter country"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Lead Time (days)</label>
                <input
                  type="number"
                  className="form-control"
                  name="lead_time_days"
                  value={formData.lead_time_days}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Address</label>
              <textarea
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="2"
                placeholder="Enter full address"
                style={{ resize: 'vertical', minHeight: '80px' }}
              ></textarea>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button type="submit" className="btn btn-success" style={{ minWidth: '150px' }}>
                {editingId ? '💾 Update' : '✓ Create'}
              </button>
              <button type="button" className="btn" onClick={() => setShowForm(false)} style={{ 
                backgroundColor: '#95a5a6', 
                color: 'white',
                minWidth: '150px'
              }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        {suppliers.length === 0 ? (
          <div className="no-data">📭 No suppliers found. Create one to get started.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>🏢 Name</th>
                <th>👤 Contact Person</th>
                <th>📧 Email</th>
                <th>📞 Phone</th>
                <th>🏙️ City</th>
                <th>⏱️ Lead Time</th>
                <th>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(supplier => (
                <tr key={supplier.id}>
                  <td><strong>{supplier.name}</strong></td>
                  <td>{supplier.contact_person || '-'}</td>
                  <td><a href={`mailto:${supplier.email}`} style={{ color: '#667eea', textDecoration: 'none' }}>{supplier.email || '-'}</a></td>
                  <td><a href={`tel:${supplier.phone}`} style={{ color: '#667eea', textDecoration: 'none' }}>{supplier.phone || '-'}</a></td>
                  <td>{supplier.city || '-'}</td>
                  <td><span style={{ padding: '0.4rem 0.8rem', backgroundColor: '#f0f4ff', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600' }}>{supplier.lead_time_days || 0} days</span></td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(supplier)} style={{ marginRight: '0.5rem', fontSize: '0.85rem', padding: '0.6rem 1rem' }}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(supplier.id)} style={{ fontSize: '0.85rem', padding: '0.6rem 1rem' }}>
                      🗑️ Delete
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

export default Suppliers;
