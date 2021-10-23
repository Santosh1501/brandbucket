import { IProduct } from "../../modules/products/models/IProduct"


// Add to cart 
export const ADD_TO_CART: string = 'ADD_TO_CART'
export const ADD_TO_CART_FAILURE: string = 'ADD_TO_CART_FAILURE'

//incerment product quantity
export const INCR_PRODUCT_QTY: string = 'INCR_PRODUCT_QTY'

//decerment product quantity
export const DECR_PRODUCT_QTY: string = 'DECR_PRODUCT_QTY'

// remove/delete item from cart
export const DELETE_CART_PRODUCT: string = 'DELETE_CART_PRODUCT'



export const addToCart = (product: IProduct, qty: number, history: any) => {
    return (dispatch: any) => {
        try {
            product.qty = qty
            dispatch({ type: ADD_TO_CART, payload: { product: product } })
            history.push('/orders/cart')
        }
        catch (error) {
            dispatch({ type: ADD_TO_CART_FAILURE, payload: error })
            console.log(error);
        }
    }
}

// increment product price according to increment product
export const incrProductQty = (productId: string) => {
    return (dispatch: any) => {
        dispatch({ type: INCR_PRODUCT_QTY, payload: { productId: productId } })
    }
}

// decrement product price according to decrement product
export const decrProductQty = (productId: string) => {
    return (dispatch: any) => {
        dispatch({ type: DECR_PRODUCT_QTY, payload: { productId: productId } })
    }
}

// remove/delete item from cart
export const deleteProduct = (productId: string) => {
    return (dispatch: any) => {
        dispatch({ type: DELETE_CART_PRODUCT, payload: { productId: productId } })
    }
}
