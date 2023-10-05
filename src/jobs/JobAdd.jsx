import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from '../home/Spinner';

// id	int identity
// description	varchar(50)
// clientId	int
// ordDateStart	date
// ordDateEnd	date
// ordValue	money

const jobRec = {
  description: '',
  clientId: '',
  ordDateStart: '',
  ordDateEnd: '',
  ordValue: '',
};
const JobAdd = () => {
  const [job, setJob] = useState(jobRec);
  const [clients, setClients] = useState([]);

  const [err, setErr] = useState('');
  const [formTouched, setFormTouched] = useState(false);
  const [status, setStatus] = useState('typing');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/clientsShort`);
        setClients(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  console.log(clients.length);

  const onValChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
    setFormTouched(true);
  };

  const postJobData = async (event) => {
    setStatus('busy');
    event.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/jobs', job);
      console.log(`Success: ${job.description} created`);
      setStatus('success');
    } catch (error) {
      console.log(error);
      setErr('Record could not be added');
    }
  };

  if (err) return <h1 style={{ color: 'red' }}>Error: {err}</h1>;

  if (status === 'success')
    return <h1 style={{ color: 'blue' }}>Record updated successfully !</h1>;
  if (status === 'busy') return <Spinner />;

  return (
    <>
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
        <h2>Add a Job</h2>
        <form onSubmit={postJobData}>
          <table style={{ lineHeight: '3' }}>
            <tbody>
              <tr>
                <td>
                  <label>Description:</label>
                </td>
                <td>
                  <input
                    name='description'
                    size={'60'}
                    value={job.description}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
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
                    value={job.clientId}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
                    label='Client'
                  >
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
                    value={job.ordDateStart}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
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
                    value={job.ordDateEnd}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
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
                    value={job.ordValue}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <button type='submit' disabled={formTouched == false}>
                    Add
                  </button>
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
};
export default JobAdd;
