import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
// import './workPlan.css';

const AddOneStage = (props) => {
  const {
    stageId,
    theStage,
    theJob,
    depttId,
    startDt,
    endDt,
    theVal,
    jobStartDt,
    jobEndDt,
    jobValue,
  } = props;
  // console.log(stageId, theStage, theJob, depttId, startDt, endDt);

  // const [upd, setUpd] = useState(false);
  let upd = false;
  if (depttId) upd = true;

  const [theDeptt, setTheDeptt] = useState(depttId);
  const [deptts, setDeptts] = useState([]);
  const [theStart, setTheStart] = useState(startDt);
  const [theEnd, setTheEnd] = useState(endDt);
  const [stageVal, setStageVal] = useState(theVal);
  const [err, setErr] = useState('');
  const [errorOccurred, setErrorOccurred] = useState(false);

  const goBack = () => {
    window.history.back();
  };

  useEffect(() => {
    // Simulate an error condition
    if (err) {
      setErrorOccurred(true);

      // Set a delay before going back
      const timeoutId = setTimeout(goBack, 5000);

      // Clear the timeout if the component unmounts (optional)
      return () => clearTimeout(timeoutId);
    }
  }, [err]);

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
          shareVal: stageVal,
        });
      } else {
        await axios.put(
          `http://localhost:3000/api/WorkPlans/${theJob}/${stageId}`,
          {
            depttId: theDeptt,
            schDtStart: theStart,
            schDtEnd: theEnd,
            shareVal: stageVal,
          }
        );
      }
      console.log(`Done!`);
      // navigate('/');
    } catch (error) {
      console.log(error);
      setErr('Record could not be added');
    }
  };

  const bgColor = (theStage) => {
    if (theStage % 2 == 0) {
      return 'lightGray';
    } else {
      return 'lightBlue';
    }
  };
  if (err)
    return (
      <div>
        {errorOccurred ? (
          <p style={{ color: 'red' }}>
            An error occurred. Going back to the previous page in 5 seconds...
          </p>
        ) : (
          <p>No error.</p>
        )}
        <button onClick={goBack}>Cancel</button>
      </div>
    );
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
            min={jobStartDt}
            max={jobEndDt}
            onChange={(e) => {
              return setTheStart(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '300px' }}>
          <input
            value={theEnd || ''}
            type='date'
            min={jobStartDt}
            max={jobEndDt}
            onChange={(e) => {
              return setTheEnd(e.target.value);
            }}
          />
        </div>
        <div style={{ width: '300px' }}>
          <input
            value={stageVal || ''}
            name='stageVal'
            min='0'
            max={jobValue}
            onChange={(e) => {
              return setStageVal(e.target.value);
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
