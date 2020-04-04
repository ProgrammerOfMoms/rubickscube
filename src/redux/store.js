import { createStore, combineReducers, applyMiddleware } from "redux";
import cubePageReducer from "./reducers/CubePageReducer";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({cubePageReducer});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;