import React, { useContext } from 'react';
import UserContext from '../context/appUser/UserContext';
import { AppBar, Tab, Tabs, Toolbar } from '@mui/material';
import WorkHistorySharpIcon from '@mui/icons-material/WorkHistorySharp';
import { Link } from 'react-router-dom';

function ToolBar() {
  const userContext = useContext(UserContext);
  const { user, logOutUser } = userContext;

  const renderHRToolbar = () => (
    <div>
      <Link to='/hr/emp'> allEmps</Link>
      {` `}
      <Link to='/hr/emp/add'> newEmp</Link>
      {` `}
      <Link to='/hr/transfer'> Transfers</Link>
      {` `}
      <Link to='/hr/posting'> Postings</Link>
      {` `}
      {/* <Link to='/'> Logout</Link> */}
      {/* <a href={`/`}>LogOut</a> */}
      <Link to='/' onClick={logOutUser}>
        {' '}
        Logout
      </Link>
    </div>
  );

  const renderBDToolbar = () => (
    <div>
      <Link to='/bd/jobs'> allJobs</Link>
      {` `}
      <Link to='/bd/jobs/add'> addJobs</Link>
      {` `}
      {/* <Link to='/hr/posting'> Postings</Link> */}
      {` `}
      {/* <Link to='/'> Logout</Link> */}
      {/* <a href={`/`}>LogOut</a> */}
      <Link to='/' onClick={logOutUser}>
        {' '}
        Logout
      </Link>
    </div>
  );
  const renderBookingToolbar = () => (
    <div>
      <Link to={`/booking/${user[0].id}/6/2023`}> bookings</Link>
      {` `}

      <Link to='/' onClick={logOutUser}>
        {' '}
        Logout
      </Link>
    </div>
  );
  const defaultToolbar = () => (
    <div>
      {/* <a href={`/auth`}>Auth</a> */}
      <a href={`/`}>Auth</a>
    </div>
  );

  const renderToolbar = () => {
    if (!user[0]) {
      return defaultToolbar(); // No user data, render nothing
    }

    switch (user[0].curDeptt) {
      case 13:
        return renderHRToolbar();
      case 6:
        return renderBDToolbar();
      case (1, 2):
        return renderBookingToolbar();
      default:
        return null; // Unknown department
    }
  };

  return (
    <>
      <AppBar sx={{ bgcolor: 'transparent', position: 'sticky' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <WorkHistorySharpIcon sx={{ color: 'black' }} />
          <div>{renderToolbar()}</div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default ToolBar;
