import React from 'react';
import './App.css';
import Cube from './components/Cube/Cube';
import Command from './components/Command/Command';

const App = (props) => {
  return (
    <div className="App">
      <Cube state={props.state.cube}/>
      <Command state={props.state.commandsBar}/>
    </div>
  );
}

export default App;
