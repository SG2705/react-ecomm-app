const path = require('path');
const db = require("../database")
const { verifyToken } = require("../utilities/jwtToken")

const getShipData = (req, res) => {
    const creds = verifyToken(req.cookies.token)

    db.query(`SELECT * FROM ships WHERE userId = ?`, [creds.id], (err, result) => {
        if (err) return res.status(500).json({ message: "Internal Error" })

        return res.status(200).json({ message: "Payment ID created", ships: [...result] })
    });
}

const getInvoice = (req, res) => {
    const filePath = path.join(__dirname, '../public/assets/Invoice.pdf')
    res.sendFile(filePath)
}

module.exports = { getShipData, getInvoice }