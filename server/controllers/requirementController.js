import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Get all requirements
export const getAllRequirements = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [requirements] = await connection.query(`
      SELECT r.*, m.name as material_name, m.unit 
      FROM requirements r
      JOIN materials m ON r.material_id = m.id
      ORDER BY r.created_at DESC
    `);
    connection.release();
    res.json(requirements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching requirements' });
  }
};

// Get requirement by ID
export const getRequirementById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [requirement] = await connection.query(`
      SELECT r.*, m.name as material_name, m.unit 
      FROM requirements r
      JOIN materials m ON r.material_id = m.id
      WHERE r.id = ?
    `, [id]);
    connection.release();
    
    if (requirement.length === 0) {
      return res.status(404).json({ error: 'Requirement not found' });
    }
    res.json(requirement[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching requirement' });
  }
};

// Create requirement
export const createRequirement = async (req, res) => {
  try {
    const { material_id, project_name, required_quantity, required_date, priority, notes, created_by } = req.body;
    const id = uuidv4();
    
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO requirements (id, material_id, project_name, required_quantity, required_date, priority, notes, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, material_id, project_name, required_quantity, required_date, priority, notes, created_by]
    );
    connection.release();
    
    res.status(201).json({ id, message: 'Requirement created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating requirement' });
  }
};

// Update requirement
export const updateRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    const { material_id, project_name, required_quantity, required_date, priority, status, notes } = req.body;
    
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE requirements SET material_id = ?, project_name = ?, required_quantity = ?, required_date = ?, priority = ?, status = ?, notes = ? WHERE id = ?',
      [material_id, project_name, required_quantity, required_date, priority, status, notes, id]
    );
    connection.release();
    
    res.json({ message: 'Requirement updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating requirement' });
  }
};

// Delete requirement
export const deleteRequirement = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    await connection.query('UPDATE requirements SET status = "cancelled" WHERE id = ?', [id]);
    connection.release();
    
    res.json({ message: 'Requirement deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting requirement' });
  }
};
