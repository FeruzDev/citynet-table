import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'antd/dist/antd.css'

import Navbar from "./component/Navbar";
import "./component/main.scss"
import Login from "./Auth/Login";
import {applyMiddleware, compose, createStore} from "redux";
import {rootReducer} from "./redux/reducers/rootReducer";
import thunk from "redux-thunk";
import {Provider} from "react-redux";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import Objects from "./page/Objects";
import PrivateRoute from "./component/PrivateRoute";
import Registration from "./component/Registration";
import Home from "./page/Home";


const store = createStore(rootReducer, compose(applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


ReactDOM.render(
 <Provider store={store}>

    <App/>

 </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
