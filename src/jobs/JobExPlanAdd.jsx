import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import axios from 'axios';
// import './workPlan.css';
import AddOneStage from './AddOneStage';

function JobExPlanAdd() {
  const [stages, setStages] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getAllStages();
  }, []);

  const getAllStages = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/ExStages/${id}`);
      setStages(res.data);
      // console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* <div id='spreadSheet'> */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'primary.dark',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      >
        <div style={{ width: '40px' }}>SL</div>
        <div style={{ width: '300px' }}>Stage</div>
        <div style={{ width: '300px' }}>Department</div>
        <div style={{ width: '300px' }}>Date[start]</div>
        <div style={{ width: '300px' }}>Date[End]</div>
        <div style={{ width: '200px' }}>Action</div>
      </Box>
      {stages.map((t) => {
        return <AddOneStage key={t.stageId} {...t} theJob={id} />;
      })}
      {/* </div> */}
    </>
  );
}

export default JobExPlanAdd;
