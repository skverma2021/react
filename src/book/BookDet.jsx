import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
// import './book.css';

const BookDet = ({ empId, bookDay }) => {
  const [bData, setBData] = useState([]);

  useEffect(() => {
    getBookingDet();
  }, []);

  const getBookingDet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/booking/${empId}/${bookDay.id}`
      );
      setBData(res.data);
      //   console.log(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (index, e) => {
    const newValue = e.target.value;
    setBData((prevBData) => {
      const updatedBData = [...prevBData];
      updatedBData[index].theBooking = newValue;
      return updatedBData;
    });
  };

  const handleUpdAdd = () => {
    // console.log('Hi');
    bData.map((t) => {
      if (t.toUpd > 0) {
        //update
        updBooking(empId, t.theWpId, bookDay.id, t.theBooking);
      } else {
        //Add
        addBooking(empId, t.theWpId, bookDay.id, t.theBooking);
      }
    });
  };

  const updBooking = async (e, wp, d, b) => {
    const rec = {
      empId: e,
      workPlanId: wp,
      dateId: d,
      booking: b ? b : 0,
    };
    try {
      const res = await axios.put(`http://localhost:3000/api/booking/`, rec);
      // console.log(rec);
      // console.log('Hi here!');
    } catch (error) {
      console.log(error);
    }
  };
  const addBooking = async (e, wp, d, b) => {
    const rec = {
      empId: e,
      workPlanId: wp,
      dateId: d,
      booking: b,
    };
    try {
      const res = await axios.post(`http://localhost:3000/api/booking/`, rec);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <td style={{ border: '1px solid', background: 'lightblue' }}>
        <small>{bookDay.theDay}</small>
      </td>
      {bData.map((t, index) => {
        return (
          <td
            key={index}
            style={{
              margin: '0',
              padding: '0',
              textAlign: 'center',
              border: '1px solid',
            }}
          >
            <input
              type='text'
              value={t.theBooking || ''}
              onChange={(e) => handleInputChange(index, e)}
              style={{ border: 'none', padding: '0', width: '100%' }}
            />
          </td>
        );
      })}
      <td
        style={{
          border: '1px solid',
          textAlign: 'center',
        }}
      >
        <button onClick={handleUpdAdd}>🖍️</button>
      </td>
      {/* <div style={{ width: '5%' }}>action</div>💾🖍️💽 */}
    </>
  );
};

export default BookDet;
