const express = require('express');
const router = express.Router();

const {
  getMessages,
  createMessages,
  deleteAllMessages
} = require('../controllers/messageControllers');

// GET all messages
router.get('/', getMessages);

// POST → create a new message
router.post('/', createMessages);

// DELETE → clear all messages
router.delete('/', deleteAllMessages);

// Optional: if you want a separate endpoint like /clear
// router.delete('/clear', deleteAllMessages);

module.exports = router;