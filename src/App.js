import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReservationForm from './ReservationForm';

const App = () => {
  const [prices, setPrices] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await axios.get('/api/prices');
        setPrices(response.data);
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
  }, []);

  return (
    <div>
      <h1>Cosmos Odyssey</h1>
      {prices ? (
        <div>
          <h2>Available Routes</h2>
          {/* Render the travel routes here */}
          <ReservationForm prices={prices} />
        </div>
      ) : (
        <p>Loading prices...</p>
      )}
    </div>
  );
};

export default App;
