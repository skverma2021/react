import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import BookDet from './BookDet';
// import './book.css';

const BookHead = () => {
  const [empDet, setEmpDet] = useState({});
  const [wpDet, setWpDet] = useState([]);
  const [bookDays, setBookDays] = useState([]);

  const { id, m, y } = useParams();

  useEffect(() => {
    getEmpDet();
    getWpDet();
    getBookingDates();
  }, []);

  const getEmpDet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/empBookHead/${id}`
      );
      setEmpDet(res.data[0]);
      //   console.log(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const getWpDet = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/bookHeads/${id}`);
      setWpDet(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getBookingDates = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/bookDates/${m}/${y}`
      );
      setBookDays(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const bookingWidth = parseInt(85.0 / empDet.curWorkPlans);
  return (
    <>
      <div>
        <u>
          <strong>{empDet.theName}</strong>, {empDet.theDesig}, [
          {empDet.theGrade}]
        </u>
      </div>
      <div>
        <i>
          {empDet.theDeptt}, {empDet.theDiscp}, [{empDet.theHrRate}Rs/hr,
          workPlans:{empDet.curWorkPlans}]
        </i>
      </div>
      {/* the entire sheet */}
      <div>
        {/* the header */}
        <div style={{ display: 'flex', width: '100%', marginTop: '20px' }}>
          <div style={{ width: '10%' }}>
            <strong>Date</strong>
          </div>
          <div
            style={{
              display: 'flex',
              width: '85%',
              justifyContent: 'space-between',
            }}
          >
            {wpDet.map((t) => {
              return (
                <div
                  key={t.wpId}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: `${bookingWidth}%`,
                  }}
                >
                  <div>
                    {' '}
                    <strong>{t.nameJob}</strong>
                  </div>
                  <div>
                    <i>{t.nameStage}</i>
                  </div>
                  <div>{t.dtStart}</div>
                  <div>{t.dtEnd}</div>
                  <div>{t.wpId}</div>
                </div>
              );
            })}
          </div>
          <div style={{ width: '5%' }}>
            <strong>action</strong>
          </div>
        </div>
        {bookDays.map((d) => {
          return <BookDet key={d.id} empId={id} bookDay={d} />;
        })}
      </div>
    </>
  );
};
// {bookDays.map((d) => {
//   return (
//     <BookDet
//       key={d.id}
//       empId={id}
//       wps={wpDet}
//       bookDay={d}
//       noWP={empDet.curWorkPlans}
//     />
//   );
// })}
export default BookHead;
