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
  const bookingWidth = Math.round(
    parseFloat(85.0 / (empDet.curWorkPlans * 1.0)),
    0
  );
  return (
    <>
      <div style={{ backgroundColor: 'lightcyan', marginTop: '10px' }}>
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
      <table
        style={{ marginTop: '10px', borderCollapse: 'collapse', width: '100%' }}
      >
        <thead>
          <tr>
            <th style={{ background: 'lightgray', border: '1px solid' }}>
              day✖️job
            </th>
            {wpDet.map((t) => {
              return (
                <th
                  key={t.wpId}
                  style={{ border: '1px solid', background: 'lightblue' }}
                >
                  <small>
                    {t.nameJob}
                    <br />
                    <i>{t.nameStage}</i>
                    <br />
                    {t.dtStart} to {t.dtEnd}
                    <br />
                    {t.wpId}
                    <br />
                  </small>
                </th>
              );
            })}
            <th style={{ border: '1px solid', background: 'lightgray' }}>
              <strong>save</strong>
            </th>
          </tr>
        </thead>
        <tbody>
          {bookDays.map((d) => {
            return (
              <tr key={d.id}>
                <BookDet empId={id} bookDay={d} />
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
export default BookHead;
