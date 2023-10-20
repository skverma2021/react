import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../home/Spinner';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

function JobUpd() {
  const [job, setJob] = useState({});
  const [clients, setClients] = useState([]);

  const [err, setErr] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [status, setStatus] = useState('typing');
  const { id } = useParams();
  const navigate = useNavigate();

  let timeoutId;
  const goHome = () => {
    // setStatus('success');
    navigate('/');
  };

  useEffect(() => {
    return () => clearTimeout(timeoutId);
  }, []);
  // };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/jobs/${id}`);
        setJob(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clients/short`);
        setClients(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onValChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    setFormTouched(true);
  };

  const updJobData = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/jobs/${id}`, job);
      setStatus('success');
      timeoutId = setTimeout(goHome, 1000);
    } catch (error) {
      console.log(error);
      setErr('Record could not be updated');
    }
  };

  if (err) return <h1 style={{ color: 'red' }}>Error: {err}</h1>;

  if (status === 'success')
    return <h1 style={{ color: 'blue' }}>Record updated successfully !</h1>;
  if (status === 'busy') return <Spinner />;

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        border: '1px solid black',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h2>Edit a Job</h2>
      <form onSubmit={updJobData}>
        <table style={{ lineHeight: '3' }}>
          <tbody>
            <tr>
              <td>
                <label>JobDescription:</label>
              </td>
              <td>
                <input
                  name='description'
                  size='50'
                  value={job.description || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                  // labelProps={{ shrink: !!job.description }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Client:</label>
              </td>
              <td>
                <select
                  name='clientId'
                  id='clientId'
                  value={job.clientId || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                >
                  {/* <option value=''>Select Client</option> */}
                  {clients.map((c) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.shortName}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label>StartDate:</label>
              </td>
              <td>
                <input
                  name='ordDateStart'
                  type='date'
                  value={job.ordDateStart || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                  // labelProps={{ shrink: !!job.ordDateStart }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>EndDate:</label>
              </td>
              <td>
                <input
                  name='ordDateEnd'
                  type='date'
                  value={job.ordDateEnd || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                  // labelProps={{ shrink: !!job.ordDateEnd }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>OrderValue:</label>
              </td>
              <td>
                <input
                  name='ordValue'
                  value={job.ordValue || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                  // labelProps={{ shrink: !!job.ordValue }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <button type='submit' disabled={formTouched == false}>
                  Update
                </button>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default JobUpd;
