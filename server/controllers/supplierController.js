import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Get all suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [suppliers] = await connection.query('SELECT * FROM suppliers WHERE status = "active"');
    connection.release();
    res.json(suppliers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching suppliers' });
  }
};

// Get supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [supplier] = await connection.query('SELECT * FROM suppliers WHERE id = ?', [id]);
    connection.release();
    
    if (supplier.length === 0) {
      return res.status(404).json({ error: 'Supplier not found' });
    }
    res.json(supplier[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching supplier' });
  }
};

// Create supplier
export const createSupplier = async (req, res) => {
  try {
    const { name, contact_person, email, phone, address, city, state, country, lead_time_days } = req.body;
    const id = uuidv4();
    
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO suppliers (id, name, contact_person, email, phone, address, city, state, country, lead_time_days) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, contact_person, email, phone, address, city, state, country, lead_time_days || 0]
    );
    connection.release();
    
    res.status(201).json({ id, message: 'Supplier created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating supplier' });
  }
};

// Update supplier
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact_person, email, phone, address, city, state, country, lead_time_days, status } = req.body;
    
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE suppliers SET name = ?, contact_person = ?, email = ?, phone = ?, address = ?, city = ?, state = ?, country = ?, lead_time_days = ?, status = ? WHERE id = ?',
      [name, contact_person, email, phone, address, city, state, country, lead_time_days, status, id]
    );
    connection.release();
    
    res.json({ message: 'Supplier updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating supplier' });
  }
};

// Delete supplier
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    await connection.query('UPDATE suppliers SET status = "inactive" WHERE id = ?', [id]);
    connection.release();
    
    res.json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting supplier' });
  }
};
