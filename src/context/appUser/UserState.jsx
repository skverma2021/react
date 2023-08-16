import userContext from './UserContext';
import React, { useReducer } from 'react';
import axios from 'axios';
import userReducer from './UserReducer';
import { AUTH_USER, SET_MENU, LOG_OUT } from '../types';

const UserState = (props) => {
  const initialState = {
    user: {},
    // menuOptions: [{ id: 1, displayText: 'auth', destination: '/auth' }],
  };
  const [state, dispatch] = useReducer(userReducer, initialState);

  //Get User
  const getUser = async (theEMailId, thePass) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/emps/${theEMailId}/${thePass}`
      );
      dispatch({ type: AUTH_USER, payLoad: res.data });
      // const theDeptt = res.data[0].curDeptt;
      // dispatch({ type: SET_MENU, payLoad: theDeptt });
      // console.log(theDeptt);
    } catch (error) {
      console.log(error);
    }
  };
  const logOutUser = () => {
    dispatch({ type: LOG_OUT, payLoad: 0 });
  };

  return (
    <userContext.Provider
      value={{
        user: state.user,
        // menu: state.menuOptions,
        getUser,
        logOutUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};
export default UserState;
