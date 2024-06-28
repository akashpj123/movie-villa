import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../store/authAdminSlice";
import checkGuest from "../checkguest";

function Loginadmin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const dispatch = useDispatch();

    const submit = async () => {
        try {
            const response = await axios.post('http://localhost:3000/admin/login', {
                email:email,
                password:password
            });
            setErrorMessage('');
            const admin = await{
                email:email,
                token: response.data.token
            };
            dispatch(setAdmin(admin));
            navigate('/');
            console.log(response.data.token);
        } catch (error) {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
            }
        }
    };

    const getout = () => {
        navigate('/');
    };

    const sign = () => {
        navigate('/signupadmin');
    };

    return (
        <section className='aka'>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column justify-content-between">
                    <div className="card mt-5 p-5 bg-dark">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={getout}>Back</button>
                        </div>
                        <div>
                            <p className="mb-1 text-white">Admin Get</p>
                            <h4 className="mb-3 text-white">Admin use!</h4>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={sign}><small>Admin started Time?</small><span>&nbsp;Sign up</span></button>
                    </div>
                    <div className="card two bg-info px-5 py-3 mb-5">
                        <div className="form-group">
                            <input type="email" className="form-control bg-light" id="mail" value={email} onChange={(event) => setEmail(event.target.value)} required />
                            <label className="text-dark" htmlFor="mail">Email</label>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control bg-light" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                            <label className="text-dark" htmlFor="password">Password</label>
                        </div>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        <button className="btn btn-primary btn-block btn-lg mt-1 mb-2" onClick={submit}><span>Get started<i className="fas fa-long-arrow-alt-right ml-2"></i></span></button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default checkGuest(Loginadmin);
