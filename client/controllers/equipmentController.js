const pool = require('../config/db');

// Get all equipment
const getEquipment = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM equipment ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Get equipment by id
const getEquipmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM equipment WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Equipment not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Add new equipment
const createEquipment = async (req, res) => {
  const { name, type, status, last_cleaned_date } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO equipment (name, type, status, last_cleaned_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type, status, last_cleaned_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Update equipment
const updateEquipment = async (req, res) => {
  const { id } = req.params;
  const { name, type, status, last_cleaned_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE equipment SET name = $1, type = $2, status = $3, last_cleaned_date = $4 WHERE id = $5 RETURNING *',
      [name, type, status, last_cleaned_date, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Equipment not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

// Delete equipment
const deleteEquipment = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM equipment WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Equipment not found');
    }
    res.json({ message: 'Equipment deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getEquipment,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment
};
