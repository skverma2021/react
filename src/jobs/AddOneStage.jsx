import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import './workPlan.css';

const AddOneStage = (props) => {
  const { stageId, theStage, theJob, depttId, startDt, endDt } = props;
  // console.log(stageId, theStage, theJob, depttId, startDt, endDt);

  // const [upd, setUpd] = useState(false);
  let upd = false;
  if (depttId) upd = true;

  const [theDeptt, setTheDeptt] = useState(depttId);
  const [deptts, setDeptts] = useState([]);
  const [theStart, setTheStart] = useState(startDt);
  const [theEnd, setTheEnd] = useState(endDt);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/department`);
        setDeptts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const saveRec = async () => {
    try {
      if (!upd) {
        await axios.post('http://localhost:3000/api/WorkPlans', {
          jobId: theJob,
          stageId: stageId,
          depttId: theDeptt,
          schDtStart: theStart,
          schDtEnd: theEnd,
        });
      } else {
        await axios.put(
          `http://localhost:3000/api/WorkPlans/${theJob}/${stageId}`,
          {
            depttId: theDeptt,
            schDtStart: theStart,
            schDtEnd: theEnd,
          }
        );
      }
      console.log(`Done!`);
      // navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const bgColor = (theStage) => {
    if (theStage % 2 == 0) {
      return 'lightGray';
    } else {
      return 'lightBlue';
    }
  };

  return (
    <>
      <Box
        key={stageId}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',

          marginTop: '0px',
          backgroundColor: `${bgColor(stageId)}`,
          height: '50px',
        }}
      >
        <div style={{ width: '40px' }}>{stageId}</div>
        <div style={{ width: '300px' }}>{theStage}</div>
        <div style={{ width: '300px' }}>
          <select
            name='depttId'
            id='depttId'
            value={theDeptt || ''}
            onChange={(e) => {
              return setTheDeptt(e.target.value);
            }}
          >
            <option value=''>Select Deptt</option>
            {deptts.map((d) => {
              return (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ width: '300px' }}>
          <input
            value={theStart || ''}
            type='date'
            onChange={(e) => {
              return setTheStart(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '300px' }}>
          <input
            value={theEnd || ''}
            type='date'
            onChange={(e) => {
              return setTheEnd(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '200px' }}>
          <button onClick={saveRec}>save</button>
        </div>
      </Box>
    </>
  );
};

export default AddOneStage;
