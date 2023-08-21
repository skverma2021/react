import React from 'react';
import { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Posting = ({ theEmp }) => {
  const [fromDt, setFromDt] = useState('');
  const [desigs, setDesigs] = useState([]);
  const [theDesig, setTheDesig] = useState('');
  // const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/designation/short`
        );
        setDesigs(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const saveRec = async () => {
    try {
      await axios.post('http://localhost:3000/api/designation/posting', {
        empId: theEmp,
        desigId: theDesig,
        fromDt: fromDt,
      });
      console.log(
        `Success: posting for ${theEmp} - ${theDesig} from ${fromDt} created`
      );
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>Postings</h4>
        <div style={{ display: 'flex' }}>
          <select
            name='theDesigId'
            id='theDesigId'
            value={theDesig || ''}
            onChange={(e) => setTheDesig(e.target.value)}
          >
            {desigs.map((d) => {
              return (
                <option key={d.theDesigId} value={d.theDesigId}>
                  {d.theDescription}
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

export default Posting;
