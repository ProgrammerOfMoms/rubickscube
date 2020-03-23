import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/state';
import App from './App';



const render =  (state) => {
    ReactDOM.render(<App state={state}
                         onChangeInput={store.changeInput.bind(store)}
                         onShuffleButtonClick={store.shuffleButtonClick.bind(store)}
                         onSolveButtonClick={store.solveButtonClick.bind(store)}
                         onStepButtonClick={store.stepButtonClick.bind(store)} />, document.getElementById('root'));
}

render(store.getState());

store.subscribe(render);

// ReactDOM.render(<App state={data}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
