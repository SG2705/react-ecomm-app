const { Router } = require("express")
const router = Router()

// Importing authetication middlewares
const { authenticateToken } = require('../middlewares/authUser')

// Importing controllers
const { getShipData, getInvoice} = require("../controllers/shipAndInvoices")

// Creating routes
router.get('/ship', authenticateToken, getShipData)
router.get('/invoice', authenticateToken, getInvoice)

module.exports = router