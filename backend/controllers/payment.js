const db = require("../database")
const { v4: uuid } = require("uuid")
const { verifyToken } = require("../utilities/jwtToken")

// Create new payment transaction
const createTransaction = (req, res) => {
    // Create new payment ID
    const paymentId = new Date().getTime()

    // Decode the token
    const creds = verifyToken(req.cookies.token)

    // Insert the transaction into database
    db.query(`INSERT INTO payments (cartId, sessionId, userId, paymentId, amount)
            SELECT cartId, ? as sessionId, ? as userId, ? as paymentId, ? as amount
            FROM carts WHERE userId = ? AND isActive = ?`, [creds.sessionId, creds.id, Number(`${creds.id}${paymentId}`), req.body.cartTotal, creds.id, "A"],
        (err) => {
            // If error send appropriate status
            if (err) return res.status(500).json({ message: "Internal Error" })

            // Update the shipping details into database
            db.query("UPDATE shipping SET shipAddress = ?, billAddress = ? WHERE userId = ?", [req.body.ship, req.body.bill, creds.id], (err) => {
                // If error send appropriate status
                if (err) return res.status(500).json({ message: "Internal Error" })

                // Return with success status with payment ID
                return res.status(200).json({ message: "Payment ID created", paymentId: Number(`${creds.id}${paymentId}`) })
            })
        });
}

// Get the status of transaction
const checkTransactionStatus = (req, res) => {
    // Get the transaction
    db.query(`SELECT
                py.status as paymentStatus,
                sh.id as shippingId
            FROM payments py
            JOIN shipping sh
            ON py.userId = sh.userId
            WHERE py.paymentId = ?`, [req.body.paymentId],
        (err, result) => {
            // If error send appropriate status
            if (err) return res.status(500).json({ message: "Internal Error" })
            if (!result || result.length === 0) return res.status(500).json({ message: "Internal Error" })

            // Return with success status with transaction status and data
            return res.status(200).json(...result)
        });
}

// Complete the transaction in backend
const finishTransaction = (req, res) => {
    // Decode the token
    const creds = verifyToken(req.cookies.token)

    // Create the shipping details and insert into database
    db.query(`INSERT INTO ships (userId, cartId, paymentId, shippingId) SELECT ?, cartId, ?, ? FROM carts
                WHERE userId = ? and isActive = ?`, [creds.id, req.body.paymentId, req.body.shippingId, creds.id, "A"], (err) => {
            // If error send appropriate status
            if (err) return res.status(500).json({ message: "Internal Error" })

            // // Update the payment transaction status to completed
            // db.query("UPDATE payments SET status = ? WHERE paymentId = ?", ["A", req.body.paymentId], (err) => {
            //     // If error send appropriate status
            //     if (err) return res.status(500).json({ message: "Internal Error" })
            // })

            // Update the active cart to inactive into database
            db.query("UPDATE carts SET isActive = ? WHERE userId = ? AND isActive = ?", ["N", creds.id, "A"], (err) => {
                // If error send appropriate status
                if (err) return res.status(500).json({ message: "Internal Error" })

                // Create new cart ID
                const cartId = uuid()

                // Insert new cart for the current user in database
                db.query("INSERT INTO carts (sessionId, cartId, userId) VALUES (?, ?, ?)", [creds.sessionId, cartId, creds.id], (err) => {
                    // If error send appropriate status
                    if (err) return res.status(500).json({ message: "Internal Error" })

                    // Return with success status with transaction status
                    return res.status(200).json({ message: "Payment completed" })
                })
            })
        });
}

module.exports = { createTransaction, checkTransactionStatus, finishTransaction }