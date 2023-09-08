import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const BookMonthYear = () => {
  const [theMonth, setTheMonth] = useState(1);
  const [theYear, setTheYear] = useState(2023);
  const { id } = useParams();

  const openBookingSheet = () => {
    console.log(id, theMonth, theYear);
    return <Home />;
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginTop: '200px',
          marginLeft: '400px',
          marginRight: '400px',
        }}
      >
        <h2 style={{ marginBottom: '50px' }}>Booking for the Month</h2>
        <label style={{ background: 'lightblue' }}>Month:</label>
        <select
          style={{ marginBottom: '50px' }}
          name='theMonth'
          value={theMonth}
          onChange={(e) => {
            return setTheMonth(e.target.value);
          }}
          label='Month'
        >
          <option value={1}>January</option>
          <option value={2}>February</option>
          <option value={3}>March</option>
          <option value={4}>April</option>
          <option value={5}>May</option>
          <option value={6}>June</option>
          <option value={7}>July</option>
          <option value={8}>August</option>
          <option value={9}>September</option>
          <option value={10}>October</option>
          <option value={11}>November</option>
          <option value={12}>December</option>
        </select>

        <label style={{ background: 'lightblue' }}>Year:</label>
        <select
          style={{ marginBottom: '50px' }}
          name='theYear'
          value={theYear}
          onChange={(e) => {
            return setTheYear(e.target.value);
          }}
          label='Year'
        >
          <option value={2023}>2023</option>
          <option value={2024}>2024</option>
          <option value={2025}>2025</option>
        </select>

        <div>
          <Link to={`/booking/${id}/${theMonth}/${theYear}`}> bookings</Link>
        </div>
      </div>
    </>
  );
};

export default BookMonthYear;
