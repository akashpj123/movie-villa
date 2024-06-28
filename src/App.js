import React from 'react';
import Carousel from './components/auth/carousel/carousel';
import ShowCard from './components/movie/ShowCard';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div style={{backgroundColor: '#5a082d'}}>
      <Navbar />
      <Carousel />
      <ShowCard />
      <Carousel />
      <ShowCard />
      
        </div>
    
  );
}

export default Home;
