import React, { useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
// import './workPlan.css';

const AddOneStage = (props) => {
  const { stageId, theStage, theJob, depttId, startDt, endDt } = props;
  // console.log(stageId, theStage, theJob, depttId, startDt, endDt);

  // const [upd, setUpd] = useState(false);
  let upd = false;
  if (depttId) upd = true;

  const [theDeptt, setTheDeptt] = useState(depttId);
  const [theStart, setTheStart] = useState(startDt);
  const [theEnd, setTheEnd] = useState(endDt);

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

  return (
    <>
      <Box
        key={stageId}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '10px',
        }}
      >
        <div style={{ width: '40px' }}>{stageId}</div>
        <div style={{ width: '300px' }}>{theStage}</div>
        <div style={{ width: '300px' }}>
          <input
            value={theDeptt || ''}
            onChange={(e) => {
              return setTheDeptt(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '300px' }}>
          <input
            value={theStart || ''}
            onChange={(e) => {
              return setTheStart(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '300px' }}>
          <input
            value={theEnd || ''}
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
