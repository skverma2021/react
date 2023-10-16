import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

const YrDMnC = () => {
  const [jSumm, setJSumm] = useState([]);

  useEffect(() => {
    getJSumm();
  }, []);

  const getJSumm = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/jobs/summYDMC`);
      setJSumm(res.data);
      // console.log(eSumm);
    } catch (error) {
      console.log(error);
    }
  };
  const clientSumm = (mn) => {
    return jSumm.reduce(
      (accumulator, currentValue) => accumulator + currentValue[mn],
      0
    );
  };
  return (
    <>
      <h3>
        Booking Summary - Year-Department-Month-Wise Bookings across Clients
      </h3>
      <table style={{ border: '1px solid black', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black' }}>Year</th>
            <th style={{ border: '1px solid black' }}>Department</th>
            <th style={{ border: '1px solid black' }}>Month</th>
            <th style={{ border: '1px solid black' }}>ABC</th>
            <th style={{ border: '1px solid black' }}>XYZ</th>
            <th style={{ border: '1px solid black' }}>PQR</th>
            <th style={{ border: '1px solid black' }}>WWQ</th>
            <th style={{ border: '1px solid black' }}>JKW</th>
            <th style={{ border: '1px solid black' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {jSumm.map((t) => {
            return (
              <tr key={t.Yr}>
                <td style={{ border: '1px solid gray' }}>{t.Yr}</td>
                <td style={{ border: '1px solid gray' }}>{t.theDeptt}</td>
                <td style={{ border: '1px solid gray' }}>{t.Mn}</td>
                <td style={{ border: '1px solid gray', textAlign: 'right' }}>
                  {t.ABC}
                </td>
                <td style={{ border: '1px solid gray', textAlign: 'right' }}>
                  {t.XYZ}
                </td>
                <td style={{ border: '1px solid gray', textAlign: 'right' }}>
                  {t.PQR}
                </td>
                <td style={{ border: '1px solid gray', textAlign: 'right' }}>
                  {t.WWQ}
                </td>
                <td style={{ border: '1px solid gray', textAlign: 'right' }}>
                  {t.JKW}
                </td>

                <td style={{ border: '1px solid gray', textAlign: 'right' }}>
                  <b>{t.ABC + t.XYZ + t.PQR + t.WWQ + t.JKW}</b>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td style={{ border: '1px solid gray', textAlign: 'center' }}>-</td>
            <td style={{ border: '1px solid gray', textAlign: 'center' }}>-</td>
            <td style={{ border: '1px solid gray', textAlign: 'right' }}>
              <b>{clientSumm('ABC')}</b>
            </td>
            <td style={{ border: '1px solid gray', textAlign: 'right' }}>
              <b>{clientSumm('XYZ')}</b>
            </td>
            <td style={{ border: '1px solid gray', textAlign: 'right' }}>
              <b>{clientSumm('PQR')}</b>
            </td>
            <td style={{ border: '1px solid gray', textAlign: 'right' }}>
              <b>{clientSumm('WWQ')}</b>
            </td>
            <td style={{ border: '1px solid gray', textAlign: 'right' }}>
              <b>{clientSumm('JKW')}</b>
            </td>

            <td style={{ border: '1px solid gray', textAlign: 'right' }}>-</td>
          </tr>
        </tfoot>
      </table>
    </>
  );
};

export default YrDMnC;
