import React, { useState, useEffect } from 'react';
import * as materialService from '../services/materialService';

function Materials() {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit: '',
    quantity_required: '',
    reorder_level: '',
    unit_cost: '',
    category: ''
  });

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      const response = await materialService.getMaterials();
      setMaterials(response.data);
    } catch (error) {
      console.error('Error fetching materials:', error);
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
        await materialService.updateMaterial(editingId, formData);
      } else {
        await materialService.createMaterial(formData);
      }
      setFormData({
        name: '',
        description: '',
        unit: '',
        quantity_required: '',
        reorder_level: '',
        unit_cost: '',
        category: ''
      });
      setShowForm(false);
      setEditingId(null);
      fetchMaterials();
    } catch (error) {
      console.error('Error saving material:', error);
      alert('Error saving material');
    }
  };

  const handleEdit = (material) => {
    setFormData(material);
    setEditingId(material.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this material?')) {
      try {
        await materialService.deleteMaterial(id);
        fetchMaterials();
      } catch (error) {
        console.error('Error deleting material:', error);
        alert('Error deleting material');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading materials...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Materials Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Material'}
        </button>
      </div>

      {showForm && (
        <div style={{ marginBottom: '2rem', backgroundColor: 'white', padding: '2rem', borderRadius: '8px' }}>
          <h2>{editingId ? 'Edit Material' : 'Add New Material'}</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Material Name *</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit</label>
                <input
                  type="text"
                  className="form-control"
                  name="unit"
                  value={formData.unit}
                  onChange={handleInputChange}
                  placeholder="e.g., kg, meter, piece"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  className="form-control"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Quantity Required</label>
                <input
                  type="number"
                  className="form-control"
                  name="quantity_required"
                  value={formData.quantity_required}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Reorder Level</label>
                <input
                  type="number"
                  className="form-control"
                  name="reorder_level"
                  value={formData.reorder_level}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Unit Cost</label>
                <input
                  type="number"
                  className="form-control"
                  name="unit_cost"
                  value={formData.unit_cost}
                  onChange={handleInputChange}
                  step="0.01"
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-success">
              {editingId ? 'Update Material' : 'Create Material'}
            </button>
          </form>
        </div>
      )}

      <div className="table-container">
        {materials.length === 0 ? (
          <div className="no-data">No materials found. Create one to get started.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Unit</th>
                <th>Quantity Required</th>
                <th>Unit Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map(material => (
                <tr key={material.id}>
                  <td><strong>{material.name}</strong></td>
                  <td>{material.category || '-'}</td>
                  <td>{material.unit || '-'}</td>
                  <td>{material.quantity_required || 0}</td>
                  <td>${parseFloat(material.unit_cost || 0).toFixed(2)}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(material)} style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(material.id)}>
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

export default Materials;
