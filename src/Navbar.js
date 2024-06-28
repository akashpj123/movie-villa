import React  from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { removeUser } from './components/auth/store/authSlice';
import { removeAdmin } from './components/auth/store/authAdminSlice';

function Navbar() {
  const user = useSelector((store) => store.auth.user);
  const admin = useSelector((store) => store.authAdmin.admin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const logoutUser = async () => {
    try {
      if (user) {
        await axios.post('https://movie-villaback.vercel.app/user/logout', {}, {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        dispatch(removeUser());
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out user:', error);
    }
  };

  const logoutAdmin = async () => {
    try {
      if (admin) {
        await axios.post('https://movie-villaback.vercel.app/admin/logout', {}, {
          headers: { 'Authorization': `Bearer ${admin.token}` }
        });
        dispatch(removeAdmin());
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging out admin:', error);
    }
  };
  
  return (
    <div className='pt-3 px-5 mx-5'>
      <nav className="navbar navbar-expand-lg navbar-light text-white mx-3 px-5 rounded-pill" style={{ backgroundColor: '#212529' }}>
        <NavLink to="/" className="navbar-brand text-white">
          movievilla
        </NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            {user && (
              <>
                 <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/"} className="nav-link text-white" activeClassName="active">
                  Movies
                </NavLink>
              </li>
                 <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/my-bookings"} className="nav-link text-white" activeClassName="active">
                  My Bookings
                </NavLink>
              </li>
                <li className="nav-item">
                  <span className="nav-link text-white" onClick={logoutUser}>
                    Logout
                  </span>
                </li>
              
              </>
            )}
            {admin && (
              <>
                <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/"} className="nav-link text-white" activeClassName="active">
                  Movies
                </NavLink>
              </li>
              <li className="nav-item">
                  <NavLink to="/addbooking" className="nav-link text-white">
                    Add Book
                  </NavLink>
                </li>
                <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/my-bookings"} className="nav-link text-white" activeClassName="active">
                  My Bookings
                </NavLink>
              </li>
                <li className="nav-item">
                  <span className="nav-link text-white" onClick={logoutAdmin}>
                    Logout
                  </span>
                </li>
              </>
            )}
            {!user && !admin && (
              <>
                <li className="nav-item" style={{ marginLeft: "10px" }}>
                <NavLink to={"/"} className="nav-link text-white" activeClassName="active">
                  Movies
                </NavLink>
              </li>
                <li className="nav-item">
                  <NavLink to="/signupgust" className="nav-link text-white">
                    Signup
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/logingust" className="nav-link text-white">
                    Login
                  </NavLink>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Admin
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <NavLink to="/loginadmin" className="dropdown-item text-dark">Login</NavLink>
                    <NavLink to="/signupadmin" className="dropdown-item text-dark">Signup</NavLink>
                  </div>
                </li>
              </>
            )}
          
          </ul>
        </div>
      </nav>

  </div>

    
  

  );
}


export default Navbar;
