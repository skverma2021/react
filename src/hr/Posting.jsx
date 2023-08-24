import React from 'react';
import { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TPContext from '../context/tp/TPcontext';

const Posting = ({ theEmp }) => {
  // theEmp={id}
  // updEmpDesigId={updEmpDesigId}
  // updDesigId={updEmpDesig}
  // updDesigDt={updEmpDesigDt}
  // console.log(theEmp, updEmpDesigId, updDesigId, updDesigDt);
  const [fromDt, setFromDt] = useState('');
  const [desigs, setDesigs] = useState([]);
  const [theDesig, setTheDesig] = useState('');
  const tpContext = useContext(TPContext);
  // console.log(updId);
  const navigate = useNavigate();

  useEffect(() => {
    setTheDesig(tpContext.tpState.dgId);
    setFromDt(tpContext.tpState.edgFd);
  }, [tpContext.tpState.dgId, tpContext.tpState.edgFd]);

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
    //theId:'', theDesigId:'', theFromDt:''
    try {
      if (tpContext.tpState.edgId) {
        console.log(theEmp, theDesig, fromDt);
        await axios.put(
          `http://localhost:3000/api/designation/${tpContext.tpState.edgId}/empDesig`,
          {
            empId: theEmp,
            desigId: theDesig,
            fromDt: fromDt,
          }
        );
        tpContext.resetTP();
      } else {
        await axios.post('http://localhost:3000/api/designation/posting', {
          empId: theEmp,
          desigId: theDesig,
          fromDt: fromDt,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h4>Add Postings</h4>
        <div style={{ display: 'flex' }}>
          <select
            name='theDesig'
            id='theDesig'
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
