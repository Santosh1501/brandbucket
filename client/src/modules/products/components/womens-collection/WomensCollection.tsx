import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as productActions from '../../../../redux/products/product.action'
import * as productReducer from '../../../../redux/products/product.reducer'
import Spinner from '../../../layout/components/spinner/Spinner'
import { IProduct } from '../../models/IProduct'
import * as orderActions from '../../../../redux/orders/order.action'
import { useHistory } from 'react-router-dom'

interface IProps { }

const WomensCollection: React.FC<IProps> = () => {

    let dispatch = useDispatch()
    let history = useHistory()

    let productState: productReducer.ProductState = useSelector((
        state: { products: productReducer.ProductState }
    ) => {
        return state.products
    })

    useEffect(() => {
        dispatch(productActions.getWomenProducts())
    }, [])


    let clickAddToCart = (product: IProduct) => {
        let defaultQty: number = 1
        dispatch(orderActions.addToCart(product, defaultQty, history))
    }

    let { loading, products } = productState
    return (
        <>
            <div>
                <h2 className="tempting-azure-gradient p-3 text-center" style={{ "fontWeight": "bold" }}>Women's Collection</h2>
            </div>
            {/* <pre>{JSON.stringify(productState.products)}</pre> */}
            {
                loading ? <Spinner /> :
                    <>
                        <section>
                            <div className="container">
                                <div className="row">
                                    {
                                        products.length > 0 && products.map((product) => {
                                            return (
                                                <div className="col-md-3" key={product._id}>
                                                    <div className="card">
                                                        <Link to={`/products/${product._id}`}>
                                                            <img src={product.image} alt="product_image" className="img-fluid" />
                                                        </Link>
                                                    </div>
                                                    <div className="card-body text-center">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                <h5>{product.brand}</h5>
                                                                <em>&#8377;{product.price.toFixed(2)}</em>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-footer">
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

export default WomensCollection
