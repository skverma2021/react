import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
// import Header from './header/Header Copy';
import Home from './home/Home';
import Auth from './auth/Auth';
// import BDDhome from './bdd/BDDhome';
// import HRhome from './hr/HRhome';
import Emps from './hr/Emps';
import EmpUpd from './hr/EmpUpd';
import Transfer from './hr/Transfer';
import Posting from './hr/Posting';
// import LoggedOut from './auth/LoggedOut';
import ToolBar from './header/ToolBar';
import JobAll from './jobs/JobAll';
import JobUpd from './jobs/JobUpd';
import JobExPlan from './jobs/JobExPlan';
import JobExPlanAdd from './jobs/JobExPlanAdd';
import BDDhome from './bdd/BDDhome';
import EmpAdd from './hr/EmpAdd';
import JobAdd from './jobs/JobAdd';

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
        {/* <Route path='/auth' element={<Auth setIsAuthenticated={setIsAuthenticated} />} /> */}

        <Route path='/hr/emp' element={<Emps />} />
        <Route path='/hr/emp/add' element={<EmpAdd />} />
        <Route path='/hr/emp/upd/:id' element={<EmpUpd />} />
        {/* <Route path='/hr/emp/del' element={<Emps />} /> */}
        <Route path='/hr/transfer' element={<Transfer />} />
        <Route path='/hr/posting' element={<Posting />} />

        <Route path='/bd' element={<BDDhome />} />
        <Route path='/bd/jobs' element={<JobAll />} />
        <Route path='/bd/jobs/add' element={<JobAdd />} />
        <Route path='/bd/jobs/upd/:id' element={<JobUpd />} />
        <Route path='/bd/jobs/ex/:id' element={<JobExPlan />} />
        <Route path='/bd/jobs/exAdd/:id' element={<JobExPlanAdd />} />
      </Routes>
    </>
  );
}

{
  /* <Route path='/job/ex/:id' element={<JobExPlan />} />
<Route path='/job/exAdd/:id' element={<JobExPlanAdd />} /> */
}

export default App;
