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
          background: '#fff',
          padding: '15px 25px',
          color: '#333',
          // alignItems: 'center',
          width: '100%',
          height: '100vh',
          // marginTop: '100px',
          // marginLeft: '350px',
          // background: 'lightBlue',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center',
          // alignContent: 'center',
        }}
      >
        <h2 style={{ width: '100%', textAlign: 'center', marginTop: '100px' }}>
          Login
        </h2>
        <div
          style={{ margin: '30px auto', maxWidth: '300px', padding: '20px' }}
        >
          <form onSubmit={validateEmp}>
            <table style={{ lineHeight: '75px' }}>
              <tbody>
                <tr>
                  <td>
                    <label>E-Mail Id:</label>
                  </td>
                  <td>
                    <input
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '#ddd 1px solid',
                        bordeRadius: '5px',
                      }}
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
                      style={{
                        width: '100%',
                        padding: '10px',
                        border: '#ddd 1px solid',
                        bordeRadius: '5px',
                      }}
                      type='password'
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
                    <input
                      type='submit'
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        marginTop: '20px',
                        background: '#49c1a2',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    />
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
