import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as userActions from '../../../../redux/user/user.action'
interface IProps { }


interface IUser {
    email: string
    password: string
}



interface IUserError {
    emailError: string
    passwordError: string
}

const UserLogIn: React.FC<IProps> = () => {


    let history = useHistory()
    let dispatch = useDispatch()


    let [userState, setUserState] = useState<IUser>({
        email: "",
        password: ""
    })

    let [userErrorState, setUserErrorState] = useState<IUserError>({
        emailError: "",
        passwordError: ""
    })


    // Email validation function
    let validateEmail = (event: React.ChangeEvent<HTMLInputElement>) => {

        setUserState(
            {
                ...userState,
                email: event.target.value
            }
        )
        let regExEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regExEmail.test(event.target.value)) {
            setUserErrorState(
                {
                    ...userErrorState,
                    emailError: 'Give Proper Email Address'
                }
            )
        }
        else {
            setUserErrorState(
                {
                    ...userErrorState,
                    emailError: ''
                }
            )
        }
    }

    // Password validation function
    let validatePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserState({
            ...userState,
            password: event.target.value
        })

        let regExPswd = /^[a-zA-Z0-9]{5,10}$/

        if (!regExPswd.test(event.target.value)) {
            setUserErrorState({
                ...userErrorState,
                passwordError: '1st character should be in capital or small/number having min length 5 & max 10'
            })
        }
        else {
            setUserErrorState({
                ...userErrorState,
                passwordError: ''
            })
        }
    }


    // submit Login form function
    let submitLogin = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        // console.log(userState)

        dispatch(userActions.loginUser(userState, history))
    }

    return (
        <>
            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <div className="card">
                                <div className="card-header winter-neva-gradient">
                                    <h3 className="text-center" style={{ "fontWeight": "bold" }}>Login Here</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submitLogin}>
                                        <div className="form-group my-4">
                                            <input type="email" className={`form-control ${userErrorState.emailError.length > 0 ? 'is-invalid' : ''}`} placeholder="Enter Email" name="email" onChange={validateEmail} />
                                            {
                                                userErrorState.emailError.length > 0 ? <em className="text-danger mt-1">{userErrorState.emailError}</em> : ''
                                            }
                                        </div>
                                        <div className="form-group my-4">
                                            <input type="password" className={`form-control ${userErrorState.passwordError.length > 0 ? 'is-invalid' : ''}`} placeholder="Enter Password" name="password" onChange={validatePassword} />
                                            {
                                                userErrorState.passwordError.length > 0 ? <em className="text-danger mt-1">{userErrorState.passwordError}</em> : ''
                                            }
                                        </div>
                                        <div className="mt-3 d-flex justify-content-between">
                                            <input type="submit" className="btn btn-cyan" value="Login" placeholder="Enter Email" />
                                            <span className="mt-3">New To Brand Basket...
                                                <Link to="/users/register">Register Here</Link>
                                            </span>
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

export default UserLogIn
