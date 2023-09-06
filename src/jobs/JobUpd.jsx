import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
} from '@mui/material';

import styled from '@emotion/styled';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useNavigate, useParams } from 'react-router-dom';

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

// id	int identity
// description	varchar(50)
// clientId	int
// ordDateStart	date
// ordDateEnd	date
// ordValue	money

function JobUpd() {
  const [job, setJob] = useState({});
  const [clients, setClients] = useState([]);
  const [theClient, setTheClient] = useState('');
  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        setJob(res.data[0]);
        setTheClient(res.data[0].clientId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clientsShort`);
        setClients(res.data);

        // setEmp({...emp, cityId:});
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // console.log(cities.length);

  const clientOptions = useMemo(
    () =>
      clients.map((c) => {
        if (!clients || clients.length === 0) {
          return null; // Or some placeholder options if desired
        }
        return (
          <MenuItem key={c.id} value={c.id}>
            {c.shortName}
          </MenuItem>
        );
      }),
    [clients]
  );

  // console.log(cityOptions);

  const onValChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const updJobData = async () => {
    try {
      await axios.put(`http://localhost:3000/api/jobs/${id}`, {
        ...job,
        clientId: theClient,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Typography variant='h4'>Edit a Job</Typography>

      <FormControl>
        <InputLabel>JobDescription:</InputLabel>
        <Input
          name='description'
          value={job.description || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!job.description }}
        />
      </FormControl>
      <FormControl fullWidth>
        {/* <InputLabel id='demo-simple-select-label'>Client</InputLabel> */}

        {/* <Select
          name='clientId'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={theClient || ''}
          label='Client'
          onChange={(e) => setTheClient(e.target.value)}
        >
          <MenuItem>""</MenuItem>
          {clientOptions}
        </Select> */}
        <label>Client:</label>
        <select
          name='clientId'
          id='clientId'
          value={theClient || ''}
          onChange={(e) => {
            return setTheClient(e.target.value);
          }}
        >
          {/* <option value=''>Select Client</option> */}
          {clients.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.shortName}
              </option>
            );
          })}
        </select>
      </FormControl>
      <FormControl>
        <InputLabel>StartDate:</InputLabel>
        <Input
          name='ordDateStart'
          value={job.ordDateStart || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!job.ordDateStart }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>EndDate:</InputLabel>
        <Input
          name='ordDateEnd'
          value={job.ordDateEnd || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!job.ordDateEnd }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>OrderValue:</InputLabel>
        <Input
          name='ordValue'
          value={job.ordValue || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!job.ordValue }}
        />
      </FormControl>

      <FormControl>
        <Button variant='contained' onClick={updJobData}>
          Update
        </Button>
      </FormControl>
    </Container>
  );
}

export default JobUpd;
