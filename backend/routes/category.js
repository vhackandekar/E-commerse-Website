const express = require('express');
const { 
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category');
const AsyncHandler = require('../middleware/AsyncHandler');

const router = express.Router();

// CRUD Operations for Categories
router.route('/')
    .get(AsyncHandler(getAllCategories))
    .post(AsyncHandler(createCategory));

router.route('/:id')
    .get(AsyncHandler(getCategoryById))
    .put(AsyncHandler(updateCategory))
    .delete(AsyncHandler(deleteCategory));

module.exports = router;