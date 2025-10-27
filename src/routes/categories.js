const express = require('express');
const router = express.Router();

//Controller
const {getAllCategories, createCategory} = require('../controllers/categoryController')

// router
router.get('/',getAllCategories);
router.post('/',createCategory);

module.exports = router;