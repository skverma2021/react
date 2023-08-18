import React, { useState, useContext } from 'react';
import UserContext from '../context/appUser/UserContext';
import {
  FormGroup,
  FormControl,
  InputLabel,
  Input,
  Typography,
  Button,
} from '@mui/material';

import styled from '@emotion/styled';
import Home from '../home/Home';

const Container = styled(FormGroup)`
  width: 50%;
  margin: 5% auto 0 25%;
  & > div {
    margin-top: 20px;
  }
`;

const Auth = ({ setIsAuthenticated }) => {
  const userContext = useContext(UserContext);
  const { user, getUser } = userContext;

  const [theEmp, setTheEmp] = useState({ eMail: '', pass: '' });

  const onValChange = (e) => {
    setTheEmp({ ...theEmp, [e.target.name]: e.target.value });
  };

  const validateEmp = async () => {
    console.log(theEmp.eMail, theEmp.pass);
    try {
      await getUser(theEmp.eMail, theEmp.pass);
      // navigate('/');
      setIsAuthenticated(true);
      if (user.length !== 0) return <Home />;
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(user.length);
  //   id	name
  // 1	Electrical Engineering
  // 2	Mechanical Engineering
  // 3	Civil Engineering
  // 4	Electronics and Instrumentation
  // 5	Information Technology
  // 6	Business Development Division
  // 7	Project Planning Division
  // 8	Project Monitoring Division
  // 9	Contracts
  // 10	Reaserch and Development
  // 11	Documentation
  // 12	Project Implementation
  // 13	Human Resource
  // 14	Finance
  // const validateEmp = () => {
  //   console.log(theEmp.eMail, theEmp.pass);
  //   getUser(theEmp.eMail, theEmp.pass);
  //   console.log(user);
  // };

  return (
    <Container>
      <Typography variant='h4'>Login</Typography>

      <FormControl>
        <InputLabel>E-Mail Id:</InputLabel>
        <Input
          name='eMail'
          value={theEmp.eMail}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>

      <FormControl>
        <InputLabel>Password:</InputLabel>
        <Input
          name='pass'
          value={theEmp.pass}
          onChange={(e) => {
            return onValChange(e);
          }}
        />
      </FormControl>

      <FormControl>
        <Button variant='contained' onClick={validateEmp}>
          Submit
        </Button>
      </FormControl>
    </Container>
  );
};

export default Auth;
