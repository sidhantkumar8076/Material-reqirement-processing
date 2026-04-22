import React, { useState, useEffect } from 'react';
import * as materialService from '../services/materialService';
import * as requirementService from '../services/requirementService';
import * as supplierService from '../services/supplierService';
import * as orderService from '../services/orderService';

function Dashboard() {
  const [stats, setStats] = useState({
    totalMaterials: 0,
    totalRequirements: 0,
    totalSuppliers: 0,
    totalOrders: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [materials, requirements, suppliers, orders] = await Promise.all([
          materialService.getMaterials(),
          requirementService.getRequirements(),
          supplierService.getSuppliers(),
          orderService.getOrders()
        ]);

        setStats({
          totalMaterials: materials.data.length,
          totalRequirements: requirements.data.length,
          totalSuppliers: suppliers.data.length,
          totalOrders: orders.data.length
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">⏳ Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">📊 Dashboard</h1>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
          <div className="dashboard-card-title">Total Materials</div>
          <div className="dashboard-card-value">{stats.totalMaterials}</div>
        </div>
        <div className="dashboard-card">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📋</div>
          <div className="dashboard-card-title">Total Requirements</div>
          <div className="dashboard-card-value">{stats.totalRequirements}</div>
        </div>
        <div className="dashboard-card">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🏭</div>
          <div className="dashboard-card-title">Total Suppliers</div>
          <div className="dashboard-card-value">{stats.totalSuppliers}</div>
        </div>
        <div className="dashboard-card">
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🛒</div>
          <div className="dashboard-card-title">Total Orders</div>
          <div className="dashboard-card-value">{stats.totalOrders}</div>
        </div>
      </div>

      <div className="table-container" style={{ marginTop: '3rem' }}>
        <div style={{ padding: '2.5rem 2rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#2c3e50', fontWeight: '700' }}>
            👋 Welcome to Material Requirement Processing System
          </h2>
          <p style={{ fontSize: '1rem', color: '#7f8c8d', lineHeight: '1.6', marginBottom: '1.5rem' }}>
            Manage your materials, requirements, suppliers, and orders all in one place. Use the navigation menu to get started.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
            <div style={{ padding: '1.5rem', backgroundColor: '#f0f4ff', borderRadius: '8px', borderLeft: '4px solid #667eea' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📦</div>
              <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontWeight: '700' }}>Materials</h3>
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Manage and track your inventory</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#fff0f4', borderRadius: '8px', borderLeft: '4px solid #f5576c' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>📋</div>
              <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontWeight: '700' }}>Requirements</h3>
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Track your material needs</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#f0fff4', borderRadius: '8px', borderLeft: '4px solid #10b981' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🏭</div>
              <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontWeight: '700' }}>Suppliers</h3>
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Manage supplier information</p>
            </div>
            <div style={{ padding: '1.5rem', backgroundColor: '#fffbf0', borderRadius: '8px', borderLeft: '4px solid #f59e0b' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>🛒</div>
              <h3 style={{ color: '#2c3e50', marginBottom: '0.5rem', fontWeight: '700' }}>Orders</h3>
              <p style={{ color: '#7f8c8d', fontSize: '0.9rem' }}>Create and track orders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
