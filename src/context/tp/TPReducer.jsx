import {
  EDIT_POSTING,
  EDIT_TRANSFER,
  EDIT_RESET,
  NEW_REC_DESIG,
  UPD_REC_DESIG,
  NEW_REC_DEPTT,
  UPD_REC_DEPTT,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case EDIT_POSTING:
      return { ...state, ...action.payLoad };
    case EDIT_TRANSFER:
      return { ...state, ...action.payLoad };
    case EDIT_RESET:
      return { ...state, ...action.payLoad };
    case NEW_REC_DESIG:
      return { ...state, ...action.payLoad };
    case UPD_REC_DESIG:
      return { ...state, ...action.payLoad };
    case NEW_REC_DEPTT:
      return { ...state, ...action.payLoad };
    case UPD_REC_DEPTT:
      return { ...state, ...action.payLoad };

    default:
      return state;
  }
};
