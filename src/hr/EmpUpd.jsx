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

  const updEmpData = async () => {
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
      <h4>Edit an Employee</h4>
      <br />
      <br />

      <label>
        <strong>Unique ID</strong>
      </label>
      <br />
      <input
        name='uId'
        value={emp.uId || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>First Name:</strong>
      </label>
      <br />
      <input
        name='fName'
        value={emp.fName || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>Middle Name:</strong>
      </label>
      <br />
      <input
        name='mName'
        value={emp.mName || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>Surname:</strong>
      </label>
      <br />
      <input
        name='sName'
        value={emp.sName || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>Title:</strong>
      </label>
      <br />
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
      <br />

      <label>
        <strong>Date of Birth:</strong>
        <br />
      </label>
      <input
        name='dob'
        type='date'
        // value={emp.dob || ''}
        value={moment(emp.dob).format('YYYY-MM-DD')}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>Gender:</strong>
      </label>
      <br />
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
      <br />

      <label>
        <strong>Address:</strong>
      </label>
      <br />
      <input
        name='addLine1'
        value={emp.addLine1 || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>City:</strong>
      </label>
      <br />
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
      <br />

      <label>
        <strong>Mobile:</strong>
      </label>
      <br />
      <input
        name='mobile'
        type='tel'
        value={emp.mobile || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>eMail ID:</strong>
      </label>
      <br />
      <input
        name='eMailId'
        type='email'
        value={emp.eMailId || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <label>
        <strong>Password:</strong>
      </label>
      <br />
      <input
        name='passwd'
        type='password'
        value={emp.passwd || ''}
        onChange={(e) => {
          return onValChange(e);
        }}
      />
      <br />

      <button onClick={updEmpData}>Update</button>
    </div>
  );
};

export default EmpUpd;
