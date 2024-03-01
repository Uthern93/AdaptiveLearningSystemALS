import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Landing from './modules/pages/Landing'

function App() {
  return (
    <React.Fragment>
      <Landing/>
    
    {/* <AppFooter /> */}
  </React.Fragment>
    // <div className="App">
    //   <header className="App-header">
    // <div style={{ width: '100px', height: '100px', overflow: 'hidden' }}>
    //   <img src={logo} alt="SVG" style={{ width: '100%', marginBottom: '-100px' }} />
    // </div>
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
