const { Router } = require("express")
const router = Router()

// Importing authetication middlewares
const { authenticateToken } = require('../middlewares/authUser')

// Importing controllers
const { addToCart, removeFromCart, updateQty } = require("../controllers/cart")

// Creating routes
router.post('/add', authenticateToken, addToCart)
router.post('/remove', authenticateToken, removeFromCart)
router.post('/updateQty', authenticateToken, updateQty, removeFromCart)

module.exports = router