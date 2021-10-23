
import * as userReducer from '../../../../redux/user/user.reducer'
import * as userAction from '../../../../redux/user/user.action'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
interface IProps { }

interface IState {
    isEnableAddress: boolean
}

const UserProfile: React.FC<IProps> = () => {

    let dispatch = useDispatch()

    let userState: userReducer.userState = useSelector((
        state: { user: userReducer.userState }
    ) => {
        return state.user
    })

    //showing enable/default address
    let [enableAddressState, setEnableAddressState] = useState<IState>(
        {
            isEnableAddress: false
        }
    )

    let switchEnableAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEnableAddressState(
            {
                isEnableAddress: event.target.checked
            }
        )
    }

    // address section 
    let [addressState, setAddressState] = useState(
        {
            mobile: '',
            flat: '',
            street: '',
            landmark: '',
            city: '',
            state: '',
            pin: '',
            country: ''
        }
    )

    let changeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddressState(
            {
                ...addressState,
                [event.target.name]: event.target.value
            }
        )
    }

    // submit user address function

    useEffect(() => {
        setAddressState(
            {
                ...addressState,
                mobile: userState.user && userState.user.address ? userState.user.address.mobile : '',
                flat: userState.user && userState.user.address ? userState.user.address.flat : '',
                street: userState.user && userState.user.address ? userState.user.address.street : '',
                landmark: userState.user && userState.user.address ? userState.user.address.landmark : '',
                city: userState.user && userState.user.address ? userState.user.address.city : '',
                state: userState.user && userState.user.address ? userState.user.address.state : '',
                pin: userState.user && userState.user.address ? userState.user.address.pin : '',
                country: userState.user && userState.user.address ? userState.user.address.country : ''
            }
        )
    }, [userState.user])



    // submit user address function
    let submitUpdateAddress = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // dispatch an action
        dispatch(userAction.updateAddress(addressState))
        setEnableAddressState({
            isEnableAddress: false
        })
    }




    return (
        <>
            <div>
                <h2 className="tempting-azure-gradient p-3 text-center" style={{ "fontWeight": "bold" }}>Your Account Section</h2>
            </div>
            {/* <pre>{JSON.stringify(userState.user)}</pre> */}
            {/* <pre>{JSON.stringify(enableAddressState.isEnableAddress)}</pre> */}
            {/* <pre>{JSON.stringify(addressState)}</pre> */}
            <section className="container mt-5">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-4">
                                <img src={userState.user.avatar} alt="" className="img-fluid rounded-circle" />
                            </div>
                            <div className="col-md-8">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Name: {userState.user.name}</li>
                                    <li className="list-group-item">Email: {userState.user.email}</li>
                                </ul>
                                <div className="row bg-default mt-5 text-white">
                                    <div className="col-md-6">
                                        <h2 className="text-center">Your Billing Address</h2>
                                    </div>
                                    <div className="col-md-6 mt-2">
                                        <div className="form-check form-switch">
                                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onChange={switchEnableAddress} />
                                            <label className="form-check-label h5">Update Your Address</label>
                                        </div>
                                    </div>
                                </div>
                                {
                                    !enableAddressState.isEnableAddress &&
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
                                {
                                    enableAddressState.isEnableAddress &&
                                    <form onSubmit={submitUpdateAddress}>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">Mobile</span>
                                            <input type="number" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='mobile' value={addressState.mobile} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">Flat</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='flat' value={addressState.flat} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">Street</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='street' value={addressState.street} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">Landmark</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='landmark' value={addressState.landmark} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">City</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='city' value={addressState.city} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">Area Pincode</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='pin' value={addressState.pin} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">State</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='state' value={addressState.state} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <span className="input-group-text" id="basic-addon1">Country</span>
                                            <input type="text" className="form-control" aria-label="Username" aria-describedby="basic-addon1"
                                                name='country' value={addressState.country} onChange={changeAddress} />
                                        </div>
                                        <div className="input-group my-1">
                                            <input type="submit" className="form-control btn btn-cyan btn-md" value="Update Your Address" aria-label="Username" aria-describedby="basic-addon1" />
                                        </div>
                                    </form>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default UserProfile
