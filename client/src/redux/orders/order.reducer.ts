import { IProduct } from '../../modules/products/models/IProduct';
import * as orderActions from './order.action'

export interface OrderState {
    loading: boolean;
    cartItems: IProduct[];
    orders: IProduct[];
    errorMessage: string;
}

let initialState: OrderState = {
    loading: false,
    cartItems: [] as IProduct[],
    orders: [] as IProduct[],
    errorMessage: ""
}

export const reducer = (state: OrderState = initialState, action: any) => {
    let { type, payload } = action

    switch (type) {
        case orderActions.ADD_TO_CART:
            let existingProduct = state.cartItems.find((cartItem) => {
                return cartItem._id === payload.product._id
            })
            if (existingProduct) {
                return state;
            }

            return {
                ...state,
                cartItems: [...state.cartItems, payload.product]
            }

        case orderActions.ADD_TO_CART_FAILURE:
            return { ...state, errorMessage: payload }

        // incerment product qty functionality
        case orderActions.INCR_PRODUCT_QTY:
            let incrItem: IProduct[] = state.cartItems.map((cartItem) => {
                if (cartItem._id === payload.productId) {
                    return { ...cartItem, qty: cartItem.qty + 1 }
                }
                return cartItem
            })
            return { ...state, cartItems: [...incrItem] }

        // decrement product qty functionality
        case orderActions.DECR_PRODUCT_QTY:
            let decrItem: IProduct[] = state.cartItems.map((cartItem) => {
                if (cartItem._id === payload.productId) {
                    return {
                        ...cartItem,
                        qty: (cartItem.qty - 1 > 0) ? cartItem.qty - 1 : 1
                    }
                }
                return cartItem
            })
            return { ...state, cartItems: [...decrItem] }
        default: return state
    }
}