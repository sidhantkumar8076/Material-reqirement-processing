import React, { useState, useEffect } from 'react';
import * as requirementService from '../services/requirementService';
import * as materialService from '../services/materialService';

function Requirements() {
  const [requirements, setRequirements] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    material_id: '',
    project_name: '',
    required_quantity: '',
    required_date: '',
    priority: 'medium',
    notes: '',
    created_by: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [req, mat] = await Promise.all([
        requirementService.getRequirements(),
        materialService.getMaterials()
      ]);
      setRequirements(req.data);
      setMaterials(mat.data);
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
      if (editingId) {
        await requirementService.updateRequirement(editingId, formData);
      } else {
        await requirementService.createRequirement(formData);
      }
      setFormData({
        material_id: '',
        project_name: '',
        required_quantity: '',
        required_date: '',
        priority: 'medium',
        notes: '',
        created_by: ''
      });
      setShowForm(false);
      setEditingId(null);
      fetchData();
    } catch (error) {
      console.error('Error saving requirement:', error);
      alert('Error saving requirement');
    }
  };

  const handleEdit = (requirement) => {
    setFormData(requirement);
    setEditingId(requirement.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this requirement?')) {
      try {
        await requirementService.deleteRequirement(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting requirement:', error);
        alert('Error deleting requirement');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading requirements...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">📋 Requirements Management</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ fontSize: '0.95rem' }}>
          {showForm ? '✕ Cancel' : '+ Add Requirement'}
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
            {editingId ? '✏️ Edit Requirement' : '➕ Add New Requirement'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
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
                <label className="form-label">Project Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="project_name"
                  value={formData.project_name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Required Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  name="required_quantity"
                  value={formData.required_quantity}
                  onChange={handleInputChange}
                  placeholder="0"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Required Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="required_date"
                  value={formData.required_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  className="form-control"
                  name="priority"
                  value={formData.priority}
                  onChange={handleInputChange}
                >
                  <option value="low">🟢 Low</option>
                  <option value="medium">🟡 Medium</option>
                  <option value="high">🔴 High</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Created By</label>
                <input
                  type="text"
                  className="form-control"
                  name="created_by"
                  value={formData.created_by}
                  onChange={handleInputChange}
                  placeholder="Your name"
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
                placeholder="Add any additional notes"
                style={{ resize: 'vertical', minHeight: '100px' }}
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
        {requirements.length === 0 ? (
          <div className="no-data">📭 No requirements found. Create one to get started.</div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>📦 Material</th>
                <th>🏗️ Project</th>
                <th>📊 Quantity</th>
                <th>📅 Required Date</th>
                <th>⚡ Priority</th>
                <th>✓ Status</th>
                <th>⚙️ Actions</th>
              </tr>
            </thead>
            <tbody>
              {requirements.map(req => (
                <tr key={req.id}>
                  <td><strong>{req.material_name}</strong></td>
                  <td>{req.project_name || '-'}</td>
                  <td>{req.required_quantity} {req.unit}</td>
                  <td>{new Date(req.required_date).toLocaleDateString()}</td>
                  <td>
                    <span style={{ 
                      textTransform: 'capitalize',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      backgroundColor: req.priority === 'high' ? '#fee2e2' : req.priority === 'medium' ? '#fef3c7' : '#dcfce7',
                      color: req.priority === 'high' ? '#991b1b' : req.priority === 'medium' ? '#92400e' : '#166534'
                    }}>
                      {req.priority === 'high' ? '🔴' : req.priority === 'medium' ? '🟡' : '🟢'} {req.priority}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      textTransform: 'capitalize',
                      padding: '0.4rem 0.8rem',
                      borderRadius: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '600',
                      backgroundColor: req.status === 'completed' ? '#dcfce7' : '#fef3c7',
                      color: req.status === 'completed' ? '#166534' : '#92400e'
                    }}>
                      {req.status === 'completed' ? '✓' : '⧗'} {req.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-primary" onClick={() => handleEdit(req)} style={{ marginRight: '0.5rem', fontSize: '0.85rem', padding: '0.6rem 1rem' }}>
                      ✏️ Edit
                    </button>
                    <button className="btn btn-danger" onClick={() => handleDelete(req.id)} style={{ fontSize: '0.85rem', padding: '0.6rem 1rem' }}>
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

export default Requirements;
