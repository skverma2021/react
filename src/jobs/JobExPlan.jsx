import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';

function JobExPlan() {
  console.log('Hi');
  const [stages, setStages] = useState([]);
  const [theJob, setTheJob] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/jobClient/${id}`
        );
        setTheJob(res.data[0]);
        // console.log(theJob);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // const { id } = useParams();
  console.log(id);

  useEffect(() => {
    getAllStages();
  }, []);

  const getAllStages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/WorkPlans/${id}`);
      setStages(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2>{theJob.jobDes}</h2>

      <div style={{ display: 'flex' }}>
        <h4>{theJob.jobClient}</h4>,<h4>Rs{theJob.jobValue} , </h4>
        <h4>[{theJob.jobStart} to </h4> <h4>{theJob.jobEnd}]</h4>
      </div>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'primary.light',
          marginTop: '20px',
          marginBottom: '20px',
          paddingTop: '20px',
          paddingBottom: '20px',
        }}
      >
        <div style={{ width: '40px' }}>SL</div>
        <div style={{ width: '300px' }}>Stage</div>
        <div style={{ width: '300px' }}>Department</div>
        <div style={{ width: '300px' }}>Date[start]</div>
        <div style={{ width: '300px' }}>Date[End]</div>
        <div style={{ width: '300px' }}>Allotted</div>
        <div style={{ width: '300px' }}>Consumed</div>
        {/* <div style={{ width: '200px' }}>Action</div> */}
      </Box>
      {stages.map((t) => {
        return (
          <Box
            key={t.id}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '10px',
            }}
          >
            <div style={{ width: '40px' }}>{t.id}</div>
            <div style={{ width: '300px' }}>{t.theStage}</div>
            <div style={{ width: '300px' }}>{t.theDeptt}</div>
            <div style={{ width: '300px' }}>{t.dtStart}</div>
            <div style={{ width: '300px' }}>{t.dtEnd}</div>
            <div style={{ width: '300px' }}>{t.allotted}</div>
            <div style={{ width: '300px' }}>{t.booked}</div>
            {/* <div style={{ width: '200px' }}>Act</div> */}
          </Box>
        );
      })}
    </>
  );
}

export default JobExPlan;
