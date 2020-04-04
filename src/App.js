import React from 'react';
import './App.css';
import CubePageContainer from './components/CubePage/CubePageContainer';

const App = (props) => {
  return (
    <div className="App">
      <CubePageContainer reducer={props.reducers.cubePageReducer}
                dispatch={props.dispatch}/>
    </div>
  );
}

export default App;
