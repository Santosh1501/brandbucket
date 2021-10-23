import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Alert from './modules/layout/components/alert/Alert';
// import Footer from './modules/layout/components/Footer';
import Home from './modules/layout/components/home/Home';
import NavBar from './modules/layout/components/navbar/NavBar';
import Cart from './modules/orders/components/cart/Cart';
import ProductList from './modules/orders/components/productlist/ProductList';
import KidsCollection from './modules/products/components/kids-collection/KidsCollection';
import MensCollection from './modules/products/components/mens-collection/MensCollection';
import UploadProduct from './modules/products/components/upload-product/UploadProduct';
import WomensCollection from './modules/products/components/womens-collection/WomensCollection';
import UserLogIn from './modules/users/components/user-login/UserLogIn';
import UserRegister from './modules/users/components/user-register/UserRegister';
import * as userActions from './redux/user/user.action'
import { useDispatch } from 'react-redux'
import ProductDetails from './modules/products/components/product-details/ProductDetails';
import UserProfile from './modules/users/components/user-profile/UserProfile';
import CheckOut from './modules/orders/components/checkout/CheckOut';



const App: React.FC = () => {

  let dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getUserInfo())
  }, [])
  return (
    <>
      <Router>
        <NavBar />
        <Alert />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/products/men" component={MensCollection} />
          <Route exact path="/products/women" component={WomensCollection} />
          <Route exact path="/products/kids" component={KidsCollection} />
          <Route exact path="/products/upload" component={UploadProduct} />
          <Route exact path="/products/:productId" component={ProductDetails} />
          <Route exact path="/orders/list" component={ProductList} />
          <Route exact path="/orders/cart" component={Cart} />
          <Route exact path="/orders/checkout" component={CheckOut} />
          <Route exact path="/users/login" component={UserLogIn} />
          <Route exact path="/users/register" component={UserRegister} />
          <Route exact path="/users/profile" component={UserProfile} />
        </Switch>
        {/* <Footer /> */}
      </Router>
    </>
  )
}

export default App
