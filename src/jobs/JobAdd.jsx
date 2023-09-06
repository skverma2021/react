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
import { useNavigate } from 'react-router-dom';

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

const jobRec = {
  description: '',
  clientId: '',
  ordDateStart: '',
  ordDateEnd: '',
  ordValue: '',
};
const JobAdd = () => {
  const [job, setJob] = useState(jobRec);
  const [clients, setClients] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clientsShort`);
        setClients(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(clients.length);
  const clientData = useMemo(() => clients, [clients]);

  const onValChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  const postJobData = async () => {
    try {
      await axios.post('http://localhost:3000/api/jobs', job);
      console.log(`Success: ${job.id} created`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <Typography variant='h4'>Add a Job</Typography>

      <FormControl>
        <InputLabel>Description:</InputLabel>
        <Input
          name='description'
          value={job.description}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Client:</InputLabel>
        <Select
          name='clientId'
          labelId='demo-simple-select-standard-label'
          id='demo-simple-select-standard'
          value={job.clientId}
          onChange={(e) => {
            return onValChange(e);
          }}
          label='Client'
        >
          {clients.map((c) => {
            return (
              <MenuItem key={c.id} value={c.id}>
                {c.shortName}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel>StartDate:</InputLabel>
        <Input
          name='ordDateStart'
          value={job.ordDateStart}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>EndDate:</InputLabel>
        <Input
          name='ordDateEnd'
          value={job.ordDateEnd}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>OrderValue:</InputLabel>
        <Input
          name='ordValue'
          value={job.ordValue}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <Button variant='contained' onClick={postJobData}>
          Add
        </Button>
      </FormControl>
    </Container>
  );
};
export default JobAdd;
