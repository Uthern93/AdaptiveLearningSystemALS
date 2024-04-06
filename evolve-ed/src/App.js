import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './modules/pages/Landing';
import Login from './modules/pages/Login';
import SignUp from'./modules/pages/SignUp';
import Algebra from './modules/pages/Algebra';
import Home from './modules/pages/Home';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/home" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/algebra" element={<Algebra />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
