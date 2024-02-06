import { useContext, useEffect } from 'react'
import { CartList } from '../context/cartContext'

const Products = () => {
    const { isLoggedIn, searchTerm, state: { products, cart }, dispatch, isCheckingOut } = useContext(CartList)

    // Function to handle add to cart functionality after updating the database
    const handleAddToCart = async (product) => {
        const res = await fetch('http://localhost:5000/cart/add', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: product.id }),
                })
            if (res.status === 200) {
                dispatch({
                    type: "ADD_TO_CARD",
                    data: {
                        id: product.id,
                        title: product.title,
                        price: product.price,
                        thumbnail: product.thumbnail,
                        quantity: 1
                    }
                })
            } else {throw Error("Not able to perform action")}
    }

    // Function to handle remove from cart functionality after removing from the database
    const handleRemoveFromCart = async (product) => {
        const res = await fetch('http://localhost:5000/cart/remove', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: product.id }),
                })
            if (res.status === 200) {
                dispatch({
                    type: "REMOVE_FROM_CART",
                    id: product.id
                })
            } else {throw Error("Not able to perform action")}
    }

    // loading the lsit of products based on search and current cart items after the login
    useEffect(() => {
        fetch(`http://localhost:5000/products?search=${searchTerm}`, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            dispatch({
                type: "ADD_PRODUCTS_TO_LIST",
                products: data.products,
                cart: data.cart
            })
        })
    }, [searchTerm, isLoggedIn, dispatch])

    return (
        <div className='product-list'>
            {/* Render the products */}
            {products.length > 0 ? (products.map((product) => {
                return <div key={product.id} className={isCheckingOut ? "product-card disabled": "product-card"}>
                    <img src={`http://localhost:5000/assets/products/${product.thumbnail}.jpg`} alt={product.title} />
                    <div className='product-details'>
                        <span>{product.title}</span>
                        <span>Rs. {product.price}</span>
                    </div>
                    {
                        cart.some(_product => _product.id === product.id) ? (
                            <button
                                type='button'
                                disabled={isCheckingOut}
                                className={isCheckingOut ? "disabled": ""}
                                onClick={() => handleRemoveFromCart(product)}
                            >
                                Remove from cart
                            </button>
                        ) : (
                            <button
                                type='button'
                                disabled={isCheckingOut}
                                className={isCheckingOut ? "disabled": ""}
                                onClick={() => handleAddToCart(product)}
                            >
                                Add to cart
                            </button>
                        )
                    }
                </div>
            })) : (<div>No item available!</div>)}
        </div>
    )
}

export default Products