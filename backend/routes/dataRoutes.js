const express = require('express');
const { getData, updateData } = require('../controllers/dataController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authMiddleware, getData);
router.put('/', authMiddleware, updateData);

module.exports = router;
