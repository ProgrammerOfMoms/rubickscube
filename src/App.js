import React from 'react';
import './App.css';
import Cube from './components/Cube/Cube';
import Command from './components/Command/Command';

const App = (props) => {
  return (
    <div className="App">
      <Cube state={props.state.cube}/>
      <Command state={props.state.commandsBar} 
               onChangeInput={props.onChangeInput}
               onShuffleButtonClick={props.onShuffleButtonClick}
               onSolveButtonClick={props.onSolveButtonClick}
               onStepButtonClick={props.onStepButtonClick}/>
    </div>
  );
}

export default App;
