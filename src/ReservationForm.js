import React, { useState } from 'react';
import axios from 'axios';

const ReservationForm = ({ prices }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedRoute, setSelectedRoute] = useState(null);

  const handleReservation = async () => {
    if (!selectedRoute) return;

    const reservation = {
      firstName,
      lastName,
      route: selectedRoute.route,
      totalPrice: selectedRoute.price,
      totalTime: selectedRoute.travelTime,
      companyName: selectedRoute.company.name,
    };

    try {
      const response = await axios.post('/api/reservation', reservation);
      alert(response.data.message);
    } catch (error) {
      console.error('Error making reservation:', error);
    }
  };

  return (
    <div>
      <h3>Make a Reservation</h3>
      <input
        type="text"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <select onChange={(e) => setSelectedRoute(JSON.parse(e.target.value))}>
        <option value="">Select a route</option>
        {prices.legs.map((leg, index) => (
          <option key={index} value={JSON.stringify(leg)}>
            {leg.route.from.name} to {leg.route.to.name} - {leg.price} credits
          </option>
        ))}
      </select>
      <button onClick={handleReservation}>Reserve</button>
    </div>
  );
};

export default ReservationForm;
