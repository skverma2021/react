import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TransferTrail = ({ theEmp }) => {
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/department/${theEmp}/trail`
        );
        setTransfers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  // console.log(transfers);
  return (
    <>
      <h4>Past Transfers</h4>
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
          Department
        </div>
        <div style={{ width: '10%', border: '1px solid black' }}>
          with effect from
        </div>
      </div>
      {transfers.map((t) => {
        return (
          <div key={t.theId} style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '35%', border: '1px solid black' }}>
              {t.theDeptt}
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
export default TransferTrail;
