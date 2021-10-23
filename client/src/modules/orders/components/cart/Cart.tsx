import React from 'react'
import * as orderActions from '../../../../redux/orders/order.action'
import * as orderReducer from '../../../../redux/orders/order.reducer'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { CartUtil } from '../../../../utility/CartUtil'



interface IProps { }

const Cart: React.FC<IProps> = () => {

    let dispatch = useDispatch()

    let orderState: orderReducer.OrderState = useSelector((
        state: { orders: orderReducer.OrderState }
    ) => {
        return state.orders
    })

    // increment qty function
    let incrQty = (productId: any) => {
        dispatch(orderActions.incrProductQty(productId))
    }

    // decrement product function
    let decrQty = (productId: any) => {
        dispatch(orderActions.decrProductQty(productId))
    }
    let { loading, cartItems } = orderState
    console.log(cartItems)



    return (
        <>
            <div>
                <h2 className="tempting-azure-gradient p-3 text-center" style={{ "fontWeight": "bold" }}>Your Shopping Items</h2>
            </div>

            {/* <pre>{JSON.stringify(cartItems)}</pre> */}

            <section className='container mt-3'>
                {
                    cartItems.length > 0 ?
                        <>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className='text-default text-center' style={{ "fontWeight": "bold" }}>Added Items</h3>
                                        </div>
                                        <div className="card-body">
                                            <table className="table text-center">
                                                <thead>
                                                    <tr>
                                                        <th style={{ "fontWeight": "bold" }}>Slno.</th>
                                                        <th style={{ "fontWeight": "bold" }}>image</th>
                                                        <th style={{ "fontWeight": "bold" }}>Name</th>
                                                        <th style={{ "fontWeight": "bold" }}>Price<mark>(per pieces)</mark></th>
                                                        <th style={{ "fontWeight": "bold" }}>Qty</th>
                                                        <th style={{ "fontWeight": "bold" }}>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        cartItems.length > 0 &&
                                                        <>
                                                            {
                                                                cartItems.map((cartItem, index) => {
                                                                    return (
                                                                        <tr key={cartItem._id}>
                                                                            <td>
                                                                                {index + 1}
                                                                            </td>
                                                                            <td>
                                                                                <img src={cartItem.image} className="img-fluid" width="40" height="40" alt="" />
                                                                            </td>
                                                                            <td>{cartItem.name}</td>
                                                                            <td>&#8377;{cartItem.price.toFixed(2)}</td>
                                                                            <td> <i className="fa fa-minus-circle mx-1" onClick={decrQty.bind(this, cartItem._id)}></i>
                                                                                {cartItem.qty}
                                                                                <i className="fa fa-plus-circle mx-1" onClick={incrQty.bind(this, cartItem._id)}></i>
                                                                            </td>
                                                                            <td>
                                                                                <button className="btn btn-danger btn-sm">Remove Item</button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </>
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className='text-default text-center' style={{ "fontWeight": "bold" }}>Your Total Price</h3>
                                        </div>
                                        <div className="card-body">
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
                                            <Link to='/orders/checkout' className="btn btn-success btn-md mt-4">Check Out</Link>
                                            <Link to='/' className="btn btn-cyan btn-md mt-4">Shop More</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </> :
                        <>
                            <div className="text-center">
                                <p className="h2">Your Cart is Empty</p>
                                <Link to='/' className='btn btn-cyan'>Continue Your Shopping..</Link>
                            </div>
                        </>
                }
            </section>
        </>
    )
}

export default Cart
