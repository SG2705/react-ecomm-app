import './App.css';

// Importing components
import Products from './components/products';
import Cart from './components/cart';
import Search from './components/search';
import Header from './components/header';

// Importing the context
import { CartList } from './context/cartContext';
import { useContext } from 'react';


function App() {
    const { isLoggedIn } = useContext(CartList)

    return (
        <div className="App">
            {/* Render header */}
            <Header />

            {/* Render if logged in */}
            {isLoggedIn ? (
                <>
                    <Search />
                    <div className='titles'>
                        <h4 className='products'>Products</h4>
                        <h4 className='cart'>Cart Details</h4>
                    </div>
                    
                    {/* Render product and cart list */}
                    <div className='app-box'>
                        <Products />
                        <Cart />
                    </div>
                </>
            ) : (<div>Login First!</div>)}
        </div>
    );
}

export default App;
