import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../../../redux/products/product.action'
import * as productReducer from '../../../../redux/products/product.reducer'
import Spinner from '../../../layout/components/spinner/Spinner'
import * as orderActions from '../../../../redux/orders/order.action'


interface IState {
    qty: string
}

interface URLParamsType {
    productId: string
}

const ProductDetails = () => {

    let dispatch = useDispatch()
    let history = useHistory()

    let [productQty, setProductQty] = useState<IState>({
        qty: ''
    })



    let productState: productReducer.ProductState = useSelector((
        state: { products: productReducer.ProductState }
    ) => {
        return state.products
    })
    let productId = useParams<URLParamsType>()

    useEffect(() => {
        dispatch(productActions.getSingleProduct(productId.productId))
    }, [productId.productId])

    let { loading, product } = productState

    // updateQty function

    let updateQty = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setProductQty({
            qty: event.target.value
        })
    }

    // add to cart function
    let submitAddtoCart = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // dispatch an action Add To Cart
        dispatch(orderActions.addToCart(product, Number(productQty.qty), history))
    }
    return (
        <>
            <div>
                <h2 className="tempting-azure-gradient p-3 text-center" style={{ "fontWeight": "bold" }}>Product Details</h2>
            </div>
            {/* <pre>{JSON.stringify(productQty.qty)}</pre> */}
            {/* <pre>{JSON.stringify(productId)}</pre> */}

            {
                loading ? <Spinner /> :
                    <>
                        {
                            Object.keys(product).length > 0 &&
                            // <pre>{JSON.stringify(product)}</pre>

                            <section className="container mt-6" >
                                <div className="row">
                                    <div className="col-md-5">
                                        <img src={product.image} className="img-fluid h-75 w-75" alt="" />
                                    </div>
                                    <div className="col-md-7">
                                        <h3 style={{ "fontWeight": "bold" }}>{product.brand}</h3>
                                        <hr />
                                        <em className="h4 text-muted my-2">{product.name}</em>
                                        <p className='my-2'>{product.description}</p>
                                        <p className='my-2'>{product.usage}</p>
                                        <em style={{ "fontWeight": "bold" }} className='text-danger'>&#8377; {product.price.toFixed(2)}</em>
                                        <form onSubmit={submitAddtoCart}>
                                            <select className='form-control my-3 w-50' value={productQty.qty} onChange={updateQty}>
                                                <option value="">---Select Quantity---</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                            </select>
                                            <input type="submit" value='Add to Cart' className="btn btn-cyan" />
                                        </form>
                                    </div>
                                </div>
                            </section>
                        }
                    </>
            }

        </>
    )
}

export default ProductDetails
