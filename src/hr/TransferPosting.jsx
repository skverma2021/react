import React from 'react';
import Posting from './Posting';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Transfer from './Transfer';

const TransferPosting = () => {
  const [empDet, setEmpDet] = useState({});
  const { id } = useParams();
  useEffect(() => {
    getEmpDet();
  }, []);

  const getEmpDet = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/empBookHead/${id}`
      );
      setEmpDet(res.data[0]);
      console.log(res.data[0]);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          width: '100%',
          border: '1px solid black',
          backgroundColor: 'lightslategray',
        }}
      >
        <div style={{ height: '20vh', width: '100%' }}>
          {/* empDetails */}
          <div
            style={{
              backgroundColor: 'lightcyan',
              height: '50%',
            }}
          >
            <h2>{empDet.theName}</h2>, {empDet.theDesig}, [{empDet.theGrade}]
          </div>
          <div
            style={{
              backgroundColor: 'lightcyan',
            }}
          >
            <i>
              <h3>
                {empDet.theDeptt}, {empDet.theDiscp}
              </h3>
              , [{empDet.theHrRate}Rs/hr]
            </i>
          </div>
        </div>
        <div style={{ display: 'flex' }}>
          {/* Postings/Promotions */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <Posting theEmp={id} />
            </div>
            <div>PreadUpdDel</div>
          </div>
          {/* Transfers */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div>
              <Transfer theEmp={id} />
            </div>
            <div>TreadUpdDel</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransferPosting;