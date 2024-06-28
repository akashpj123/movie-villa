import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function AddBooking() {
    const Navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDiscript] = useState('');
    const [actors, setActors] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [bookingStartDate, setReleaseDate] = useState('');

    const submit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const formData = {
            name: name,
            description: description,
            actors: actors,
            bookingStartDate: bookingStartDate,
            posterUrl: posterUrl,

        };

        axios.post('https://movie-villaback.vercel.app/movie/upload', formData)
            .then(response => {
                console.log(response.data);
                Navigate('/');
            }) // Handle response as needed
            .catch(error => console.log(error));
    };
function back(){
    Navigate('/');
}
    return (
        <div className='bg-dark'>
           
            <main className="container-fluid ">
                <div className='row col'>
                    <section className="vh-100">
                        <div className="container-fluid h-custom">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div>
                                <Link class="btn btn-warning" type="button" style={{backgroundColor:'red'}} onClick={back}>Back</Link>
                                </div>
                                <div className="col-md-9 col-lg-6 col-xl-5">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                                        className="img-fluid" alt="Sample image" />
                                    {errorMsg ? <div className="alert alert-danger">{errorMsg}</div> : ''}
                                </div>
                                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                    <form onSubmit={submit}>
                                        <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                                            <p className="lead fw-normal mb-0 me-3 text-white pb-3">Upload Movie</p>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label></label>
                                            <input type="text" id="form3Example4" className="form-control form-control-lg" placeholder="Movie Name" value={name} onChange={e => setName(e.target.value)} />

                                        </div>
                                        <div className="form-outline mb-2">
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" value={description} onChange={e => setDiscript(e.target.value)} placeholder="Description"></textarea>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <input type="text" className="form-control" value={actors} onInput={(e) => setActors(e.target.value)} placeholder="Actors" />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <input type="date" className="form-control" value={bookingStartDate} onInput={(e) => setReleaseDate(e.target.value)} placeholder="Release Date" />
                                        </div>
                                        <div className="form-outline mb-2">
                                            <input type="text" className="form-control" value={posterUrl} onInput={(e) => setPosterUrl(e.target.value)} placeholder="Poster Url" />
                                        </div>
                                        <div className="text-center text-lg-start mt-4 pt-2">
                                            <button type="submit" className="btn btn-primary btn-lg" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Upload</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default AddBooking;
