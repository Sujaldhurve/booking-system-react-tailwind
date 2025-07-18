const express = require('express');
const router = express.Router();
const { addSlot, getSlots, deleteSlot } = require('../controllers/slotController');

router.get('/', getSlots);
router.post('/', addSlot);
router.delete('/:id', deleteSlot);

module.exports = router;
