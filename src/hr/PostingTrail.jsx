import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PostingTrail = ({ theEmp }) => {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/designation/${theEmp}/trail`
        );
        setPostings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <h4>Past Promotions</h4>
      <p>
        <i>Journey so far</i>
      </p>
      <div
        style={{
          display: 'flex',
          width: '100%',
          backgroundColor: 'lightslategray',
        }}
      >
        <div style={{ width: '35%', border: '1px solid black' }}>
          Discipline
        </div>
        <div style={{ width: '10%', border: '1px solid black' }}>Grade</div>
        <div style={{ width: '10%', border: '1px solid black' }}>
          HourlyRate
        </div>
        <div style={{ width: '35%', border: '1px solid black' }}>
          Designation
        </div>
        <div style={{ width: '10%', border: '1px solid black' }}>
          with effect from
        </div>
      </div>
      {postings.map((t) => {
        return (
          <div key={t.theId} style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '35%', border: '1px solid black' }}>
              {t.theDiscp}
            </div>
            <div style={{ width: '10%', border: '1px solid black' }}>
              {t.theGrade}
            </div>
            <div style={{ width: '10%', border: '1px solid black' }}>
              {t.theHourlyRate}
            </div>
            <div style={{ width: '35%', border: '1px solid black' }}>
              {t.theDesig}
            </div>
            <div style={{ width: '10%', border: '1px solid black' }}>
              {t.theFromDt}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostingTrail;
