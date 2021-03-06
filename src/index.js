import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import App from './App';
import {Provider} from 'react-redux';


const render = (props) =>{
  ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App reducers={props}
            dispatch={store.dispatch.bind(store)}/>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
  );
}
render(store.getState());
window.store = store;
store.subscribe(()=> {
  let state = store.getState();
  render(state);
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
