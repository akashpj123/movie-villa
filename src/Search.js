import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Search({ data, user, admin, deletePost, login }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setMovies] = useState([]);
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    // Call the onSearch prop with the search term if it exists
  };

  const searchBoxStyle = {
    width: 'fit-content',
    height: 'fit-content',
    position: 'relative',
  };

  const inputSearchStyle = {
    height: '50px',
    width: '50px',
    borderStyle: 'none',
    padding: '10px',
    fontSize: '18px',
    letterSpacing: '2px',
    outline: 'none',
    borderRadius: '25px',
    transition: 'all .5s ease-in-out',
    backgroundColor: '#22a6b3',
    paddingRight: '40px',
    color: '#fff',
  };

  const btnSearchStyle = {
    width: '50px',
    height: '50px',
    borderStyle: 'none',
    fontSize: '20px',
    fontWeight: 'bold',
    outline: 'none',
    cursor: 'pointer',
    borderRadius: '50%',
    position: 'absolute',
    right: '0px',
    color: '#ffffff',
    backgroundColor: 'transparent',
    pointerEvents: 'painted',
  };

  const inputSearchFocusStyle = {
    width: '300px',
    borderRadius: '0px',
    backgroundColor: 'transparent',
    borderBottom: '1px solid rgba(255,255,255,.5)',
    transition: 'all 500ms cubic-bezier(0, 0.110, 0.35, 2)',
  };

  return (
    <>
      <form className="search-box" style={searchBoxStyle} onSubmit={handleSearch}>
        <button type="submit" className="btn-search" style={btnSearchStyle}>
          <i className="fas fa-search"></i>
        </button>
        <input
          type="text"
          className="input-search"
          placeholder="Type to Search..."
          value={searchTerm}
          onChange={handleSearchInputChange}
          style={inputSearchStyle}
        />
      </form>

      <div className="container-fluid mt-2">
        <h5 className='bg-gradient rounded  px-2 ' style={{ color: 'white', fontSize: 'italic' }}><b>Now Showing🎬</b></h5>
        <div className="container-fluid mx-auto mb-3 pt-5">
          <div className="row">
            {data.map((d, i) => (
              <div className="col-md-3" key={i}>
                <div className="card" style={{ width: '18rem' }}>
                  <img src={d.posterUrl} className="card-img-top h-70" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{d.name}</h5>
                    {user && (
                      <Link to={`show/${d._id}`} className="btn mr-4 w-100">
                        <i className="fas fa-link"></i> <b>Book Tickets</b>
                      </Link>
                    )}
                    {admin && (
                      <>
                        <Link to={`show/${d._id}`} className="btn mr-4 w-100">
                          <i className="fas fa-link"></i> <b>Book Tickets</b>
                        </Link>
                        <button className="btn btn-secondary mr-5 mt-2" onClick={() => deletePost(d._id)}>
                          <i className="fab fa-github"></i> Delete
                        </button>
                        <Link to={`edit/${d._id}`} className="btn btn-secondary mt-2 ml-5">
                          <i className="fab fa-github"></i> <b>Edit</b>
                        </Link>
                      </>
                    )}
                    {!user && !admin && (
                      <button className="btn btn-secondary mt-2 ml-5" onClick={login}>
                        <i className="fab fa-github"></i> <b>Book Tickets</b>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
