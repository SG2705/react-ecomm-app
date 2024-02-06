const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express()

// Importing all the routes
const userRoutes = require("./routes/user")
const productRoutes = require("./routes/product")
const cartRoutes = require("./routes/cart")
const paymentRoutes = require("./routes/payment")
const shipAndInvoiceRoutes = require("./routes/shipAndInvoices")

// Common middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))
app.use(express.static('public'))

// Defining port to use
const port = process.env.PORT || 5000

// Defining routes
app.get('/', (_, res) => { res.send('This is backend server') })
app.use('/user', userRoutes)
app.use('/products', productRoutes)
app.use('/cart', cartRoutes)
app.use('/payment', paymentRoutes)
app.use('/docs', shipAndInvoiceRoutes)

// Listening to port
app.listen(port, ["192.168.1.8", "127.0.0.1"], () => { console.log(`Server started on port: ${port}`) })