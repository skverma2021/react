import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography, styled } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HRhome = () => {
  return (
    <>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Item>
              <Button
                // color='primary'
                variant='contained'
                style={{ marginRight: 10 }}
                component={Link}
                to={`./emp`}
              >
                Employees
              </Button>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <Button
                // color='primary'
                variant='contained'
                style={{ marginRight: 10 }}
                component={Link}
                to={`./transfer`}
              >
                Transfers
              </Button>
            </Item>
          </Grid>

          <Grid item xs={12}>
            <Item>
              <Button
                // color='primary'
                variant='contained'
                style={{ marginRight: 10 }}
                component={Link}
                to={`./posting`}
              >
                Postings
              </Button>
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default HRhome;
