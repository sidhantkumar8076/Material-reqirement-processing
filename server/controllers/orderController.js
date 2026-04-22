import pool from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';

// Get all orders
export const getAllOrders = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [orders] = await connection.query(`
      SELECT o.*, m.name as material_name, s.name as supplier_name, r.project_name
      FROM orders o
      LEFT JOIN materials m ON o.material_id = m.id
      LEFT JOIN suppliers s ON o.supplier_id = s.id
      LEFT JOIN requirements r ON o.requirement_id = r.id
      ORDER BY o.created_at DESC
    `);
    connection.release();
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching orders' });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [order] = await connection.query(`
      SELECT o.*, m.name as material_name, s.name as supplier_name, r.project_name
      FROM orders o
      LEFT JOIN materials m ON o.material_id = m.id
      LEFT JOIN suppliers s ON o.supplier_id = s.id
      LEFT JOIN requirements r ON o.requirement_id = r.id
      WHERE o.id = ?
    `, [id]);
    connection.release();
    
    if (order.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching order' });
  }
};

// Create order
export const createOrder = async (req, res) => {
  try {
    const { requirement_id, supplier_id, material_id, quantity_ordered, order_date, expected_delivery_date, total_amount, notes } = req.body;
    const id = uuidv4();
    
    // Convert empty strings to NULL for date fields
    const cleanOrderDate = order_date ? order_date : null;
    const cleanExpectedDeliveryDate = expected_delivery_date ? expected_delivery_date : null;
    const cleanRequirementId = requirement_id ? requirement_id : null;
    
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO orders (id, requirement_id, supplier_id, material_id, quantity_ordered, order_date, expected_delivery_date, total_amount, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, cleanRequirementId, supplier_id, material_id, quantity_ordered || null, cleanOrderDate, cleanExpectedDeliveryDate, total_amount || null, notes || null]
    );
    connection.release();
    
    res.status(201).json({ id, message: 'Order created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating order' });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { requirement_id, supplier_id, material_id, quantity_ordered, order_date, expected_delivery_date, actual_delivery_date, status, total_amount, notes } = req.body;
    
    // Convert empty strings to NULL for date fields
    const cleanOrderDate = order_date ? order_date : null;
    const cleanExpectedDeliveryDate = expected_delivery_date ? expected_delivery_date : null;
    const cleanActualDeliveryDate = actual_delivery_date ? actual_delivery_date : null;
    const cleanRequirementId = requirement_id ? requirement_id : null;
    
    const connection = await pool.getConnection();
    await connection.query(
      'UPDATE orders SET requirement_id = ?, supplier_id = ?, material_id = ?, quantity_ordered = ?, order_date = ?, expected_delivery_date = ?, actual_delivery_date = ?, status = ?, total_amount = ?, notes = ? WHERE id = ?',
      [cleanRequirementId, supplier_id, material_id, quantity_ordered || null, cleanOrderDate, cleanExpectedDeliveryDate, cleanActualDeliveryDate, status, total_amount || null, notes || null, id]
    );
    connection.release();
    
    res.json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating order' });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    await connection.query('UPDATE orders SET status = "cancelled" WHERE id = ?', [id]);
    connection.release();
    
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting order' });
  }
};
