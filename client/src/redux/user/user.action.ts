import axios from "axios";
import { AuthUtil } from "../../utility/AuthUtil";
import { TokenUtil } from "../../utility/TokenUtil";
import * as alertActions from '../alertbox/alert.action'
import { IAddress } from "./IUser";
// Register
export const REGISTER_USER_REQUEST: string = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: string = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE: string = 'REGISTER_USER_FAILURE';


// LogIn
export const LOGIN_USER_REQUEST: string = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: string = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE: string = 'LOGIN_USER_FAILURE';


// logout Action
export const LOGOUT_USER: string = 'LOGOUT_USER';


// get user info
export const GET_USER_INFO_REQUEST: string = 'GET_USER_INFO_REQUEST';
export const GET_USER_INFO_SUCCESS: string = 'GET_USER_INFO_SUCCESS';
export const GET_USER_INFO_FAILURE: string = 'GET_USER_INFO_FAILURE';


// update address
export const UPDATE_ADDRESS_REQUEST: string = 'UPDATE_ADDRESS_REQUEST';
export const UPDATE_ADDRESS_SUCCESS: string = 'UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_FAILURE: string = 'UPDATE_ADDRESS_FAILURE';


interface IUser {
    name?: string;
    email: string;
    password: string;
}


// register user action
export const registerUser = (user: IUser, history: any) => {
    return async (dispatch: any) => {
        dispatch({ type: REGISTER_USER_REQUEST });
        try {
            let dataUrl: string = `http://127.0.0.1:5000/api/users/register`

            // let dataUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/users/register`
            let response: any = await axios.post(dataUrl, user);
            dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
            dispatch(alertActions.setAlert(response.data.msg, "success"))
            history.push(`/users/login`);
        }
        catch (error) {
            dispatch({ type: REGISTER_USER_FAILURE, error: error });
            // dispatch(alertActions.setAlert(error, "danger"))
            console.log(error);
        }


    }

}



// login user action
export const loginUser = (user: IUser, history: any) => {
    return async (dispatch: any) => {
        dispatch({ type: LOGIN_USER_REQUEST });
        try {
            let dataUrl: string = `http://127.0.0.1:5000/api/users/login`

            // let dataUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/users/login`
            let response: any = await axios.post(dataUrl, user);
            dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
            // get user info
            dispatch(getUserInfo())
            console.log(response.data)
            dispatch(alertActions.setAlert(response.data.msg, "success"))
            // localStorage.setItem("online-shopping-ts", response.data.token)
            history.push(`/`);
        }
        catch (error) {
            dispatch({ type: LOGIN_USER_FAILURE, error: error });
            // dispatch(alertActions.setAlert(error.response.data.msg, "danger"))
            console.log(error);
        }


    }

}


// logOut action creater
export const logOutUser = () => {
    return (dispatch: any) => {
        dispatch({ type: LOGOUT_USER })
    }
}


// get user info action creater
export const getUserInfo = () => {
    return async (dispatch: any) => {
        dispatch({ type: GET_USER_INFO_REQUEST });
        try {

            if (AuthUtil.isLoggedIn()) {
                let token: any = AuthUtil.getToken()
                TokenUtil.setTokenHeader(token)
                let dataUrl: string = `http://127.0.0.1:5000/api/users/`

                // let dataUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/users/login`
                let response: any = await axios.get(dataUrl);
                dispatch({ type: GET_USER_INFO_SUCCESS, payload: response.data });
            }
        }
        catch (error) {
            dispatch({ type: GET_USER_INFO_FAILURE, error: error });
            console.log(error);
        }
    }
}

// update address action creater
export const updateAddress = (address: IAddress) => {
    return async (dispatch: any) => {
        dispatch({ type: UPDATE_ADDRESS_REQUEST });
        try {

            if (AuthUtil.isLoggedIn()) {
                let token: any = AuthUtil.getToken()
                TokenUtil.setTokenHeader(token)
                let dataUrl: string = `http://127.0.0.1:5000/api/users/address`

                // let dataUrl: string = `${process.env.REACT_APP_SERVER_URL}/api/users/login`
                let response: any = await axios.post(dataUrl, address);
                dispatch({ type: UPDATE_ADDRESS_SUCCESS, payload: response.data });
                dispatch({ type: alertActions.setAlert(response.data.msg, "success") })
            }
        }
        catch (error) {
            dispatch({ type: UPDATE_ADDRESS_FAILURE, error: error });
            console.log(error);
        }
    }
}

