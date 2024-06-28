import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../../App.css";

function Payment() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState({ name: '', actor: '', posterUrl: '' });

  useEffect(() => {
    axios.get(`http://localhost:3000/movie/getMovie/${id}`)
      .then(res => setBook(res.data))
      .catch(error => {
        console.error('Error fetching movie details:', error);
        setError('Error fetching movie details. Please try again.');
      });
  }, [id]);

  useEffect(() => {
    axios.get('http://localhost:3000/booking/read')
      .then(res => {
        setRates(res.data);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => {
        console.error('Error fetching rates:', error);
        setError('Error fetching rates. Please try again.');
        setLoading(false); // Set loading to false even if there's an error
      });
  }, []);

  const initPayment = (data) => {
    const options = {
      key: "rzp_test_7vZrhg3TXzabi1",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:3000/api/payment/verify";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async (rate) => {
    try {
      const orderUrl = "http://localhost:3000/api/payment/orders";
      const { data } = await axios.post(orderUrl, { amount: rate });
      console.log(data);
      initPayment(data.data);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  return (
    <div className="akkaaaa">
      <div className="container mt-3" style={{ width: '30rem', height: '20rem' }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card" style={{ width: '18rem' }}>
              <img src={book.posterUrl} alt="book_img" className="card-img-top" />
              <div className="card-body">
                <h5 className="card-title">{book.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">By {book.actor}</h6>
                {rates.map((d, i) => (
                  <div key={i} className="mb-3">
                    <p className="card-text">
                      Price: <span>&#x20B9; {d.rate}</span>
                    </p>
                    <button onClick={() => handlePayment(d.rate)} className="btn btn-primary">
                      Buy Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
