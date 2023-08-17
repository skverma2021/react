import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const deleteJobData = async (theJobId) => {
  try {
    const res = await axios.delete(
      `http://localhost:3000/api/jobs/${theJobId}`
    );
  } catch (error) {
    console.log(error);
  }
};

const columns = [
  {
    headerName: 'JobID',
    footerName: 'JobID',
    field: 'id',
    width: 100,
    type: 'number',
    sortable: true,
  },
  {
    headerName: 'JobDescription',
    footerName: 'JobDescription',
    field: 'description',
    width: 350,
    type: 'text',
    sortable: true,
  },
  {
    headerName: 'Client',
    footerName: 'Client',
    field: 'shortName',
    width: 150,
    type: 'text',
    sortable: true,
  },
  {
    headerName: 'StartDate',
    footerName: 'StartDate',
    field: 'theStart',
    width: 150,
    type: 'text',
    sortable: true,
  },
  {
    headerName: 'EndDate',
    footerName: 'EndDate',
    field: 'theEnd',
    width: 150,
    type: 'text',
    sortable: true,
  },
  {
    field: 'id1',
    headerName: 'upd',
    width: 80,
    renderCell: (params) => <Link to={`./upd/${params.id}`}>updJob</Link>,
  },
  {
    field: 'id2',
    headerName: 'exPlan',
    width: 80,
    renderCell: (params) => <Link to={`./ex/${params.id}`}>exPlan</Link>,
  },
  {
    field: 'id3',
    headerName: 'upd',
    width: 80,
    renderCell: (params) => <Link to={`./exAdd/${params.id}`}>addExPlan</Link>,
  },
];
const JobAll = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    getAllJobs();
  }, []);

  const getAllJobs = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/jobs`);
      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box sx={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={jobs}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 20,
            },
          },
        }}
        pageSizeOptions={[20]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default JobAll;
