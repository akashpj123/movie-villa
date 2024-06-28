import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../../../App.css';

function Signupgust() {
    const navigate = useNavigate();
	const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [con_pass, setConfirmPassword] = useState('');
	axios.defaults.withCredentials=true
    function submit() {
        const user = {
            name: name,
            email: email,
            password: password,
            conform_password: con_pass // Corrected variable name
        };
		   axios.post('https://movie-villaback.vercel.app/user/sign', user)
            .then(response => {
                navigate('/logingust');
            })
            .catch(error => {
                console.log(error);
				
            });
     
    }function back(){
        navigate('/');
    }
function log(){
    navigate('/logingust');
}
    return (
        <section className='aka'>
            <div className="container d-flex justify-content-center">
                <div className="d-flex flex-column justify-content-between">
                    <div className="card mt-2 p-5 bg-dark">		
                    <div>
                    <button type="button" class="btn btn-primary" onClick={back}>back</button>
                    </div>
                        <div>
                            <p className="mb-1 pt-2">Start Movie Book</p>
                            <h4 className="mb-3 text-white">Get Ready</h4>
                        </div>
                        <button className="btn btn-primary btn-lg" onClick={log}><small>Already signed up?</small><span>&nbsp;Log in</span></button>
                    </div>
                    <div className="card two bg-info px-4 py-3 mb-2 ">
                        <div className="form-group">
                            <input type="text" className="form-control bg-light " id="name" required value={name} onChange={(event) => setName(event.target.value)} />
                            <label className="text-dark" htmlFor="name">Full Name</label>
                        </div>
                        <div className="form-group">
                            <input type="email" className="form-control bg-light" id="mail" value={email} onChange={(event) => setEmail(event.target.value)} required />
                            <label className="text-dark" htmlFor="mail">Email</label>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control bg-light" id="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                            <label className="text-dark" htmlFor="password">Password</label>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control bg-light" id="password" value={con_pass} onChange={(event) => setConfirmPassword(event.target.value)} required />
                            <label className="text-dark" htmlFor="password">Confirm Password</label>
                        </div>
                        <button className="btn btn-primary btn-block btn-lg mt-1 mb-2" onClick={submit}><span>Get started<i className="fas fa-long-arrow-alt-right ml-2"></i></span></button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Signupgust;
