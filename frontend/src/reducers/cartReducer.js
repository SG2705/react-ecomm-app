const CartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_PRODUCTS_TO_LIST":
            return {...state, products: action.products, cart: action.cart};
        case "ADD_TO_CARD":
            return {...state, cart: [ ...state.cart, { ...action.data }]}
        case "REMOVE_FROM_CART":
            return {...state, cart: state.cart.filter(product => product.id !== action.id)}
        case "UPDATE_PRODUCT_QTY":
            return {...state, cart: state.cart.filter(product => product.id === action.data.id ? product.quantity = action.data.updatedQuantity : product.quantity )}
        case "CLEAR_CART":
            return {...state, cart: []};
        default:
            return state;
    }
}

export default CartReducer