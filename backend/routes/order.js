const express = require('express');
const { createOrder, getUserOrders, updateOrderStatus } = require('../controllers/order');
const AsyncHandler = require('../middleware/AsyncHandler');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Protected routes (require user authentication)
router.route('/')
    .post(protect, AsyncHandler(createOrder))
    .get(protect, AsyncHandler(getUserOrders));

router.route('/:orderId')
    .put(protect, authorize('admin'), AsyncHandler(updateOrderStatus));

module.exports = router;
