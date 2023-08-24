import TPContext from './TPcontext';
import React, { useReducer } from 'react';
import TPReducer from './TPReducer';
import { EDIT_POSTING, EDIT_TRANSFER, EDIT_RESET } from '../types';
const TPState = (props) => {
  const initialState = {
    edgId: '',
    dgId: '',
    edgFd: '',
    edpId: '',
    dpId: '',
    edpFd: '',
  };
  const [state, dispatch] = useReducer(TPReducer, initialState);

  const setDg = (edgid, dgid, edgfd) => {
    dispatch({
      type: EDIT_POSTING,
      payLoad: { edgId: edgid, dgId: dgid, edgFd: edgfd },
    });
  };
  const setDp = (edpid, dpid, edpfd) => {
    dispatch({
      type: EDIT_TRANSFER,
      payLoad: { edpId: edpid, dpId: dpid, edpFd: edpfd },
    });
  };
  const resetTP = () => {
    dispatch({
      type: EDIT_RESET,
      payLoad: {
        edgId: '',
        dgId: '',
        edgFd: '',
        edpId: '',
        dpId: '',
        edpFd: '',
      },
    });
  };

  return (
    <TPContext.Provider
      value={{
        tpState: state,
        setDg,
        setDp,
        resetTP,
      }}
    >
      {props.children}
    </TPContext.Provider>
  );
};
export default TPState;
