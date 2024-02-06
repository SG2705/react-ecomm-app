const db = require("../database")
const { verifyToken } = require("../utilities/jwtToken")

// Function to authenticate token if user token
const authenticateToken = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token

    // Check if token exists or not
    if (!token) return res.status(302).json({ redirectTo: "/", message: "Not allowed"})

    // Decode the token
    const creds = verifyToken(token)

    // Check if user details and session exists or not in database
    db.query("SELECT * FROM sessions WHERE userId = ? AND sessionid = ?", [creds.id, creds.sessionId],(err, result) => {
        // If error send appropriate status
        if (err) return res.status(302).json({ redirectTo: "/", message: "Not allowed"})
        if (result.length === 0 || result[0].loginStatus !== 1) return res.status(302).json({ redirectTo: "/", message: "Not allowed"})
        
        // Move forward if verified
        return next()
    });
}

// Function to authenticate if user already logged in while sending the login request again
const verifyAlreadySignIn = (req, res, next) => {
    // Get the token from cookies
    const token = req.cookies.token

    // Check if token exists or not, if not then move to login
    if (!token) return next()

    // Decode the token
    const creds = verifyToken(token)

    // Check if user details and session exists or not in database
    db.query("SELECT * FROM sessions WHERE userId = ? AND sessionid = ?", [creds.id, creds.sessionId], (err, result) => {
        // If error send appropriate status
        if (err) return res.status(302).json({ redirectTo: "/", message: "Not allowed"})
        if (result.length === 0 || result[0].loginStatus !== 1) return next()

        // Return success status and redirect
        return res.status(200).json({ redirectTo: "/products", message: "Success"})
    });
}

// Function to authenticate if user already logged in
const checkIsLoggedIn = (req, res) => {
    // Get the token from cookies
    const token = req.cookies.token

    // Check if token exists or not
    if (!token) return res.status(302).send()

    // Decode the token
    const creds = verifyToken(token)

    // Check if user details and session exists or not in database
    db.query("SELECT * FROM sessions WHERE userId = ? AND sessionid = ?", [creds.id, creds.sessionId], (err, result) => {
        // If error send appropriate status
        if (err) return res.status(302).send()
        if (result.length === 0 || result[0].loginStatus !== 1) return res.status(302).send()

        // Return success status and redirect
        return res.status(200).send()
    });
}

module.exports = { authenticateToken, verifyAlreadySignIn, checkIsLoggedIn }