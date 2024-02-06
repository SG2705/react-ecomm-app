const { Router } = require("express")
const router = Router()

// Importing authetication middlewares
const { authenticateToken } = require('../middlewares/authUser')

// Importing controllers
const { productList } = require("../controllers/product")

// Creating routes
router.get('/', authenticateToken, productList)

module.exports = router