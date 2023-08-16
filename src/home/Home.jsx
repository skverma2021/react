import React from 'react';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/material';
import HomeImage from '../img/Designer.png';

const Home = () => {
  return (
    <>
      <Box position='relative' width='100%' height='100vh'>
        <img
          src={HomeImage}
          alt='Consultancy job management'
          width='100%/'
          height='80%'
        />
        <Box
          width='100%'
          height='20%'
          display={'flex'}
          flexDirection={'column'}
        >
          <Typography fontFamily={'pt sans narrow'} variant='h5'>
            Welcome to Consultancy Job Management System
          </Typography>
          <Box margin={'auto'}>
            <Button variant='outlined'>Most High Value Job</Button>
            <Button variant='contained'>Most Valued Client</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Home;
