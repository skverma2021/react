import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './home/Home';
import Auth from './auth/Auth';

import Emps from './hr/Emps';
import EmpUpd from './hr/EmpUpd';
import TransferPosting from './hr/TransferPosting';
import Transfer from './hr/Transfer';
import Posting from './hr/Posting';

import ToolBar from './header/ToolBar';
import JobAll from './jobs/JobAll';
import JobUpd from './jobs/JobUpd';
import JobExPlan from './jobs/JobExPlan';
import JobExPlanAdd from './jobs/JobExPlanAdd';

import EmpAdd from './hr/EmpAdd';
import JobAdd from './jobs/JobAdd';
import BookHead from './book/BookHead';
import BookMonthYear from './book/BookMonthYear';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <header>
        <ToolBar />
      </header>
      <Routes>
        <Route
          path='/'
          element={
            isAuthenticated ? (
              <Home />
            ) : (
              <Auth setIsAuthenticated={setIsAuthenticated} />
            )
          }
        />

        <Route path='/hr/emp' element={isAuthenticated && <Emps />} />
        <Route path='/hr/emp/add' element={isAuthenticated && <EmpAdd />} />
        <Route path='/hr/emp/upd/:id' element={isAuthenticated && <EmpUpd />} />
        <Route
          path='/hr/emp/tp/:id'
          element={isAuthenticated && <TransferPosting />}
        />

        <Route path='/hr/transfer' element={isAuthenticated && <Transfer />} />
        <Route path='/hr/posting' element={isAuthenticated && <Posting />} />

        <Route path='/bd/jobs' element={isAuthenticated && <JobAll />} />
        <Route path='/bd/jobs/add' element={isAuthenticated && <JobAdd />} />
        <Route
          path='/bd/jobs/upd/:id'
          element={isAuthenticated && <JobUpd />}
        />
        <Route
          path='/bd/jobs/ex/:id'
          element={isAuthenticated && <JobExPlan />}
        />
        <Route
          path='/bd/jobs/exAdd/:id'
          element={isAuthenticated && <JobExPlanAdd />}
        />

        <Route
          path='/booking/:id'
          element={isAuthenticated && <BookMonthYear />}
        />
        <Route
          path='/booking/:id/:m/:y'
          element={isAuthenticated && <BookHead />}
        />
      </Routes>
    </>
  );
}

export default App;
