import React, { useState } from 'react'
import axios from 'axios'
import { useAuthContext } from './hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const { dispatch } = useAuthContext()
    const navigate = useNavigate()
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            await axios.post('http://localhost:4000/api/login', {
                username: username,
                password: password
            }).then(response => {
                console.log(response.data)
                localStorage.setItem('user', JSON.stringify(response.data))
                dispatch({ type: 'LOGIN', payload: response.data })
                navigate('/')
            })
        } catch (err) {
            console.log(err.response.data)
            setError(err.response.data.message)
        }
    }
    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-5 mt-5">
                    <div className="card o-hidden border-0 shadow-lg my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-md">
                                    <div className="p-5">
                                        <div className="text-center">
                                            <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                        </div>
                                        <div className="text-center mb-3">
                                            {error && <span className="text-danger">{error}</span>}
                                        </div>
                                        <form className="user" onSubmit={handleLogin}>
                                            <div className="form-group">
                                                <input
                                                    type="text"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                    className="form-control form-control-user"
                                                    placeholder="Enter Username..."
                                                    required />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    type="password"
                                                    className="form-control form-control-user"
                                                    placeholder="Enter Password..."
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    required
                                                />
                                            </div>
                                            <button className="btn btn-primary btn-user btn-block">
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login