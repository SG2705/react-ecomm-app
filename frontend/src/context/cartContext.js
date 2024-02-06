import { createContext, useEffect, useReducer, useState } from 'react'

// Helper function to check if user is already logged in or not
import checkLogin from '../helpers/loginStatus'

// Reducer function to wrap all the cart logic inside a single function
import CartReducer from '../reducers/cartReducer'

export const CartList = createContext(null)

const CartContext = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [isCheckingOut, setIsCheckingOut] = useState(false)

    const [state, dispatch] = useReducer(CartReducer, {
        products: [],
        cart: []
    })

    useEffect(() => {
        // Checking if the user is already logged in or not
        checkLogin(setIsLoggedIn)
    }, [])

    return (
        <CartList.Provider value={{ isLoggedIn, setIsLoggedIn, searchTerm, setSearchTerm, state, dispatch, isCheckingOut, setIsCheckingOut }}>
            {children}
        </CartList.Provider>
    )
}

export default CartContext