import {createStore } from "react-redux";
import rootReducers from "./index";

const store =createStore(rootReducers);
export default store;