import { createStore, combineReducers } from "redux";
import cubeReducer from "./CubePageReducer";

let reducers = combineReducers({cubeReducer});


let store = createStore(reducers);

export default store;