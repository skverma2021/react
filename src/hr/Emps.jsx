import * as React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  {
    headerName: 'UID',
    width: 50,
    field: 'id',
    type: 'number',
  },
  {
    headerName: 'Name',
    width: 175,
    field: 'empFullName',
    sortable: true,
  },
  {
    headerName: 'Designation',
    width: 200,
    field: 'theDesig',
    sortable: true,
  },
  {
    headerName: 'Department',
    width: 200,
    field: 'theDeptt',
    sortable: true,
  },
  {
    headerName: 'DOB',
    width: 100,
    field: 'theDob',
  },
  {
    headerName: 'Address',
    width: 150,
    field: 'addLine1',
  },
  {
    headerName: 'City',
    width: 100,
    field: 'theCity',
    sortable: true,
  },
  {
    headerName: 'Mobile',
    width: 125,
    field: 'mobile',
    sortable: true,
  },
  {
    headerName: 'EMail',
    width: 175,
    field: 'eMailId',
  },
  {
    // field: 'id',
    headerName: 'Edit',
    width: 75,
    renderCell: (params) => (
      <>
        <Link to={`./upd/${params.id}`}> 🖍️</Link>
        {/* <a
          href={`./emp/upd/${params.id}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          🖍️
        </a> */}
        <Link onClick={() => deleteEmpData(`${params.id}`)}> 🗑️</Link>
        {/* <a onClick={() => deleteEmpData(`${params.id}`)}>🗑️</a> */}
        {/* <a
          href={`./emp/upd/${params.id}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          📙
        </a> */}
      </>
    ),
  },
];

const deleteEmpData = (t) => {
  console.log(t);
};

const Emps = () => {
  const [emps, setEmps] = useState([]);

  useEffect(() => {
    getAllEmps();
  }, []);

  const getAllEmps = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/emps`);
      setEmps(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Box sx={{ height: 1000, width: '100%' }}>
      <DataGrid
        rows={emps}
        getRowId={(row) => row.id + row.mobile}
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

export default Emps;
