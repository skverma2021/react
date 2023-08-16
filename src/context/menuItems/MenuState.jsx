import menuContext from './MenuContext';
import React, { useReducer } from 'react';
import axios from 'axios';
import menuReducer from './MenuReducer';
import { AUTH_USER } from '../types';

const MenuState = (props) => {
  const initialState = {
    menu: [
      { id: 1, toDisplay: false, displayText: 'Home', destination: '/' },
      { id: 2, toDisplay: true, displayText: 'auth', destination: '/auth' },
      { id: 3, toDisplay: false, displayText: 'logOut', destination: '/' },
      {
        id: 4,
        toDisplay: false,
        displayText: 'Employees',
        destination: '/hr/emp',
      },
      {
        id: 5,
        toDisplay: false,
        displayText: 'Transfers',
        destination: 'home',
      },
      { id: 1, toDisplay: false, displayText: 'Postings', destination: 'home' },
      { id: 1, toDisplay: false, displayText: 'Clients', destination: 'home' },
      { id: 1, toDisplay: false, displayText: 'Jobs', destination: 'home' },
      {
        id: 1,
        toDisplay: false,
        displayText: 'WorkPlans',
        destination: 'home',
      },
      { id: 1, toDisplay: false, displayText: 'Bookings', destination: 'home' },
    ],
  };
  const [state, dispatch] = useReducer(menuReducer, initialState);

  //Get User
  // const getUser = async (theEMailId, thePass) => {
  //   try {
  //     const res = await axios.get(
  //       `http://localhost:3000/api/emps/${theEMailId}/${thePass}`
  //     );
  //     dispatch({ type: AUTH_USER, payLoad: res.data });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <userContext.Provider
      value={{
        menu: state.menu,
        // getUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};
export default MenuState;
