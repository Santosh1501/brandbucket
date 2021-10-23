import { IUser } from './IUser'
import * as userAction from './user.action'

export interface userState {
    loading: boolean;
    user: IUser;
    isAuthenticated: boolean;
    errorMessage: string;
    token: string;

}
let initialState: userState = {
    loading: false,
    user: {} as IUser,
    isAuthenticated: false,
    errorMessage: "",
    token: ""

}
export const reducer = (state: userState = initialState, action: any) => {
    switch (action.type) {
        case userAction.REGISTER_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userAction.REGISTER_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                // user:action.payload,
                // isAuthenticated:true,

            }
        case userAction.REGISTER_USER_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,

            }


        case userAction.LOGIN_USER_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userAction.LOGIN_USER_SUCCESS:
            // if (process.env.REACT_FEATURE_KEY !== undefined) {
            //     localStorage.setItem(process.env.REACT_FEATURE_KEY, action.payload.token)
            // }

            localStorage.setItem("online-shopping-ts", action.payload.token)
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                token: action.payload.token

            }
        case userAction.LOGIN_USER_FAILURE:
            // if (process.env.REACT_FEATURE_KEY !== undefined) {
            //     localStorage.removeItem(process.env.REACT_FEATURE_KEY)
            // }

            localStorage.setItem("online-shopping-ts", action.payload.token)
            return {
                ...state,
                loading: false,
                errorMessage: action.payload,
                isAuthenticated: false,
                token: ''

            }

        // logout 

        case userAction.LOGOUT_USER:
            localStorage.removeItem('online-shopping-ts')
            return {
                ...state,
                loading: false,
                token: '',
                isAuthenticated: false
            }


        // get user info

        case userAction.GET_USER_INFO_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case userAction.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                isAuthenticated: true
            }

        case userAction.GET_USER_INFO_FAILURE:
            return {
                ...state,
                loading: false,
                errorMessage: action.payload
            }

        // update address
        case userAction.UPDATE_ADDRESS_REQUEST:
            return { ...state, loading: true }
        case userAction.UPDATE_ADDRESS_SUCCESS:
            return { ...state, loading: false }
        case userAction.UPDATE_ADDRESS_FAILURE:
            return { ...state, loading: false, errorMessage: action.payload }
        default: return state;
    }


}
