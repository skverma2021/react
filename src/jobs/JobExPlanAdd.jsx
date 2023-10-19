import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
// import './workPlan.css';
import AddOneStage from './AddOneStage';

function JobExPlanAdd() {
  const [stages, setStages] = useState([]);
  const [theJob, setTheJob] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/jobs/client/${id}`
        );
        setTheJob(res.data[0]);
        // console.log(theJob);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getAllStages();
  }, []);

  const getAllStages = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/jobs/ExStages/${id}`
      );
      setStages(res.data);
      console.log(res.data);
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

      {/* <div id='spreadSheet'> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'lightBlue',
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
        <div style={{ width: '300px' }}>Value</div>
        <div style={{ width: '200px' }}>Action</div>
      </Box>
      {stages.map((t) => {
        return (
          <AddOneStage
            key={t.stageId}
            {...t}
            theJob={id}
            jobStartDt={theJob.jobStart}
            jobEndDt={theJob.jobEnd}
            jobVal={theJob.jobValue}
            saveCount={t.depttId ? 1 : 0}
          />
        );
      })}
      {/* </div> */}
    </>
  );
}

export default JobExPlanAdd;
