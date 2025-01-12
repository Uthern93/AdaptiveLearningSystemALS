import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './modules/pages/Landing';
import Login from './modules/pages/Login';
import SignUp from'./modules/pages/SignUp';
import Subjects from './modules/pages/Subjects';
import Algebra from './modules/pages/Algebra';
import Tutorials from './modules/pages/Tutorials';
import Dashboard from './modules/pages/Dashboard';
import Quiz from './modules/pages/Quiz'
function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          {/* <Route path="/login" element={<Login />} /> */}
          {/* <Route path="/signup" element={<SignUp />} /> */}
          <Route path="/subjects" element={<Subjects />} />
          <Route path="/tutorials/:subjectId" element={<Tutorials />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/algebra" element={<Algebra />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;












