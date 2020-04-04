import React from 'react';
import './App.css';
import CubePage from './components/CubePage/CubePage';

const App = (props) => {
  return (
    <div className="App">
      <CubePage reducer={props.reducers.cubePageReducer}
                dispatch={props.dispatch}/>
    </div>
  );
}

export default App;
