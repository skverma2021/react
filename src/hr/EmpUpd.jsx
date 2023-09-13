import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import moment from 'moment';

import { useNavigate, useParams } from 'react-router-dom';

const EmpUpd = () => {
  const [emp, setEmp] = useState({});
  const [cities, setCities] = useState([]);
  const [theCity, setTheCity] = useState('');
  const [err, setErr] = useState('');

  const navigate = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/emps/${id}`);
        setEmp(res.data[0]);
        setTheCity(res.data[0].cityId);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/cities`);
        setCities(res.data);

        // setEmp({...emp, cityId:});
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const onValChange = (e) => {
    setEmp({ ...emp, [e.target.name]: e.target.value });
  };

  const updEmpData = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/emps/${id}`, {
        ...emp,
        cityId: theCity,
      });
    } catch (error) {
      console.log(error);
      setErr(error.message);
    }
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   alert(`The name you entered was: ${name}`)
  // }
  if (err) return <div>Error: {err}</div>;
  return (
    <div
      style={{
        marginTop: '100px',
        marginLeft: '400px',
        marginRight: '400px',
        marginBottom: '100px',
        display: 'flex',
        flexDirection: 'column',
        width: '20%',
      }}
    >
      <h2>Edit an Employee</h2>
      <br />
      <br />
      <form onSubmit={updEmpData}>
        <table style={{ lineHeight: '35px' }}>
          <tbody>
            <tr>
              <td>
                <strong>Unique ID</strong>
              </td>
              <td>
                <input
                  name='uId'
                  value={emp.uId || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>First Name:</strong>
              </td>
              <td>
                <input
                  name='fName'
                  minLength={3}
                  value={emp.fName || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Middle Name:</strong>
              </td>
              <td>
                <input
                  name='mName'
                  value={emp.mName || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Surname:</strong>
              </td>
              <td>
                <input
                  name='sName'
                  value={emp.sName || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Title:</strong>
              </td>
              <td>
                <div style={{ display: 'flex' }}>
                  <input
                    type='radio'
                    id='Mr'
                    name='title'
                    value='Mr'
                    checked={emp.title == 'Mr'}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
                  />
                    <label for='Mr'>Mr</label>
                </div>
                <div style={{ display: 'flex' }}>
                  <input
                    type='radio'
                    id='Ms'
                    name='title'
                    value='Ms'
                    checked={emp.title == 'Ms'}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
                  />
                    <label for='Ms'>Ms</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Date of Birth:</strong>
              </td>
              <td>
                <input
                  name='dob'
                  type='date'
                  min='1960-01-01'
                  max='2004-12-31'
                  // value={emp.dob || ''}
                  value={moment(emp.dob).format('YYYY-MM-DD')}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Gender:</strong>
              </td>
              <td>
                <div style={{ display: 'flex' }}>
                  <input
                    type='radio'
                    id='male'
                    name='gender'
                    value='M'
                    checked={emp.gender == 'M'}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
                  />
                    <label for='male'>Male</label>
                </div>
                <div style={{ display: 'flex' }}>
                  <input
                    type='radio'
                    id='female'
                    name='gender'
                    value='F'
                    checked={emp.gender == 'F'}
                    onChange={(e) => {
                      return onValChange(e);
                    }}
                  />
                    <label for='female'>Female</label>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Address:</strong>
              </td>
              <td>
                <input
                  name='addLine1'
                  value={emp.addLine1 || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>City:</strong>
              </td>
              <td>
                {' '}
                <select
                  name='cityId'
                  id='cityId'
                  value={theCity || ''}
                  onChange={(e) => {
                    return setTheCity(e.target.value);
                  }}
                >
                  {cities.map((c) => {
                    return (
                      <option key={c.id} value={c.id}>
                        {c.cityName}
                      </option>
                    );
                  })}
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <strong>Mobile:</strong>
              </td>
              <td>
                <input
                  name='mobile'
                  type='number'
                  min='1000000000'
                  max='9999999999'
                  value={emp.mobile || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>eMail ID:</strong>
              </td>
              <td>
                <input
                  name='eMailId'
                  type='email'
                  value={emp.eMailId || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <strong>Password:</strong>
              </td>
              <td>
                <input
                  name='passwd'
                  type='password'
                  value={emp.passwd || ''}
                  onChange={(e) => {
                    return onValChange(e);
                  }}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <br />

        <input type='submit' />
      </form>

      {/* <button onClick={updEmpData}>Update</button> */}
    </div>
  );
};

export default EmpUpd;
