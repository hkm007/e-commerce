const express = require('express');
const router = express.Router();
const { getProductById, createProduct, getProduct, getAllProduct, photo, updateProduct, deleteProduct, getAllUniqueCategory } = require('../controllers/product');
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth');

router.param("userId", getUserById);
router.param("productId", getProductById);

router.post("/product/create/:userId", isSignedIn, isAuthenticated, isAdmin, createProduct);
router.get("/product/:productId", getProduct);
router.get("/product/all", getAllProduct);
router.get("/product/all/categories", getAllUniqueCategory);
router.get("/product/photo/:productId", photo);
router.put("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, updateProduct);
router.delete("/product/:productId/:userId", isSignedIn, isAuthenticated, isAdmin, deleteProduct);

module.exports = router;