const express = require('express');
const { 
    getActiveFlashSales, 
    getMonthlyBestSellers, 
    getNewArrivals,
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
} = require('../controllers/product');
const AsyncHandler = require('../middleware/AsyncHandler');

const router = express.Router();

// GET Active Flash Sale Products
router.get('/flash-sales', AsyncHandler(getActiveFlashSales));

// GET Monthly Best Sellers
router.get('/best-sellers', AsyncHandler(getMonthlyBestSellers));

// GET New Arrival Products
router.get('/new-arrivals', AsyncHandler(getNewArrivals));

// CRUD Operations for Products
router.route('/')
    .get(AsyncHandler(getAllProducts))
    .post(AsyncHandler(createProduct));

router.route('/:id')
    .get(AsyncHandler(getProductById))
    .put(AsyncHandler(updateProduct))
    .delete(AsyncHandler(deleteProduct));

module.exports = router;