const express = require('express');
const router = express.Router();
const {signupUser, loginUser, getUser} = require('../controller/userController')
const {protect} = require('../middleware/authMiddleware')

router.post('/', signupUser)
router.post('/login', loginUser)
router.get('/me', protect, getUser)

module.exports = router