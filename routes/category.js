const express = require('express');
const router = express.Router();
const { getCategoryById, createCategory, getCategory, getAllCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');

router.param("userId", getUserById);
router.param("categoryId", getCategoryById);

router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, createCategory);
router.get("/category/:categoryId", getCategory);
router.get("/category/all", getAllCategory);
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, updateCategory);
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteCategory);

module.exports = router;