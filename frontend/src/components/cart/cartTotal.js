const CartTotal = ({ cart }) => {
    // Getting the total amount from the cart
    const cartTotal = cart.reduce((acc, product) => {
        return acc += Number(product.quantity) * Number(product.price)
    }, 0)

    return (
        <div className='cart-details'>
            <p><span>Cart Total: </span><span>{Math.ceil(cartTotal * 1.18)}</span></p>
            <p><span>Tax: </span><span>{Math.ceil(cartTotal * 0.18)}</span></p>
            <p><span>Sub Total: </span><span>{cartTotal}</span></p>
        </div>
    )
}

export default CartTotal