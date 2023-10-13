import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookDet = ({ empId, bookDay, m, y, hourlyRate }) => {
  const [bData, setBData] = useState([]);
  const [saveCount, setSaveCount] = useState(0);
  // const [err, setErr] = useState(false);

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
      updatedBData[index].toSave = 1;
      return updatedBData;
    });
  };

  const setError = (index, errVal) => {
    const newValue = errVal;
    setBData((prevBData) => {
      const updatedBData = [...prevBData];
      updatedBData[index].inError = newValue;
      return updatedBData;
    });
  };
  const setToSave = (index) => {
    // const newValue = errVal;
    setBData((prevBData) => {
      const updatedBData = [...prevBData];
      updatedBData[index].toSave = 0;
      return updatedBData;
    });
  };

  const handleUpdAdd = () => {
    bData.map((t) => {
      // if (t.toUpd > 0) {
      if (t.toUpd > 0 || (t.toUpd == 0 && saveCount > 0)) {
        //update
        if (t.theBooking && t.toSave == 1)
          updBooking(
            t.idx,
            empId,
            t.theWpId,
            bookDay.id,
            t.theBooking,
            hourlyRate
          );
      } else {
        //Add
        if (t.theBooking > 0)
          addBooking(
            t.idx,
            empId,
            t.theWpId,
            bookDay.id,
            t.theBooking,
            hourlyRate
          );
      }
    });
  };

  const updBooking = async (i, e, wp, d, b, h) => {
    const rec = {
      empId: e,
      workPlanId: wp,
      dateId: d,
      booking: b ? b : 0,
      bookingVal: b * h,
    };
    try {
      const res = await axios.put(`http://localhost:3000/api/booking/`, rec);
      // setErr(false);
      setError(i, 0);
      setToSave(i);
    } catch (error) {
      console.log(error);
      // setErr(true);
      setError(i, 1);
    }
  };
  const addBooking = async (i, e, wp, d, b, h) => {
    const rec = {
      empId: e,
      workPlanId: wp,
      dateId: d,
      booking: b,
      bookingVal: b * h,
    };
    try {
      const res = await axios.post(`http://localhost:3000/api/booking/`, rec);
      setSaveCount(saveCount + 1);
      // setErr(false);
      setError(i, 0);
      setToSave(i);
    } catch (error) {
      console.log(error);
      // setErr(true);
      setError(i, 1);
    }
  };

  return (
    <>
      <td style={{ border: '1px solid', background: 'lightblue' }}>
        <small>{bookDay.theDay}</small>
      </td>
      {bData.map((t) => {
        return (
          <td
            key={t.idx}
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
              onChange={(e) => handleInputChange(t.idx, e)}
              disabled={t.d1 < 0 || t.d2 < 0}
              style={{
                border: 'none',
                padding: '0',
                width: '100%',
                color: `${t.inError ? 'red' : 'black'}`,
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
