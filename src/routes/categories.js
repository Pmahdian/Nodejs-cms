const express = require('express');
const router = express.Router();
const validateRequest = require('../middleware/validationMiddleware');
const { createCategorySchema, updateCategorySchema } = require('../validators/categoryValidator');

//Controller
const {
    getAllCategories, 
    createCategory, 
    updateCategory, 
    deleteCategory
} = require('../controllers/categoryController')

// router
router.get('/',getAllCategories);
router.post('/',createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory)

module.exports = router;