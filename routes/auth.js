const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { signout, signup } = require('../controllers/auth');

router.post("/signup", [
    check("username", "username should be atleast 3 characters long").isLength({ min: 3 }),
    check("email", "email is required").isEmail(),
    check("password", "password should be atleast 4 characters long").isLength({ min: 4 })
], signup);
router.get("/signout", signout);

module.exports = router;