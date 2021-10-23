import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import * as userActions from '../../../../redux/user/user.action'

interface IProps { }


interface IUser {
    name: string
    email: string
    password: string
}

interface IUserError {
    nameError: string
    emailError: string
    passwordError: string
}
const UserRegister: React.FC<IProps> = () => {

    let history = useHistory()
    let dispatch = useDispatch()

    let [userState, setUserState] = useState<IUser>({
        name: "",
        email: "",
        password: ""
    })

    let [userErrorState, setUserErrorState] = useState<IUserError>({
        nameError: "",
        emailError: "",
        passwordError: ""
    })

    // Name Validation function
    let validteUser = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserState(
            {
                ...userState,
                name: event.target.value
            }
        )

        let regExp = /^[a-zA-Z0-9 ]{5,30}$/;

        if (!regExp.test(event.target.value)) {
            setUserErrorState(
                {
                    ...userErrorState,
                    nameError: 'Username min length 5 & max 15'
                }
            )
        }
        else {
            setUserErrorState(
                {
                    ...userErrorState,
                    nameError: ''
                }
            )
        }

    }

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

    // submit Register form function
    let submitRegister = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        dispatch(userActions.registerUser(userState, history))
    }

    return (
        <>
            {/* <pre>{JSON.stringify(userState)}</pre>
            <pre>{JSON.stringify(userErrorState)}</pre> */}
            <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-md-5 m-auto">
                            <div className="card">
                                <div className="card-header winter-neva-gradient">
                                    <h3 className="text-center" style={{ "fontWeight": "bold" }}>Register Here</h3>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={submitRegister}>
                                        <div className="form-group my-4">
                                            <input type="text" className={`form-control ${userErrorState.nameError.length > 0 ? 'is-invalid' : ''}`} placeholder="Enter Name" name="name" onChange={validteUser} />
                                            {
                                                userErrorState.nameError.length > 0 ? <em className="text-danger mt-1">{userErrorState.nameError}</em> : ''
                                            }
                                        </div>
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
                                            <input type="submit" className="btn btn-cyan" value="Submit" />
                                            <span className="mt-3">Already Have an Account...
                                                <Link to="/users/login">Login Here</Link>
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

export default UserRegister
