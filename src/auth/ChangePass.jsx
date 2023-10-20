import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import Spinner from '../home/Spinner';

const ChangePass = ({ setIsAuthenticated }) => {
  const [pass, setPass] = useState({ newPass: '', repeatPass: '' });
  const [status, setStatus] = useState('typing');
  const [formTouched, setFormTouched] = useState(false);
  const [err, setErr] = useState('');
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();

  let timeoutId;
  const goHome = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate('/');
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decoded = jwt_decode(token);
    setUserData(decoded);
  }, []);

  const onValChange = (e) => {
    setPass({ ...pass, [e.target.name]: e.target.value });
    setFormTouched(true);
  };

  const handlePassChange = async (event) => {
    setStatus('busy');
    event.preventDefault();
    // console.log({ userData });
    if (pass.newPass !== pass.repeatPass) {
      setPass({ newPass: '', repeatPass: '' });
      setStatus('typing');
      setFormTouched(false);
      setErr('Try again - passwords did not match');
    } else {
      try {
        await axios.put(`http://localhost:3000/api/emps/cp/${userData.eID}`, {
          passwd: pass.repeatPass,
        });
        setStatus('success');
        timeoutId = setTimeout(goHome, 2000);
      } catch (error) {
        setErr('Error');
        console.log(error);
      }
    }
  };

  if (err == 'Error') return <h1 style={{ color: 'red' }}>Error: {err}</h1>;

  if (status === 'success')
    return (
      <h3 style={{ color: 'blue' }}>
        Password updated successfully ! Login Again to proceed...
      </h3>
    );
  if (status === 'busy') return <Spinner />;

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
          <form onSubmit={handlePassChange}>
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
                    <button
                      type='submit'
                      disabled={formTouched == false}
                      // style={{
                      //   display: 'block',
                      //   width: '100%',
                      //   padding: '10px',
                      //   marginTop: '20px',
                      //   background: '#49c1a2',
                      //   color: '#fff',
                      //   cursor: 'pointer',
                      // }}
                    >
                      Update
                    </button>
                    {/* <input
                      type='submit'
                      disabled={formTouched == false}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        marginTop: '20px',
                        background: '#49c1a2',
                        color: '#fff',
                        cursor: 'pointer',
                      }}
                    /> */}
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
