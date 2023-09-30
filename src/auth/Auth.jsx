import React, { useState } from 'react';
import axios from 'axios';
import WorkHistorySharpIcon from '@mui/icons-material/WorkHistorySharp';

const Auth = ({ setIsAuthenticated }) => {
  const [theEmp, setTheEmp] = useState({ eMail: '', pass: '' });

  const onValChange = (e) => {
    setTheEmp({ ...theEmp, [e.target.name]: e.target.value });
  };

  const validateEmp = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.get(
        `http://localhost:3000/api/emps/${theEmp.eMail}/${theEmp.pass}`
      );
      if (res.data.length > 0) {
        localStorage.setItem('token', res.data[0].token);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <div
          style={{
            display: 'flex',
            marginTop: '10px',
            backgroundColor: 'lightgray',
          }}
        >
          <div>
            <WorkHistorySharpIcon sx={{ color: 'black' }} />
          </div>
          <div style={{ marginLeft: '10px' }}>
            <strong>Consultancy Jobs - MIS</strong>
          </div>
        </div>
      </header>
      <div
        style={{
          alignItems: 'center',
          width: '700px',
          height: '500px',
          marginTop: '100px',
          marginLeft: '350px',
          background: 'lightBlue',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignContent: 'center',
        }}
      >
        <h2>Login</h2>
        <div>
          <form onSubmit={validateEmp}>
            <table style={{ lineHeight: '75px' }}>
              <tbody>
                <tr>
                  <td>
                    <label>E-Mail Id:</label>
                  </td>
                  <td>
                    <input
                      name='eMail'
                      value={theEmp.eMail}
                      onChange={(e) => {
                        return onValChange(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Password:</label>
                  </td>
                  <td>
                    <input
                      name='pass'
                      value={theEmp.pass}
                      onChange={(e) => {
                        return onValChange(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type='submit' />
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default Auth;
