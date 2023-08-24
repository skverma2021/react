import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import TPContext from '../context/tp/TPcontext';

const PostingTrail = ({ theEmp }) => {
  const [postings, setPostings] = useState([]);
  const tpContext = useContext(TPContext);

  // const prepUpdRec = (id, desig, dt) => {
  //   updEmpDesigIdFn(id);
  //   updDesigIdFn(desig);
  //   updDesigDtFn(dt);
  // };

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

  const deleteEmpDesig = async (theEmpDesigId) => {
    if (postings.length == 1) return;
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/designation/${theEmpDesigId}/empDesig`
      );
    } catch (error) {
      console.log(error);
    }
  };
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
        <div style={{ width: '30%', border: '1px solid black' }}>
          Discipline
        </div>
        <div style={{ width: '10%', border: '1px solid black' }}>Grade</div>
        <div style={{ width: '10%', border: '1px solid black' }}>
          HourlyRate
        </div>
        <div style={{ width: '30%', border: '1px solid black' }}>
          Designation
        </div>
        <div style={{ width: '10%', border: '1px solid black' }}>from</div>
        <div style={{ width: '5%', border: '1px solid black' }}>upd</div>
        <div style={{ width: '5%', border: '1px solid black' }}>del</div>
      </div>
      {postings.map((t) => {
        return (
          <div key={t.theId} style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '30%', border: '1px solid black' }}>
              {t.theDiscp}
            </div>
            <div style={{ width: '10%', border: '1px solid black' }}>
              {t.theGrade}
            </div>
            <div style={{ width: '10%', border: '1px solid black' }}>
              {t.theHourlyRate}
            </div>
            <div style={{ width: '30%', border: '1px solid black' }}>
              {t.theDesig}
            </div>
            <div style={{ width: '10%', border: '1px solid black' }}>
              {t.theFromDt}
            </div>
            <div style={{ width: '5%', border: '1px solid black' }}>
              <Link
                onClick={() =>
                  tpContext.setDg(t.theId, t.theDesigId, t.theFromDt)
                }
              >
                🖍️
              </Link>
            </div>
            <div style={{ width: '5%', border: '1px solid black' }}>
              <Link onClick={() => deleteEmpDesig(`${t.theId}`)}> 🗑️</Link>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PostingTrail;
