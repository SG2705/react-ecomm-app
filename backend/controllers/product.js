const db = require("../database")
const { verifyToken } = require("../utilities/jwtToken")

// Function to get the list of all products and cart items of user
const productList = (req, res) => {
    // Get the search parameter form query url
    const searchParameter = req.query.search

    // Decode the token
    const creds = verifyToken(req.cookies.token)

    // Get the list of products from database
    db.query("SELECT * FROM products", (err, products) => {
        // If error send appropriate status
        if (err) return res.status(500).json({ msg: "Internal Error" })

        // Filter product based on the search parameter
        const filteredProducts = searchParameter ? (products.filter(product => {
            return product.title.toLowerCase().indexOf(searchParameter.toLowerCase()) >= 0
        })) : (products)

        // Get the cart items
        db.query(`SELECT
                    ps.id as id,
                    ps.title as title,
                    ps.price as price,
                    ps.thumbnail as thumbnail,
                    ci.productQty as quantity
                FROM carts ca
                JOIN items ci
                ON ca.cartId = ci.cartId
                JOIN products ps
                ON ci.productId = ps.id
                WHERE ca.userId = ? AND ca.isActive = ?`, [creds.id, 'A'],
                (err, cartItems) => {
                    // If error send appropriate status
                    if (err) return res.status(500).json({ msg: "Internal Error" })

                    // Return success status and data in JSON format
                    return res.status(200).json({
                        count: filteredProducts.length,
                        search: searchParameter,
                        products: filteredProducts,
                        cart: cartItems
                    })
            });
    });
}

module.exports = { productList }