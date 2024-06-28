import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import { useNavigate, useParams } from 'react-router-dom';

function Editmovie() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [actors, setActors] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [bookingStartDate, setBookingStartDate] = useState('');

  useEffect(() => {
    // Fetch the existing movie data
    axios.get(`http://localhost:3000/movie/getMovie/${id}`)
      .then(response => {
        const movie = response.data;
        setName(movie.name);
        setDescription(movie.description);
        setActors(movie.actors);
        setPosterUrl(movie.posterUrl);
        setBookingStartDate(movie.bookingStartDate);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
        setErrorMsg('Error fetching movie data.');
      });
  }, [id]);

  const submit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const formData = {
      name,
      description,
      actors,
      bookingStartDate,
      posterUrl,
    };

    axios.put(`http://localhost:8000/movie/editMovie/${id}`, formData)
      .then(response => {
        console.log(response.data);
        navigate('/');
      }) // Handle response as needed
      .catch(error => {
        console.log(error);
        setErrorMsg('Error updating movie.');
      });
  };

  return (
    <div className='bg-primary'>
      <Navbar />
      <main className="container-fluid bg-primary mt-5">
        <div className='row col'>
          <section className="vh-100">
            <div className="container-fluid h-custom">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-md-9 col-lg-6 col-xl-5">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    className="img-fluid" alt="Sample" />
                  {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
                </div>
                <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                  <form onSubmit={submit}>
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                      <p className="lead fw-normal mb-0 me-3">Edit Movie</p>
                    </div>
                    <div className="form-outline mb-1 mt-2">
                      <input type="text" className="form-control form-control-lg"
                        placeholder="Movie Name" value={name} onChange={e => setName(e.target.value)} />
                    </div>
                    <div className="form-outline mb-1">
                      <textarea className="form-control" rows="2" value={description}
                        onChange={e => setDescription(e.target.value)} placeholder="Description"></textarea>
                    </div>
                    <div className="form-outline mb-1">
                      <input type="text" className="form-control" value={actors}
                        onChange={e => setActors(e.target.value)} placeholder="Actors" />
                    </div>
                    <div className="form-outline mb-1">
                      <input type="date" className="form-control" value={bookingStartDate}
                        onChange={e => setBookingStartDate(e.target.value)} placeholder="Release Date" />
                    </div>
                    <div className="form-outline mb-1">
                      <input type="text" className="form-control" value={posterUrl}
                        onChange={e => setPosterUrl(e.target.value)} placeholder="Poster Url" />
                    </div>
                    <div className="text-center text-lg-start mt-4 pt-2">
                      <button type="submit" className="btn btn-primary btn-lg"
                        style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>Update</button>
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

export default Editmovie;
