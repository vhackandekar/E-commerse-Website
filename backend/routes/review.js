const express = require('express');
const { 
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
} = require('../controllers/review');
const AsyncHandler = require('../middleware/AsyncHandler');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Create review (protected route)
router.post('/', protect, AsyncHandler(createReview));

// Get all reviews for a product (public)
router.get('/product/:productId', AsyncHandler(getProductReviews));

// Update review (protected - user can only update their own reviews)
router.put('/:reviewId', protect, AsyncHandler(updateReview));

// Delete review (protected - user can only delete their own reviews)
router.delete('/:reviewId', protect, AsyncHandler(deleteReview));

module.exports = router;