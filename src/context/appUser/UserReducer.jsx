import { AUTH_USER, SET_MENU, LOG_OUT } from '../types';

export default (state, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, user: action.payLoad };
    case LOG_OUT:
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};
