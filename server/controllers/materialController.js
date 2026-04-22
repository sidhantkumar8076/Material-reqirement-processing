import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Get all materials
export const getAllMaterials = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [materials] = await connection.query('SELECT * FROM materials WHERE status = "active"');
    connection.release();
    res.json(materials);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching materials' });
  }
};

// Get material by ID
export const getMaterialById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [material] = await connection.query('SELECT * FROM materials WHERE id = ?', [id]);
    connection.release();
    
    if (material.length === 0) {
      return res.status(404).json({ error: 'Material not found' });
    }
    res.json(material[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching material' });
  }
};

// Create material
export const createMaterial = async (req, res) => {
  try {
    const { name, description, unit, quantity_required, reorder_level, unit_cost, category } = req.body;
    const id = uuidv4();
    
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO materials (id, name, description, unit, quantity_required, reorder_level, unit_cost, category) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, name, description, unit, quantity_required || 0, reorder_level || 0, unit_cost || 0, category]
    );
    connection.release();
    
    res.status(201).json({ id, message: 'Material created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating material' });
  }
};

// Update material
export const updateMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, unit, quantity_required, reorder_level, unit_cost, category, status } = req.body;
    
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE materials SET name = ?, description = ?, unit = ?, quantity_required = ?, reorder_level = ?, unit_cost = ?, category = ?, status = ? WHERE id = ?',
      [name, description, unit, quantity_required, reorder_level, unit_cost, category, status, id]
    );
    connection.release();
    
    res.json({ message: 'Material updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating material' });
  }
};

// Delete material
export const deleteMaterial = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    await connection.query('UPDATE materials SET status = "inactive" WHERE id = ?', [id]);
    connection.release();
    
    res.json({ message: 'Material deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting material' });
  }
};
