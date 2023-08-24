import { EDIT_POSTING, EDIT_TRANSFER, EDIT_RESET } from '../types';

export default (state, action) => {
  switch (action.type) {
    case EDIT_POSTING:
      return { ...state, ...action.payLoad };
    case EDIT_TRANSFER:
      return { ...state, ...action.payLoad };
    case EDIT_RESET:
      return { ...state, ...action.payLoad };

    default:
      return state;
  }
};
