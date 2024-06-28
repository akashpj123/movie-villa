import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from"../store/authSlice";
import checkGuest from "../checkguest";
function Logingust() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function submit() {
        axios.post('https://movie-villaback.vercel.app/user/login', {
            email: email,
            password: password
        })
        .then(response => {
            setErrorMessage('');
            var user = {
                email:email,
                token:response.data.token
            }
            dispatch(setUser(user));

            navigate('/');
            console.log(response.data.token);
        })
        .catch(error => {
            if (error.response.data.errors) {
                setErrorMessage(Object.values(error.response.data.errors).join(' '));
            } else if (error.response.data.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Failed to login user. Please contact admin');
            }
        });
    }

    function getout() {
        navigate('/');
    }
function sign(){
    navigate('/signupgust');  
}
    return (
        <section className='aka'>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column justify-content-between">
                    <div className="card mt-3 p-5 bg-dark" >
                        <div>
                            <button type="button" className="btn bg-primary" onClick={getout}>Back</button>
                        </div>
                        <div>
                            <p className="mb-1">Start Movie Get</p>
                            <h4 className="mb-3 text-white">Watch Movie</h4>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={sign}><small>Get strat?</small><span>&nbsp;sign up </span></button>
                    </div>
                    <div className="card two bg-info px-5 py-3 mb-5">
                        <div className="form-group">
                            <input type="email" className="form-control bg-light" id="mail" value={email} onChange={(event) => setEmail(event.target.value)} required />
                            <label className="text-dark" htmlFor="mail">Email</label>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control bg-light" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                            <label className="form-control-placeholder text-dark" htmlFor="password">Password</label>
                        </div>
                        {errorMessage && <p className="text-danger">{errorMessage}</p>}
                        <button className="btn btn-primary btn-block btn-lg mt-1 mb-2" onClick={submit}><span>Get started<i className="fas fa-long-arrow-alt-right ml-2"></i></span></button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default checkGuest(Logingust);
