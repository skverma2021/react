import React, { useContext } from 'react';
import UserContext from '../context/appUser/UserContext';
import Home from '../home/Home';

const LoggedOut = () => {
  const userContext = useContext(UserContext);
  const { logOutUser } = userContext;
  logOutUser();
  return (
    <>
      <div>You have successfully logged out</div>
      {/* <Home /> */}
    </>
  );
};

export default LoggedOut;
