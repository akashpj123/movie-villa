import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams,  Link } from 'react-router-dom';
import '../../App.css';

function Bookingmovie() {
  const [email, setEmail] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedRate, setSelectedRate] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [totalCost, setTotalCost] = useState(0);
  const [error, setError] = useState('');
  const { id } = useParams();
  const [post, setPost] = useState({ name: '', description: '', posterUrl: '' });

  useEffect(() => {
    axios.get(`http://localhost:3000/movie/getMovie/${id}`)
      .then(res => setPost(res.data))
      .catch(error => console.log(error));
  }, [id]);

  const handleTimeChange = (event) => {
    setSelectedTime(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleRateChange = (event) => {
    const rate = event.target.value;
    setSelectedRate(rate);
    setTotalCost(rate * 120); // Assuming rate * 120 as the calculation for total cost
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!selectedTime || !selectedRate || !selectedDate || !email) {
      setError('Please fill in all fields.');
      return;
    }

    const bookingDetails = {
      time: selectedTime,
      people: selectedRate,
      date: selectedDate,
      rate: totalCost,
      email: email,
      name:post.name
    };

    axios.post('http://localhost:8000/booking/upload', bookingDetails)
      .then(response => {
        console.log('Booking successful:', response.data);

      })
      .catch(error => {
        setError('An error occurred while booking. Please try again later.');
        console.error('Booking error:', error);
      });
  };

  return (
    <div className="booking-container">
      <div className="container login-container" style={{ marginTop: '5%', marginBottom: '5%' }}>
        <div className="row">
          <div className="col-md-6 login-form-1" style={{ padding: '9%', background: '#738FA7', boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)' }}>
            <div className="container-fluid mt-2">
              <h5 className="bg-gradient rounded text-white px-2"><b>Now 🎬</b></h5>
              <div className="row">
                <div className="col-md-12">
                  <div className="card" style={{ width: '20rem' }}>
                    <img src={post.posterUrl} style={{ height: '25rem' }} className="card-img-top" alt={post.name} />
                    <div className="card-body">
                      <h5 className="card-title">{post.name}</h5>
                      <p className="card-text">{post.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 login-form-2" style={{ padding: '9%', background: '#0C4160', boxShadow: '0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 9px 26px 0 rgba(0, 0, 0, 0.19)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '12%', color: '#fff' }}>Booking</h3>
            <form >
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelectDate">Booking Date</label>
                  </div>
                  <input type="date" id="inputGroupSelectDate" className="form-control" value={selectedDate} onChange={handleDateChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="email">name</label>
                  </div>
                  <input type="text" id="email" className="form-control" value={post.name} />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelectTime">Booking Time</label>
                  </div>
             
                  <select className="custom-select" id="inputGroupSelectTime" value={selectedTime} onChange={handleTimeChange}>
                    <option value="">Choose...</option>
                    <option value="9:30pm">9.30pm</option>
                    <option value="11:00pm">11:00pm</option>
                    <option value="6:00am">6:00am</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="email">Email</label>
                  </div>
                  <input type="email" id="email" className="form-control" value={email} onChange={handleEmailChange} />
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="inputGroupSelectRate">People</label>
                  </div>
                  <select className="custom-select" id="inputGroupSelectRate" value={selectedRate} onChange={handleRateChange}>
                    <option value="">Choose...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <label className="input-group-text" htmlFor="totalCost">Total Cost</label>
                  </div>
                  <input type="text" id="totalCost" className="form-control" value={totalCost} readOnly />
                </div>
              </div>
              {error && <div className="alert alert-danger">{error}</div>}
              <button type="submit" onClick={handleSubmit} >    <Link to={`/showpay/${post._id}`} ><b>Book Tickets</b></Link></button>
              <br />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bookingmovie;
