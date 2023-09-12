import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import moment from 'moment';
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

// const Container = styled(FormGroup)`
//   width: 50%;
//   margin: 5% auto 0 25%;
//   & > div {
//     margin-top: 20px;
//   }
// `;
const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

// const empRec = {
//   uId: '',
//   fName: '',
//   mName: '',
//   sName: '',
//   title: '',
//   dob: '',
//   gender: '',
//   addLine1: '',
//   cityId: '',
//   mobile: '',
//   eMailId: '',
//   passwd: '',
// };
const EmpUpd = () => {
  const [emp, setEmp] = useState({});
  const [cities, setCities] = useState([]);
  const [theCity, setTheCity] = useState('');
  const [err, setErr] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/emps/${id}`);
        setEmp(res.data[0]);
        setTheCity(res.data[0].cityId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/cities`);
        setCities(res.data);

        // setEmp({...emp, cityId:});
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  // console.log(cities.length);

  const cityOptions = useMemo(
    () =>
      cities.map((c) => {
        if (!cities || cities.length === 0) {
          return null; // Or some placeholder options if desired
        }
        return (
          <MenuItem key={c.id} value={c.id}>
            {c.cityName}
          </MenuItem>
        );
      }),
    [cities]
  );

  // console.log(cityOptions);

  const onValChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const updEmpData = async () => {
    try {
      await axios.put(`http://localhost:3000/api/emps/${id}`, {
        ...emp,
        cityId: theCity,
      });
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };
  if (err) return <div>Error: {err}</div>;
  return (
    <Container>
      <Typography variant='h4'>Edit an Employee</Typography>

      <FormControl>
        <InputLabel>Unique ID</InputLabel>
        <Input
          name='uId'
          value={emp.uId || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.uId }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>First Name:</InputLabel>
        <Input
          name='fName'
          value={emp.fName || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.fName }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Middle Name:</InputLabel>
        <Input
          name='mName'
          value={emp.mName || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Surname:</InputLabel>
        <Input
          name='sName'
          value={emp.sName || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.sName }}
        />
      </FormControl>
      <FormControl>
        <label>
          <strong>Title:</strong>
        </label>
        <br />
        <div style={{ display: 'flex' }}>
          <input
            type='radio'
            id='Mr'
            name='title'
            value='Mr'
            checked={emp.title == 'Mr'}
            onChange={(e) => {
              return onValChange(e);
            }}
          />
            <label for='Mr'>Mr</label>
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type='radio'
            id='Ms'
            name='title'
            value='Ms'
            checked={emp.title == 'Ms'}
            onChange={(e) => {
              return onValChange(e);
            }}
          />
            <label for='Ms'>Ms</label>
        </div>
        {/* <InputLabel>Title:</InputLabel>
        <Input
          name='title'
          value={emp.title}
          onChange={(e) => {
            return onValChange(e);
          }}

        /> */}
      </FormControl>
      <FormControl>
        <label>
          <strong>Date of Birth:</strong>
        </label>
        <input
          name='dob'
          type='date'
          // value={emp.dob || ''}
          value={moment(emp.dob).format('YYYY-MM-DD')}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.dob }}
        />
      </FormControl>
      <FormControl>
        <label>
          <strong>Gender:</strong>
        </label>
        <br />
        {/* <Input
          name='gender'
          value={emp.gender || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
        /> */}
        <div style={{ display: 'flex' }}>
          <input
            type='radio'
            id='male'
            name='gender'
            value='M'
            checked={emp.gender == 'M'}
            onChange={(e) => {
              return onValChange(e);
            }}
          />
            <label for='male'>Male</label>
        </div>
        <div style={{ display: 'flex' }}>
          <input
            type='radio'
            id='female'
            name='gender'
            value='F'
            checked={emp.gender == 'F'}
            onChange={(e) => {
              return onValChange(e);
            }}
          />
            <label for='female'>Female</label>
        </div>
      </FormControl>
      <FormControl>
        <InputLabel>Address:</InputLabel>
        <Input
          name='addLine1'
          value={emp.addLine1 || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.addLine1 }}
        />
      </FormControl>
      <FormControl fullWidth>
        {/* <InputLabel id='demo-simple-select-label'>City</InputLabel>
        <Select
          name='cityId'
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={theCity}
          label='City'
          onChange={(e) => setTheCity(e.target.value)}
        >

          <MenuItem>""</MenuItem>
          {cityOptions}

        </Select> */}
        <label>
          <strong>City:</strong>
        </label>
        <select
          name='cityId'
          id='cityId'
          value={theCity || ''}
          onChange={(e) => {
            return setTheCity(e.target.value);
          }}
        >
          {/* <option value=''>Select Client</option> */}
          {cities.map((c) => {
            return (
              <option key={c.id} value={c.id}>
                {c.cityName}
              </option>
            );
          })}
        </select>
      </FormControl>
      <FormControl>
        <InputLabel>Mobile:</InputLabel>
        <Input
          name='mobile'
          type='tel'
          value={emp.mobile || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.mobile }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>eMail ID:</InputLabel>
        <Input
          name='eMailId'
          type='email'
          value={emp.eMailId || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.eMailId }}
        />
      </FormControl>
      <FormControl>
        <InputLabel>Password:</InputLabel>
        <Input
          name='passwd'
          type='password'
          value={emp.passwd || ''}
          onChange={(e) => {
            return onValChange(e);
          }}
          // InputLabelProps={{ shrink: !!emp.passwd }}
        />
      </FormControl>
      <FormControl>
        <Button variant='contained' onClick={updEmpData}>
          Update
        </Button>
      </FormControl>
    </Container>
  );
};

export default EmpUpd;
