const { Router } = require("express")
const router = Router()

// Importing authetication middlewares
const { authenticateToken } = require('../middlewares/authUser')

// Importing controllers
const { createTransaction, checkTransactionStatus, finishTransaction } = require("../controllers/payment")

// Creating routes
router.post('/create', authenticateToken, createTransaction)
router.post('/check', authenticateToken, checkTransactionStatus)
router.post('/finish', authenticateToken, finishTransaction)

module.exports = router