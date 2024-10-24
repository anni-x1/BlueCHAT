import React, { useContext } from 'react';
import { AppContext } from './Components/Context/AppContext';
import NavBar from './Components/Navbar';
import Main from './Components/Main';
import './Components/Styles/MainStyle.css'
function App() {
  const { mode } = useContext(AppContext);
  return (
    <div className={`App-${mode}`}>
      <NavBar />
      <Main />
    </div>
  );
}

export default App;
