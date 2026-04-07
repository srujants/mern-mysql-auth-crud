const express = require('express');
const router = express.Router();


const authController = require('../controllers/authController');


console.log("Auth routes loaded ✅");


router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authController.resetPassword);
module.exports = router;