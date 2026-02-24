const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
} = require('../controllers/memberController');

router.get('/', verifyToken, getAllMembers);
router.get('/:id', verifyToken, getMemberById);
router.post('/', verifyToken, createMember);
router.put('/:id', verifyToken, updateMember);
router.delete('/:id', verifyToken, deleteMember);

module.exports = router;
