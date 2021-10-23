import axios from "axios"
import { IProduct } from "../../modules/products/models/IProduct"
import { AuthUtil } from "../../utility/AuthUtil"
import { TokenUtil } from "../../utility/TokenUtil"
import * as alertActions from '../alertbox/alert.action'

export const UPLOAD_PRODUCT_REQUEST: string = 'UPLOAD_PRODUCT_REQUEST'
export const UPLOAD_PRODUCT_SUCCESS: string = 'UPLOAD_PRODUCT_SUCCESS'
export const UPLOAD_PRODUCT_FAILURE: string = 'UPLOAD_PRODUCT_FAILURE'


// men's products action
export const GET_MEN_PRODUCTS_REQUEST: string = 'GET_MEN_PRODUCTS_REQUEST'
export const GET_MEN_PRODUCTS_SUCCESS: string = 'GET_MEN_PRODUCTS_SUCCESS'
export const GET_MEN_PRODUCTS_FAILURE: string = 'GET_MEN_PRODUCTS_FAILURE'


// women's products action
export const GET_WOMEN_PRODUCTS_REQUEST: string = 'GET_WOMEN_PRODUCTS_REQUEST'
export const GET_WOMEN_PRODUCTS_SUCCESS: string = 'GET_WOMEN_PRODUCTS_SUCCESS'
export const GET_WOMEN_PRODUCTS_FAILURE: string = 'GET_WOMEN_PRODUCTS_FAILURE'

// kid's products action
export const GET_KIDS_PRODUCTS_REQUEST: string = 'GET_KIDS_PRODUCTS_REQUEST'
export const GET_KIDS_PRODUCTS_SUCCESS: string = 'GET_KIDS_PRODUCTS_SUCCESS'
export const GET_KIDS_PRODUCTS_FAILURE: string = 'GET_KIDS_PRODUCTS_FAILURE'

// kid's products action
export const GET_SINGLE_PRODUCT_REQUEST: string = 'GET_SINGLE_PRODUCT_REQUEST'
export const GET_SINGLE_PRODUCT_SUCCESS: string = 'GET_SINGLE_PRODUCT_SUCCESS'
export const GET_SINGLE_PRODUCT_FAILURE: string = 'GET_SINGLE_PRODUCT_FAILURE'

// upload a product
export const uploadProduct = (product: IProduct, history: any) => {
    return async (dispatch: any) => {
        dispatch({ type: UPLOAD_PRODUCT_REQUEST });
        try {

            if (AuthUtil.isLoggedIn()) {
                let token: any = AuthUtil.getToken()
                TokenUtil.setTokenHeader(token)
                let dataUrl: string = `http://127.0.0.1:5000/api/products/upload`

                // let dataUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/users/login`
                let response: any = await axios.post(dataUrl, product);
                dispatch({ type: UPLOAD_PRODUCT_SUCCESS, payload: response.data });
                dispatch(alertActions.setAlert(response.data.message, "success"))
                history.push('/')
            }
        }
        catch (error) {
            dispatch({ type: UPLOAD_PRODUCT_FAILURE, error: error });
            console.log(error);
        }


    }
}

// men's products
export const getMenProducts = () => {
    return async (dispatch: any) => {
        dispatch({ type: GET_MEN_PRODUCTS_REQUEST })

        try {
            let dataURL: string = 'http://127.0.0.1:5000/api/products/men'
            let response = await axios.get(dataURL)
            dispatch({ type: GET_MEN_PRODUCTS_SUCCESS, payload: response.data })
        }
        catch (error) {
            dispatch({ type: GET_MEN_PRODUCTS_FAILURE, error: error });
            console.log(error);
        }
    }
}

// women's products
export const getWomenProducts = () => {
    return async (dispatch: any) => {
        dispatch({ type: GET_WOMEN_PRODUCTS_REQUEST })

        try {
            let dataURL: string = `http://127.0.0.1:5000/api/products/women`
            let response = await axios.get(dataURL)
            dispatch({ type: GET_WOMEN_PRODUCTS_SUCCESS, payload: response.data })
        }
        catch (error) {
            dispatch({ type: GET_WOMEN_PRODUCTS_FAILURE, error: error });
            console.log(error);
        }
    }
}

// kid's products
export const getKidsProducts = () => {
    return async (dispatch: any) => {
        dispatch({ type: GET_KIDS_PRODUCTS_REQUEST })

        try {
            let dataURL: string = `http://127.0.0.1:5000/api/products/kids`
            let response = await axios.get(dataURL)
            dispatch({ type: GET_KIDS_PRODUCTS_SUCCESS, payload: response.data })
        }
        catch (error) {
            dispatch({ type: GET_KIDS_PRODUCTS_FAILURE, error: error });
            console.log(error);
        }
    }
}


// get a single product 

export const getSingleProduct = (productId: string) => {
    return async (dispatch: any) => {
        dispatch({ type: GET_SINGLE_PRODUCT_REQUEST })

        try {
            let dataURL: string = `http://127.0.0.1:5000/api/products/${productId}`
            let response = await axios.get(dataURL)
            dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: response.data })
        }
        catch (error) {
            dispatch({ type: GET_SINGLE_PRODUCT_FAILURE, error: error });
            console.log(error);
        }
    }
}