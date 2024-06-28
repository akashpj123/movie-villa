import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import QRCode from 'react-qr-code'; // Import QRCode component
import'../../App.css'
import { useNavigate } from 'react-router-dom';
const styles = StyleSheet.create({

  
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 20,
    padding: 10,
    flexGrow: 1,
  },
  movieHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 20,
  },
  qrCodeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 15,
    marginTop: 10,
  },
});

function MyBookings() {
  const [bookings, setBookings] = useState([]);
 var Navigator=useNavigate()
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/bookings/book');
        const updatedBookings = await Promise.all(response.data.map(async (booking) => {
          try {
            // Generate QR code data
            const qrCodeData = `Booking ID: ${booking._id}\nMovie: ${booking.name}\nDate: ${new Date(booking.date).toLocaleDateString()}\nTime: ${booking.time}`;
            return { ...booking, qrCodeData };
          } catch (error) {
            console.error('Error generating QR code data:', error);
            return booking;
          }
        }));
        setBookings(updatedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const sendEmail = async (bookingId) => {
    try {
      // Send booking details and QR code as an email attachment
      const response = await axios.post(`http://localhost:3000/bookings/send-email/${bookingId}`);
      console.log(response.data); // Log success message
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  const TicketDocument = ({ booking }) => (
    <Document>
      <Page size="A6" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.movieHeading}>{booking.movieName}</Text>
          <Text style={styles.text}>Booking Movie: {booking.name}</Text>
          <Text style={styles.text}>Booking ID: {booking._id}</Text>
          <Text style={styles.text}>Date: {new Date(booking.date).toLocaleDateString()}</Text>
          <Text style={styles.text}>Booking Time: {booking.time}</Text>
          <View style={styles.qrCodeContainer} >
            {booking.qrCodeData ? (
              <QRCode value={booking.qrCodeData} />
            ) : (
              <Text>Error: QR code data not available</Text>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
function back(){
  Navigator('/')
}
  return (
    <div className='ak'>
      <div className='container mt-4'>
        <button className ="btn btn-primary"onClick={back}>back</button>
        <h1 className='text-center fw-bold text-white'>My Bookings</h1>
        <div className="row mt-3">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <div key={booking._id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body shadow">
                    <div className="card-body">
                      <div style={{ marginTop: 20 }}>
                        <QRCode value={booking.qrCodeData} size={60} />
                      </div>
                      <h6 className="card-title"><strong>Booking ID:</strong> {booking._id}</h6>
                      <p className="card-text"><strong>Movie:</strong> {booking.name}</p>
                      <p className="card-text"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</p>
                      <p className="card-text"><strong>Time:</strong> {booking.time}</p>
                      <PDFDownloadLink document={<TicketDocument booking={booking} />} fileName={`ticket_${booking._id}.pdf`} style={{ textDecoration: 'none', color: '#0E46A3', fontWeight: 'bold' }}>
                        {({ loading }) => (loading ? 'Loading...' : 'Download Ticket')}
                      </PDFDownloadLink>

                      <button onClick={() => sendEmail(booking._id)}>Send Email with QR Code</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center fw-bold">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
