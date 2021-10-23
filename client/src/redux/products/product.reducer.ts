import { IProduct } from '../../modules/products/models/IProduct';
import * as productActions from './product.action'

export interface ProductState {
    loading: boolean
    product: IProduct
    products: IProduct[]
    errorMessage: string
}

let initialState: ProductState = {
    loading: false,
    product: {} as IProduct,
    products: [] as IProduct[],
    errorMessage: ""
}

export const reducer = (state: ProductState = initialState, action: any) => {

    let { type, payload } = action

    switch (type) {
        case productActions.UPLOAD_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case productActions.UPLOAD_PRODUCT_SUCCESS:
            return { ...state, loading: false }
        case productActions.UPLOAD_PRODUCT_FAILURE:
            return { ...state, loading: false, errorMessage: payload }


        // men's products
        case productActions.GET_MEN_PRODUCTS_REQUEST:
            return { ...state, loading: true }
        case productActions.GET_MEN_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: payload }
        case productActions.GET_MEN_PRODUCTS_FAILURE:
            return { ...state, loading: false, errorMessage: payload }


        // women's products
        case productActions.GET_WOMEN_PRODUCTS_REQUEST:
            return { ...state, loading: true }
        case productActions.GET_WOMEN_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: payload }
        case productActions.GET_WOMEN_PRODUCTS_FAILURE:
            return { ...state, loading: false, errorMessage: payload }


        // kid's products
        case productActions.GET_KIDS_PRODUCTS_REQUEST:
            return { ...state, loading: true }
        case productActions.GET_KIDS_PRODUCTS_SUCCESS:
            return { ...state, loading: false, products: payload }
        case productActions.GET_KIDS_PRODUCTS_FAILURE:
            return { ...state, loading: false, errorMessage: payload }


        // single products
        case productActions.GET_SINGLE_PRODUCT_REQUEST:
            return { ...state, loading: true }
        case productActions.GET_SINGLE_PRODUCT_SUCCESS:
            return { ...state, loading: false, product: payload }
        case productActions.GET_SINGLE_PRODUCT_FAILURE:
            return { ...state, loading: false, errorMessage: payload }

        default: return state
    }

}