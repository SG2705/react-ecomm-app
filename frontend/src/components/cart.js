import { useContext } from 'react'
import { CartList } from '../context/cartContext'

// Cart child components
import Payment from './cart/payment'
import CartTotal from './cart/cartTotal'
import Downloads from './cart/downloads'

const Cart = () => {
    const {state: { cart }, dispatch, isCheckingOut} = useContext(CartList)

    // Function to update the product quantity both on frontend and in the database
    const updateQty = async (data) => {
        const res = await fetch('http://localhost:5000/cart/updateQty', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ productId: data.id, updatedQuantity: data.updatedQuantity }),
                })
            if (res.status === 200) {
                dispatch({
                    type: "UPDATE_PRODUCT_QTY",
                    data: {
                        id: data.id,
                        updatedQuantity: data.updatedQuantity
                    }
                })
            } else { throw Error("Not able to perform action") }
    }

    return (
        <div className='cart-actions'>
            {/* Render the cart items */}
            <div className='cart'>
                {cart.map(product => {
                    return <div key={product.id} className={isCheckingOut ? "product-card disabled": "product-card"}>
                        <img src={`http://localhost:5000/assets/products/${product.thumbnail}.jpg`} alt={product.title} />
                        <div className='product-details'>
                            <span>{product.title}</span>
                            <span>Rs. {product.price}</span>
                            <div>
                                <button
                                    type='button'
                                    disabled={isCheckingOut}
                                    onClick={() => updateQty({ id: product.id, updatedQuantity: product.quantity - 1 })}
                                >
                                    -
                                </button>
                                <span> {product.quantity} </span>
                                <button
                                    type='button'
                                    disabled={isCheckingOut}
                                    onClick={() => updateQty({ id: product.id, updatedQuantity: product.quantity + 1 })}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                })}
            </div>

            {/* Render the cart total and payment variables */}
            {
                cart.length > 0 ? (
                    <>
                        <CartTotal cart={cart} />
                        <Payment cart={cart} />
                    </>
                ) : (<div className='cart-details empty'>Cart is empty</div>)
            }

            {/* Render the Invoice and Track buttons */}
            <Downloads />
        </div>
    )
}

export default Cart