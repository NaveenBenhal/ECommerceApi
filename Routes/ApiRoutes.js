const express = require('express');
const router = express.Router();

const AuthApi = require('./AuthApi'); // ✅ Ensure this path is correct
const ProductApi = require('./ProductApi'); // ✅ Ensure this path is correct

router.use('/Auth', AuthApi); // ✅ Ensure AuthApi is a function (middleware)
router.use('/Product', ProductApi); // ✅ Ensure AuthApi is a function (middleware)

module.exports = router; // ✅ Export the router
