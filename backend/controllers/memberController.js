const db = require('../config/db');

// Get all members
const getAllMembers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM members ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Get single member
const getMemberById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM members WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Member not found.' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Create member
const createMember = async (req, res) => {
  const { full_name, email, phone, date_of_birth, gender, membership_type, membership_status } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO members (full_name, email, phone, date_of_birth, gender, membership_type, membership_status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [full_name, email, phone, date_of_birth, gender, membership_type, membership_status]
    );
    res.status(201).json({ message: 'Member created successfully.', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Update member
const updateMember = async (req, res) => {
  const { full_name, email, phone, date_of_birth, gender, membership_type, membership_status } = req.body;
  try {
    const [result] = await db.query(
      'UPDATE members SET full_name=?, email=?, phone=?, date_of_birth=?, gender=?, membership_type=?, membership_status=? WHERE id=?',
      [full_name, email, phone, date_of_birth, gender, membership_type, membership_status, req.params.id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Member not found.' });
    }
    res.json({ message: 'Member updated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

// Delete member
const deleteMember = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM members WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Member not found.' });
    }
    res.json({ message: 'Member deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error: error.message });
  }
};

module.exports = { getAllMembers, getMemberById, createMember, updateMember, deleteMember };
