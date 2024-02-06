const db = require("../database")
const { v4: uuid } = require("uuid")
const { createToken, verifyToken } = require("../utilities/jwtToken")

// Function to manage the Sign in
const handleSignIn = (req, res) => {
    // Create unique session ID
    const sessionId = uuid()

    // Create the siged token
    const { token, userId } = createToken(sessionId)

    // Set the previous sessions expired in database
    db.query("UPDATE sessions SET isExpired = 'Y' WHERE ?", { userId }, (err) => {
        // If error send appropriate status
        if (err) return res.status(500).json({ message: "Internal Error" })

        // Insert new session in database
        db.query("INSERT INTO sessions SET ?", { sessionId, userId, loginStatus: 1 }, (err) => {
            // If error send appropriate status
            if (err) return res.status(500).json({ message: "Internal Error" })

            // Create unique cart ID
            const cartId = uuid()

            // Insert new cart if an active cart does not exists
            db.query(`INSERT INTO carts (sessionId, cartId, userId)
                    SELECT ?, ?, ? WHERE NOT EXISTS (SELECT * FROM carts WHERE userId = ? AND isActive = ?)`, [sessionId, cartId, userId, userId, "A"], (err) => {
                // If error send appropriate status
                if (err) return res.status(500).json({ message: "Internal Error" })

                // Return success status with cookie having the token
                return res.cookie('token', token, {
                    httpOnly: true,
                    sameSite: "none",
                    secure: true,
                    domain: req.hostname,
                    path: '/',
                    withCredentials: true,
                    maxAge: 2 * 60 * 60 * 1000
                }).status(200).json({ message: "Success" })
                // .redirect("/products")
            });
        });
    });
}

// Function to manage the Sign Out
const handleSignOut = (req, res) => {
    // Create unique session ID
    const token = req.cookies.token

    // Create the siged token
    if (!token) return res.status(405).json({ message: "Not allowed" })

    // Decode the token
    const creds = verifyToken(token)

    // Update the current session in database
    db.query("UPDATE sessions SET loginStatus = ?, isExpired = ? WHERE userId = ? AND sessionid = ?", [0, 'Y', creds.id, creds.sessionId], (err) => {
        // If error send appropriate status
        if (err) return res.status(500).json({ msg: "Internal Error" })

        // Return success status with cookie having the blank token and quick expiry date
        return res.cookie('token', '', {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            domain: req.hostname,
            path: '/',
            withCredentials: true,
            maxAge: 0
        }).status(200).json({ message: "Success" })
        // .redirect("/products")
    });
}

module.exports = { handleSignIn, handleSignOut }