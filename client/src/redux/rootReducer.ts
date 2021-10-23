import { combineReducers } from 'redux'
import * as userReducer from './user/user.reducer'
import * as alertReducer from './alertbox/alert.reducer'
import * as productReducer from './products/product.reducer'
import * as orderReducer from './orders/order.reducer'

const rootReducer = combineReducers({
    // all reducers
    user: userReducer.reducer,
    alerts: alertReducer.reducer,
    products: productReducer.reducer,
    orders: orderReducer.reducer
})

export default rootReducer