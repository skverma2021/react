import React, { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import WorkHistorySharpIcon from '@mui/icons-material/WorkHistorySharp';
import { Link } from 'react-router-dom';

function ToolBar({ setIsAuthenticated }) {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    setUserData(decoded);
  }, []);

  const logOutUser = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const renderHRToolbar = () => (
    <>
      <Link to='/hr/emp'> AllEmp</Link>
      {` `}
      <Link to='/hr/emp/add'> NewEmp</Link>
      {` `}
      <Link to='/hr/cp'> ChangePassword</Link>
      {` `}
      <Link to='/' onClick={logOutUser}>
        {' '}
        Logout
      </Link>
    </>
  );

  const renderBDToolbar = () => (
    <div>
      <Link to='/bd/jobs'> allJobs</Link>
      {` `}
      <Link to='/bd/jobs/add'> addJobs</Link>
      {` `}
      <Link to={`/booking/${userData.eID}`}> bookings</Link>
      {` `}
      <Link to='/' onClick={logOutUser}>
        {' '}
        Logout
      </Link>
    </div>
  );
  const renderBookingToolbar = () => (
    <div>
      <Link to={`/booking/${userData.eID}`}> bookings</Link>
      {` `}
      <Link to='/' onClick={logOutUser}>
        {' '}
        Logout
      </Link>
    </div>
  );
  const defaultToolbar = () => (
    <div>
      <a href={`/`}>Auth</a>
    </div>
  );

  const renderToolbar = () => {
    if (typeof userData == 'undefined') {
      return defaultToolbar(); // No user data, render  nothing
    }

    switch (userData.eDepttID) {
      case 1:
        return renderBookingToolbar();
      case 2:
        return renderBookingToolbar();
      case 3:
        return renderBookingToolbar();
      case 4:
        return renderBookingToolbar();
      case 5:
        return renderBookingToolbar();
      case 6:
        return renderBDToolbar();
      case 7:
        return renderBookingToolbar();
      case 8:
        return renderBookingToolbar();
      case 9:
        return renderBookingToolbar();
      case 10:
        return renderBookingToolbar();
      case 11:
        return renderBookingToolbar();
      case 12:
        return renderBookingToolbar();
      case 13:
        return renderHRToolbar();
      default:
        return null; // Unknown department
    }
  };

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: 'lightgray',
        }}
      >
        <div style={{ display: 'flex', marginTop: '10px' }}>
          <div>
            <WorkHistorySharpIcon sx={{ color: 'black' }} />
          </div>
          <div style={{ marginLeft: '10px' }}>
            <strong>Consultancy Jobs - MIS</strong>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ textAlign: 'right' }}>{renderToolbar()}</div>
          <div style={{ textAlign: 'right' }}>
            <small>
              Welcome:
              <strong>
                <i>{userData.eName}</i>
              </strong>
            </small>
          </div>
        </div>
      </div>
    </>
  );
}

export default ToolBar;
