import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

export const render = (state) =>{
    ReactDOM.render(<App state={state} />, document.getElementById('root'));
}