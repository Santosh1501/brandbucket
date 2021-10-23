import React, { useState } from 'react'
import { IProduct } from '../../models/IProduct'
import * as productActions from '../../../../redux/products/product.action'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

interface IProps { }
interface IState {
    product: IProduct
}


const UploadProduct: React.FC<IProps> = () => {

    let dispatch = useDispatch()
    let history = useHistory()

    let [productState, setProductState] = useState<IState>({
        product: {} as IProduct
    })

    let updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setProductState({
            product: {
                ...productState.product,
                [event.target.name]: event.target.value
            }
        })
    }


    let updateImage = async (event: React.ChangeEvent<HTMLInputElement | any>) => {
        let imageFile: Blob = event.target.files[0];
        let base64Image: string | ArrayBuffer = await convertBase64String(imageFile);
        // alert(base64Image);
        setProductState({
            ...productState,
            product: {
                ...productState.product,
                image: base64Image.toString()
            }
        });
    };

    let convertBase64String = (imageFile: Blob): Promise<string | ArrayBuffer> => {
        return new Promise((resolve, reject) => {
            let fileReader = new FileReader();
            fileReader.readAsDataURL(imageFile);
            fileReader.addEventListener('load', () => {
                if (fileReader.result) {
                    resolve(fileReader.result);
                }
                else {
                    reject('Error Occurred');
                }
            })
        });
    };

    // created product function
    let submitUploadProduct = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault()
        // dispatch an Action
        dispatch(productActions.uploadProduct(product, history))
    }

    let { product } = productState
    return (
        <>

            {/* <pre>{JSON.stringify(productState)}</pre> */}
            <section className="mt-3">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 m-auto">
                            <div className="card">
                                <div className="card-header winter-neva-gradient">
                                    <h3 className="text-center" style={{ "fontWeight": "bold" }}>Upload Product Here</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submitUploadProduct}>
                                        <div className="form-group my-2">
                                            <select className="form-control" name="category" value={product.category} onChange={updateInput}>
                                                <option value="">---Select Category---</option>
                                                <option value="MEN">Men's Category</option>
                                                <option value="WOMEN">Women's Category</option>
                                                <option value="KID">Kid's Category</option>
                                            </select>
                                        </div>
                                        <div className="form-group my-2">
                                            <input type="text" className="form-control" placeholder="Enter Name" name="name" value={product.name} onChange={updateInput} />
                                        </div>
                                        <div className="form-group my-2">
                                            <input type="text" className="form-control" placeholder="Enter Brand Name" name="brand" value={product.brand} onChange={updateInput} />
                                        </div>
                                        <div className="form-group my-2">
                                            {/* <input type="file" className="form-control" placeholder="Enter Product Image" /> */}
                                            <input type="file" className="form-control" id="formFile" placeholder="Enter Product Image"
                                                name="image" onChange={updateImage} />
                                            {
                                                product.image?.length > 0 &&
                                                <img src={product.image} className="img-fluid" height="40" width="40" alt="Men shirt_image" />

                                            }
                                        </div>
                                        <div className="form-group my-2">
                                            <input type="number" className="form-control" placeholder="Enter Price" name="price" value={product.price} onChange={updateInput} />
                                        </div>
                                        <div className="form-group my-2">
                                            <input type="number" className="form-control" placeholder="Enter Qty" name="qty" value={product.qty} onChange={updateInput} />
                                        </div>
                                        <div className="form-group my-2">
                                            <textarea className="form-control" rows={3} placeholder="Product Description" name="description" value={product.description} onChange={updateInput}></textarea>
                                        </div>
                                        <div className="form-group my-2">
                                            <textarea className="form-control" rows={3} placeholder="Product Usage" name="usage" value={product.usage} onChange={updateInput}></textarea>
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between">
                                            <input type="submit" className="btn btn-cyan" value="Submit" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UploadProduct
