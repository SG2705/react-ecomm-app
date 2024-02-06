const jwt = require("jsonwebtoken")

// Secret key for signing JWT
const SECRET_KEY = "abcdefABCDEF123456"

// Function to crete and sign token
const createToken = (sessionId) => {
    const payload = {
        id: "123",  // Default user
        sessionId,
    }
    return { token : jwt.sign(payload, SECRET_KEY), userId : payload.id}
}

// Function to verify token
const verifyToken = (token) => {
    return jwt.verify(token, SECRET_KEY)
}

module.exports = { createToken, verifyToken }