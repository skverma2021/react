import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './header/Header';
import Home from './home/Home';
import Auth from './auth/Auth';

function App() {
  return (
    <>
      <header>
        <Header />
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth' element={<Auth />} />
      </Routes>
    </>
  );
}

export default App;
