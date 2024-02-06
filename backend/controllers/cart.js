const db = require("../database")
const { verifyToken } = require("../utilities/jwtToken")

// Function to add product in the cart
const addToCart = (req, res) => {
    // Get product details from request body to add
    const cartItem = req.body

    // Decode the token
    const creds = verifyToken(req.cookies.token)

    // Insert the cart item into database
    db.query(`INSERT INTO items (cartId, productId, productQty)
            SELECT
                cartId,
                ? as productId,
                ? as productQty
            FROM carts
            WHERE userId = ? AND isActive = ?`, [cartItem.productId, 1, creds.id, "A"],
            (err) => {
                // If error send appropriate status
                if (err) return res.status(500).json({ message: "Internal Error" })

                // Return success status with message
                return res.status(200).json({ message: "Added to cart"})
            });
}

// Function to remove product from the cart
const removeFromCart = async (req, res) => {
    // Get product details from request body to remove
    const cartItem = req.body

    // Decode the token
    const creds = verifyToken(req.cookies.token)
    
    // Remove the item from the list in database
    db.query(`DELETE FROM items WHERE productId = ?
                AND cartId IN (SELECT cartId FROM carts WHERE userId = ? AND isActive = ?)`, [cartItem.productId, creds.id, "A"],
            (err) => {
                // If error send appropriate status
                if (err) return res.status(500).json({ message: "Internal Error" })

                // Return success status with message
                return res.status(200).json({ message: "Added to cart"})
            });
}

// Function to update product in the cart in database
const updateQty = async (req, res, next) => {
    // Get product details from request body to update the quantity
    const cartItem = req.body

    // Decode the token
    const creds = verifyToken(req.cookies.token)

    // Remove the item if the quantity is less than 1
    if (cartItem.updatedQuantity < 1) return next()

    // Update the quantity in the cart in database
    db.query(`UPDATE items SET productQty = ? WHERE productId = ? AND
            cartId IN (SELECT cartId FROM carts WHERE userId = ? AND isActive = ?)`, [cartItem.updatedQuantity, cartItem.productId, creds.id, "A"],
            (err) => {
                // If error send appropriate status
                if (err) return res.status(500).json({ message: "Internal Error" })

                // Return success status with message
                return res.status(200).json({ message: "Quantity updated"})
            });
}

module.exports = { addToCart, removeFromCart, updateQty }