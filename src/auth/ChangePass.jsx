import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ChangePass = ({ setIsAuthenticated }) => {
  const [pass, setPass] = useState({ newPass: '', repeatPass: '' });
  const [err, setErr] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    setUserData(decoded);
  }, []);

  const onValChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
  };

  const checkPass = async (event) => {
    event.preventDefault();
    // console.log({ userData });
    if (pass.newPass !== pass.repeatPass) {
      setErr('Passwords did not match');
      return;
    }
    try {
      await axios.put(`http://localhost:3000/api/cp/${userData.eID}`, {
        passwd: pass.repeatPass,
      });
      localStorage.clear();
      setIsAuthenticated(false);
      setErr('Passwords changed. Login again');
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          background: '#fff',
          padding: '15px 25px',
          color: '#333',
          // alignItems: 'center',
          width: '100%',
          height: '100vh',
        }}
      >
        <h2 style={{ width: '100%', textAlign: 'center', marginTop: '100px' }}>
          Login
        </h2>
        <div
          style={{ margin: '30px auto', maxWidth: '500px', padding: '20px' }}
        >
          <form onSubmit={checkPass}>
            <table style={{ lineHeight: '75px' }}>
              <tbody>
                <tr>
                  <td>
                    <label>New Password:</label>
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
                      name='newPass'
                      value={pass.newPass}
                      onChange={(e) => {
                        return onValChange(e);
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <label>Repeat Password:</label>
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
                      name='repeatPass'
                      value={pass.repeatPass}
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
                  <td>
                    <p style={{ color: 'red' }}>{err}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangePass;
