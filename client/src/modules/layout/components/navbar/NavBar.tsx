import React from 'react'
import { NavLink } from 'react-router-dom'
import logoimg from '../../../../assets/images/logoimg.svg'
import { AuthUtil } from '../../../../utility/AuthUtil'
import * as userAction from '../../../../redux/user/user.action'
import * as userReducer from '../../../../redux/user/user.reducer'
import { useDispatch, useSelector } from 'react-redux'
import * as orderReducer from '../../../../redux/orders/order.reducer'
interface IProps { }

const NavBar: React.FC<IProps> = () => {

    let dispatch = useDispatch()

    // showing  how many products are added to Cart 
    let orderState: orderReducer.OrderState = useSelector(
        (state: { orders: orderReducer.OrderState }) => {
            return state.orders
        })

    let userState: userReducer.userState = useSelector((
        state: { user: userReducer.userState }
    ) => {
        return state.user
    })


    let logOut = () => {
        dispatch(userAction.logOutUser())
    }

    let { isAuthenticated, user } = userState
    return (
        <>
            <nav className="navbar navbar-expand-sm winter-neva-gradient responsive-navbar-nav">
                <div className="container">
                    <NavLink to="/" className="navbar-brand text-dark">
                        <img src={logoimg} className="img-fliud" height="60" width="60" alt="logo_image" />&nbsp;
                        <span className="h2 mt-1" style={{ "fontWeight": "bold" }}>BrandBucket</span>
                    </NavLink>
                    <div className="collapse navbar-collapse">
                        <ul className='navbar-nav me-auto'>
                            <li className="nav-item">
                                <NavLink to="/products/men" className="nav-link text-dark h5 mt-2 mx-1" style={{ "fontWeight": "bold" }}>Men's Wear</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products/women" className="nav-link text-dark h5 mt-2 mx-1" style={{ "fontWeight": "bold" }}>Women's Wear</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products/kids" className="nav-link text-dark h5 mt-2 mx-1" style={{ "fontWeight": "bold" }}>Kid's Wear</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/products/upload" className="nav-link text-dark h5 mt-2 mx-1" style={{ "fontWeight": "bold" }}>Upload</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/orders/cart" className="nav-link text-dark h5 mx-1">
                                    <i className="fa fa-shopping-cart fa-2x"></i>
                                    <span className="badge badge-pill badge-danger">{orderState.cartItems.length}</span>
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/orders/list" className="nav-link text-dark h5 mt-2 mx-1" style={{ "fontWeight": "bold" }}>Order</NavLink>
                            </li>
                        </ul>
                        <div className=" d-flex justify-content-end">
                            <ul className='navbar-nav'>
                                {
                                    AuthUtil.isLoggedIn() && isAuthenticated ?
                                        <>
                                            {
                                                Object.keys(user).length > 0 &&
                                                <li className="nav-item">
                                                    <NavLink to="/users/profile" className="nav-link text-dark mx-2">
                                                        <img src={user.avatar} alt='profile_pic' className='img-fluid rounded-circle' width='30' height='30' />
                                                        <em className='mx-2' style={{ "fontWeight": "bold" }}>{user.name}</em>
                                                    </NavLink>
                                                </li>
                                            }
                                            <li className="nav-item">
                                                <NavLink to="/" className="nav-link text-dark mx-2 h5" style={{ "fontWeight": "bold" }} onClick={logOut}>
                                                    <i className="fa fa-sign-out"></i> Logout
                                                </NavLink>
                                            </li>
                                        </> :
                                        <>
                                            <li className="nav-item">
                                                <NavLink to="/users/login" className="nav-link text-dark mx-2 h5" style={{ "fontWeight": "bold" }}>
                                                    <i className="fa fa-sign-in"></i> Login
                                                </NavLink>
                                            </li>
                                            <li className="nav-item">
                                                <NavLink to="/users/register" className="nav-link text-dark mx-2 h5" style={{ "fontWeight": "bold" }}>
                                                    <i className="fa fa-user-circle"></i>  Register
                                                </NavLink>
                                            </li>
                                        </>
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default NavBar
