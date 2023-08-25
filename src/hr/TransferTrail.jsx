import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TPContext from '../context/tp/TPcontext';

const TransferTrail = ({ theEmp }) => {
  const [transfers, setTransfers] = useState([]);
  const tpContext = useContext(TPContext);

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
  }, [tpContext.tpState.newRecDeptt, tpContext.tpState.updRecDeptt]);
  // console.log(transfers);
  const deleteEmpDeptt = async (theEmpDepttId) => {
    if (transfers.length == 1) return;
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/department/${theEmpDepttId}/empDeptt`
      );
    } catch (error) {
      console.log(error);
    }
  };
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
        <div style={{ width: '45%', border: '1px solid black' }}>
          Department
        </div>
        <div style={{ width: '45%', border: '1px solid black' }}>from</div>
        <div style={{ width: '5%', border: '1px solid black' }}>upd</div>
        <div style={{ width: '5%', border: '1px solid black' }}>del</div>
      </div>
      {transfers.map((t) => {
        return (
          <div key={t.theId} style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '45%', border: '1px solid black' }}>
              {t.theDeptt}
            </div>
            <div style={{ width: '45%', border: '1px solid black' }}>
              {t.theFromDt}
            </div>

            <div style={{ width: '5%', border: '1px solid black' }}>
              <Link
                onClick={() =>
                  tpContext.setDp(t.theId, t.theDepttId, t.theFromDt)
                }
              >
                🖍️
              </Link>
            </div>
            <div style={{ width: '5%', border: '1px solid black' }}>
              <Link onClick={() => deleteEmpDeptt(`${t.theId}`)}> 🗑️</Link>
            </div>
          </div>
        );
      })}
    </>
  );
};
export default TransferTrail;
