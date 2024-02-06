const { Router } = require("express")
const router = Router()

// Importing authetication middlewares
const { authenticateToken, verifyAlreadySignIn, checkIsLoggedIn } = require('../middlewares/authUser')

// Importing controllers
const { handleSignIn, handleSignOut } = require("../controllers/user")

// Creating routes
router.get('/check', checkIsLoggedIn)
router.get('/login', verifyAlreadySignIn, handleSignIn)
router.get('/logout', authenticateToken, handleSignOut)

module.exports = router