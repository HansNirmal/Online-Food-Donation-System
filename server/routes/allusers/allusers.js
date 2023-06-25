const express = require('express')
const router = express.Router()
const alluserControllers = require('../../controller/users/allusers')

const {
  registerUser,
  loginUser,
  getMe,
} = alluserControllers
// const { protect } = require('../middleware/authMiddleware')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', getMe)

module.exports = router
