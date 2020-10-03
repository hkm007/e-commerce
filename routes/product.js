const express = require('express');
const router = express.Router();
const { getProductById } = require('../controllers/product');
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth');

router.param("userId", getUserById);
router.param("productId", getProductById);

// router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
// router.put("/orders/user/:userId", isSignedIn, isAuthenticated, userPurchaseList);

module.exports = router;