import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function ShowCard() {
  const user = useSelector((store) => store.auth.user);
  const admin = useSelector((store) => store.authAdmin.admin);
  const [data, setMovies] = useState([]);
  const [hiddenButtons, setHiddenButtons] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://movie-villaback.vercel.app/movie/read')
      .then((res) => {
        setMovies(res.data);
        const storedHiddenButtons = JSON.parse(localStorage.getItem('hiddenButtons')) || {};
        setHiddenButtons(storedHiddenButtons);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem('hiddenButtons', JSON.stringify(hiddenButtons));
  }, [hiddenButtons]);

  const deletePost = (id) => {
    const confirm = window.confirm("Are you sure you want to delete this movie?");
    if (confirm) {
      axios.delete(`https://movie-villaback.vercel.app/movie/deleteMovie/${id}`)
        .then(() => {
          setMovies(data.filter(movie => movie._id !== id)); // Remove the deleted movie from state
          navigate('/'); // Navigate to the home page after successful deletion
        })
        .catch((error) => {
          console.error('Error deleting movie:', error);
        });
    }
  };

  const handleDisableClick = (id) => {
    setHiddenButtons(prevState => ({ ...prevState, [id]: true }));
  };

  const handleEnableClick = (id) => {
    setHiddenButtons(prevState => {
      const updatedState = { ...prevState };
      delete updatedState[id];
      return updatedState;
    });
  };

  const login = () => {
    navigate('/logingust');
  };

  return (
    <div className="container-fluid mt-2">
      <style>
        {`
          :root {
            --gradient: linear-gradient(to left top, #DD2476 10%, #FF512F 90%) !important;
          }
          
          .card {
            background: #222;
            border: 1px solid #dd2476;
            color: rgba(250, 250, 250, 0.8);
            margin-bottom: 2rem;
          }
          
          .btn {
            background: #222;
            border: 5px solid;
            border-image-slice: 1;
            background: var(--gradient) !important;
            -webkit-background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
            border-image-source: var(--gradient) !important; 
            text-decoration: none;
            transition: all .4s ease;
          }
          
          .btn:hover, .btn:focus {
            background: var(--gradient) !important;
            -webkit-background-clip: none !important;
            -webkit-text-fill-color: #fff !important;
            border: 5px solid #fff !important; 
            box-shadow: #222 1px 0 10px;
            text-decoration: underline;
          }
          .card-img-top {
            width: 100%;
            height: 18rem; /* Adjust the height as needed */
            object-fit: cover;
          }
        `}
      </style>
      <h5 className='bg-gradient rounded px-2' style={{ color: 'white', fontSize: 'italic' }}>
        <b>Now Showing🎬</b>
      </h5>
      <div className="container-fluid mx-auto mb-3 pt-5">
        <div className="row">
          {data.map((d, i) => (
            <div className="col-md-3" key={i}>
              <div className="card" style={{ width: '18rem'}}>
                <img src={d.posterUrl} className="card-img-top h-75" style={{ width: '18rem', height: '18rem' }} alt="..." />
                <div className="card-body">
                  <h5 className="card-title">
                    {d.name}
                  </h5>
                  {!hiddenButtons[d._id] && (user || admin) ? (
                    <Link to={`show/${d._id}`} className="btn mt-2 mr-4 w-100">
                      <i className="fas fa-link"></i> <b>Book Tickets</b>
                    </Link>
                  ) : null}
                  {admin ? (
                    <>
                      <div>
                        <button className="btn btn-secondary mt-2 w-50" onClick={() => deletePost(d._id)}>
                          <i className="fab fa-github"></i> Delete
                        </button>
                        <Link to={`edit/${d._id}`} className="btn btn-secondary mt-2 w-50">
                          <i className="fab fa-github"></i> <b>Edit</b>
                        </Link>
                      </div>
                      <div>
                        <button className="btn btn-secondary mt-2 w-50" onClick={() => handleDisableClick(d._id)}>
                          <i className="fab fa-github"></i> Disable
                        </button>
                        <button className="btn btn-secondary mt-2 w-50" onClick={() => handleEnableClick(d._id)}>
                          <i className="fab fa-github"></i> Enable
                        </button>
                      </div>
                    </>
                  ) : null}
                  {!user && !admin ? (
                    <button className="btn btn-secondary mt-2 ml-5" onClick={login}>
                      <i className="fab fa-github"></i> <b>Book Tickets</b>
                    </button>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ShowCard;
