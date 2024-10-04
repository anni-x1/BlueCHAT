import React, { useState } from 'react';
import NavBar from './Components/Navbar';
import Main from './Components/Main';
import './Components/MainStyle.css'
function App() {
  const [mode, setmode] = useState('light-mode');
  const toggle = () => {
    setmode(mode==='light-mode'?'dark-mode':'light-mode')
  }
  return (
    <div className={`App-${mode}`}>
      <NavBar mode={mode} toggle={toggle}/>
      <Main mode={mode}/>
    </div>
  );
}

export default App;
