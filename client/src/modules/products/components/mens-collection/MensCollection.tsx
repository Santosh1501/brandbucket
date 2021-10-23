import React, { useEffect } from 'react'
import * as productActions from '../../../../redux/products/product.action'
import * as productReducer from '../../../../redux/products/product.reducer'
import * as orderActions from '../../../../redux/orders/order.action'
import { useDispatch, useSelector } from 'react-redux'
import Spinner from '../../../layout/components/spinner/Spinner'
import { Link } from 'react-router-dom'
import { IProduct } from '../../models/IProduct'
import { useHistory } from 'react-router-dom'


const MensCollection: React.FC = () => {

    let dispatch = useDispatch()
    let history = useHistory()

    let productState: productReducer.ProductState = useSelector((
        state: { products: productReducer.ProductState }
    ) => {
        return state.products
    })

    useEffect(() => {
        dispatch(productActions.getMenProducts())
    }, [])


    // add to cart function
    let clickAddToCart = (product: IProduct) => {
        let defaultQty: number = 1
        dispatch(orderActions.addToCart(product, defaultQty, history))
    }

    let { loading, products } = productState
    return (
        <>
            <div>
                <h2 className="tempting-azure-gradient p-3 text-center" style={{ "fontWeight": "bold" }}>Men's Collection</h2>
            </div>
            {/* <pre>{JSON.stringify(productState.products)}</pre> */}
            {
                loading ? <Spinner /> :
                    <>
                        <section className="mt-3">
                            <div className="container">
                                <div className="row">
                                    {
                                        products.length > 0 && products.map((product) => {
                                            return (
                                                <div className="col-md-3" key={product._id}>
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <Link to={`/products/${product._id}`}>
                                                                <img src={product.image} alt="product_image" className="img-fluid" />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                <h5>{product.name}</h5>
                                                                <em>&#8377;{product.price.toFixed(2)}</em>
                                                            </li>
                                                        </ul>
                                                        <button type="button" className="btn btn-cyan" onClick={clickAddToCart.bind(this, product)}>Add To Cart</button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </>

            }
        </>


    )
}

export default MensCollection
