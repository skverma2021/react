import React, { useState, useContext } from 'react';
import UserContext from '../context/appUser/UserContext';
import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import ModeOfTravelIcon from '@mui/icons-material/ModeOfTravel';
import { Link } from 'react-router-dom';
// import { useSelector } from "react-redux";
// const linksArr = ["home", "diaries", "auth"];
// const loggedInLinks = ["home", "diaries", "add", "profile"];
const Header = () => {
  const userContext = useContext(UserContext);
  const { user } = userContext;
  console.log(typeof user[0]);

  const renderHRToolbar = () => {
    return (
      <>
        <Tab
          label='Emps'
          LinkComponent={Link}
          to='/emp'
          sx={{
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
              textUnderlineOffset: '18px',
            },
          }}
        />

        <Tab
          label='Transfers'
          LinkComponent={Link}
          to='/hr/transfer'
          sx={{
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
              textUnderlineOffset: '18px',
            },
          }}
        />

        <Tab
          label='Postings'
          LinkComponent={Link}
          to='/hr/posting'
          sx={{
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
              textUnderlineOffset: '18px',
            },
          }}
        />

        <Tab
          label='LogOut'
          LinkComponent={Link}
          to='/'
          sx={{
            textDecoration: 'none',
            ':hover': {
              textDecoration: 'underline',
              textUnderlineOffset: '18px',
            },
          }}
        />
      </>
    );
  };
  const renderBDToolbar = () => {
    return (
      <>
        {/* <Tab>Clients</Tab>
      <Tab>Jobs</Tab>
      <Tab>WorkPlans</Tab>
      <Tab>Logout</Tab> */}
      </>
    );
  };
  const defaultToolbar = () => {
    return (
      <Tab
        label='Auth'
        LinkComponent={Link}
        to='/auth'
        sx={{
          textDecoration: 'none',
          ':hover': {
            textDecoration: 'underline',
            textUnderlineOffset: '18px',
          },
        }}
      />
    );
  };
  const renderToolbar = () => {
    console.log(typeof user[0]);
    if (user[0]?.curDeptt) {
      switch (user[0].curDeptt) {
        case 13:
          return renderHRToolbar();
        case 6:
          return renderBDToolbar();
        default:
          return null; // Unknown department
      }
    } else {
      console.log('Hi');
      defaultToolbar(); // No user data, render nothing
    }
  };
  // const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [value, setValue] = useState();
  return (
    <AppBar sx={{ bgcolor: 'transparent', position: 'sticky' }}>
      <Toolbar>
        <ModeOfTravelIcon sx={{ color: 'black' }} />
        {renderToolbar()}
        {/* <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          sx={{ ml: 'auto', textDecoration: 'none' }}
        >
          {isLoggedIn
            ? loggedInLinks.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`/${link === 'home' ? '' : link}`}
                  sx={{
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '18px',
                    },
                  }}
                  key={link}
                  label={link}
                />
              ))
            : linksArr.map((link) => (
                <Tab
                  LinkComponent={Link}
                  to={`/${link === 'home' ? '' : link}`}
                  sx={{
                    textDecoration: 'none',
                    ':hover': {
                      textDecoration: 'underline',
                      textUnderlineOffset: '18px',
                    },
                  }}
                  key={link}
                  label={link}
                />
              ))}
        </Tabs> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
