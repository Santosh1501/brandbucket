import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as userReducer from '../../../../redux/user/user.reducer'
import * as orderReducer from '../../../../redux/orders/order.reducer'
import { CartUtil } from '../../../../utility/CartUtil'
interface IProps { }
interface IState { }
const CheckOut: React.FC<IProps> = () => {

    // getting data of user from redux store
    let userState: userReducer.userState = useSelector((
        state: { user: userReducer.userState }
    ) => {
        return state.user
    })

    // getting data of orders from redux store
    let orderState: orderReducer.OrderState = useSelector((
        state: { orders: orderReducer.OrderState }
    ) => {
        return state.orders
    })

    let { user } = userState
    let { cartItems } = orderState
    return (
        <>
            <div>
                <h2 className="tempting-azure-gradient p-3 text-center" style={{ "fontWeight": "bold" }}>Checkout Your Items</h2>
            </div>
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-7">
                            <div className="card">
                                <div className="card-header  bg-default p-2">
                                    <div className="row">
                                        <div className="col">
                                            <h3 className="text-center text-white">Your Billing Address</h3>
                                        </div>
                                        <div className="col">
                                            <Link to='/users/profile' className="btn btn-amber btn-sm">Update Address</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body bg-light">
                                    {
                                        user && user.address &&
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item">Mobile: {userState.user.address?.mobile}</li>
                                            <li className="list-group-item">Flat: {userState.user.address?.flat}</li>
                                            <li className="list-group-item">Street: {userState.user.address?.street}</li>
                                            <li className="list-group-item">Landmark: {userState.user.address?.landmark}</li>
                                            <li className="list-group-item">City: {userState.user.address?.city}</li>
                                            <li className="list-group-item">Area Pincode: {userState.user.address?.pin}</li>
                                            <li className="list-group-item">State: {userState.user.address?.state}</li>
                                            <li className="list-group-item">Country: {userState.user.address?.country}</li>
                                        </ul>
                                    }
                                </div>
                            </div>
                            <div className="card my-3">
                                <div className="card-header bg-default">
                                    <h3 className="text-white">Payment Method</h3>
                                </div>
                                <div className="card-body">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" />
                                        <label className="form-check-label">
                                            Credit Card
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" disabled />
                                        <label className="form-check-label">
                                            Cash On Delivery
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="card">
                                <div className="card-header bg-default text-white">
                                    <h3 className="text-center"> Total Price</h3>
                                </div>
                                <div className="card-body bg-light">
                                    <div className="row">

                                        <ul className="list-group my-2">
                                            {
                                                cartItems.length > 0 &&
                                                cartItems.map((cartItem) => {
                                                    return (
                                                        <li className="list-group-item" key={cartItem._id}>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <img src={cartItem.image} className="img-fluid" height="50" width="80" alt="" />
                                                                </div>
                                                                <div className="col-md-8">
                                                                    {cartItem.name} <br />
                                                                    {cartItem.brand} <br />
                                                                    <b className="text-danger">&#8377;{cartItem.price.toFixed(2)}</b>
                                                                </div>
                                                            </div>
                                                        </li>
                                                    )
                                                })
                                            }
                                        </ul>
                                        <ul className="list-group-flush">
                                            <li className="list-group-item">
                                                Product Price:&nbsp;&nbsp;<b>&#8377; {CartUtil.calcTotal(cartItems)}</b>
                                            </li>
                                            <li className="list-group-item">
                                                Tax Applied:&nbsp;&nbsp;<b>&#8377; {CartUtil.calcTax(cartItems)}</b>
                                            </li>
                                            <li className="list-group-item">
                                                Grand Total:<em className='text-danger h5'>&nbsp;&nbsp;<b>&#8377; {Math.round(CartUtil.calcGrandTotal(cartItems))}</b></em>
                                            </li>
                                        </ul>
                                    </div>
                                    <button className='btn btn-amber btn-md'>Pay Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CheckOut
