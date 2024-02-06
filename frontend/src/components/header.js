import { useContext } from 'react'
import { CartList } from '../context/cartContext'

const Header = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(CartList)

    // Function to handle login and logout of user
    const handleClick = async () => {
        const url = `http://localhost:5000/user/${isLoggedIn ? "logout" : "login"}`
        const res = await fetch(url, { credentials: 'include' })
        if (res.status === 200) setIsLoggedIn(isLoggedIn ? false : true)
    }

    return (
        <header>
            <button type='button' onClick={handleClick}>{isLoggedIn ? "Logout" : "Login"}</button>
        </header>
    )
}

export default Header