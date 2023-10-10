import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookDet = ({ empId, bookDay, m, y }) => {
  const [bData, setBData] = useState([]);
  const [saveCount, setSaveCount] = useState(0);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getBookingDet();
  }, []);

  const getBookingDet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/booking/${empId}/${bookDay.id}/${m}/${y}`
      );
      setBData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   setSaveCount(bData.toUpd);
  // }, []);

  const handleInputChange = (index, e) => {
    const newValue = e.target.value;
    setBData((prevBData) => {
      const updatedBData = [...prevBData];
      updatedBData[index].theBooking = newValue;
      return updatedBData;
    });
  };

  const handleUpdAdd = () => {
    bData.map((t) => {
      // if (t.toUpd > 0) {
      if (t.toUpd > 0 || (t.toUpd == 0 && saveCount > 0)) {
        //update
        if (t.theBooking)
          updBooking(empId, t.theWpId, bookDay.id, t.theBooking);
      } else {
        //Add
        if (t.theBooking > 0)
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
      setErr(false);
    } catch (error) {
      console.log(error);
      setErr(true);
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
      setSaveCount(saveCount + 1);
      setErr(false);
    } catch (error) {
      console.log(error);
      setErr(true);
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
              type='number'
              value={t.theBooking || ''}
              max='24'
              min='0'
              onChange={(e) => handleInputChange(index, e)}
              disabled={t.d1 < 0 || t.d2 < 0}
              style={{
                border: 'none',
                padding: '0',
                width: '100%',
                color: `${err ? 'red' : 'black'}`,
              }}
              // style={{ color: `${err ? 'red' : 'black'}` }}
            />
            {/* {t.d1}, {t.d2} */}
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
