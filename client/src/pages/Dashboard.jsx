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
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="dashboard-card-title">Total Materials</div>
          <div className="dashboard-card-value">{stats.totalMaterials}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-title">Total Requirements</div>
          <div className="dashboard-card-value">{stats.totalRequirements}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-title">Total Suppliers</div>
          <div className="dashboard-card-value">{stats.totalSuppliers}</div>
        </div>
        <div className="dashboard-card">
          <div className="dashboard-card-title">Total Orders</div>
          <div className="dashboard-card-value">{stats.totalOrders}</div>
        </div>
      </div>

      <div className="table-container">
        <h2 style={{ padding: '1.5rem 1rem 0' }}>Quick Overview</h2>
        <p style={{ padding: '0.5rem 1rem' }}>
          Welcome to the Material Requirement Processing System. Use the navigation menu to manage materials, requirements, suppliers, and orders.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;
