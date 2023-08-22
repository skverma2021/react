import React from 'react';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Transfer = ({ theEmp }) => {
  const [fromDt, setFromDt] = useState('');
  const [deptts, setDeptts] = useState([]);
  const [theDeptt, setTheDeptt] = useState('');
  // const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/department/short`
        );
        setDeptts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const saveRec = async () => {
    try {
      await axios.post('http://localhost:3000/api/department/posting', {
        empId: theEmp,
        depttId: theDeptt,
        fromDt: fromDt,
      });
      console.log(
        `Success: transfer for ${theEmp} - ${theDeptt} from ${fromDt} created`
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>Transfers</h4>
        <div style={{ display: 'flex' }}>
          <select
            name='theDeptt'
            id='theDeptt'
            value={theDeptt || ''}
            onChange={(e) => setTheDeptt(e.target.value)}
          >
            {deptts.map((d) => {
              return (
                <option key={d.depttId} value={d.depttId}>
                  {d.depttName}
                </option>
              );
            })}
          </select>
          <input
            name='fromDt'
            value={fromDt}
            onChange={(e) => setFromDt(e.target.value)}
          />
          <button onClick={saveRec}>Save</button>
        </div>
      </div>
    </>
  );
};
export default Transfer;
