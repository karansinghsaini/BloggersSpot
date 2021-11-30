import React from 'react';
import ReactDOM from 'react-dom';
import '@fortawesome/fontawesome-free/css/all.min.css'; 
import 'bootstrap-css-only/css/bootstrap.min.css'; 
import 'mdbreact/dist/css/mdb.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// function to provide the store to the app. 
import { Provider } from 'react-redux';
// importing redux store
import store from './redux/store/index';
import {setCurrentUser} from './redux/actions/login';
import setAuthorization from './shared/authorization-token';
import jwt from 'jsonwebtoken';
const secret = '53ddf1277aa9cce7f64fd176d566553322a86c139047a1d9c7a8e09c2500029ba167c9efba48fe49e9c81308f4d3c03c64016ad05478b3785432aea52ab5043a';
var token = localStorage.jwtToken;

if(token) {
    jwt.verify(token, secret, (err, authData) => {
        if(err) {
            window.location.href = '/login';
            localStorage.clear('jwtToken');
        } else {
            setAuthorization(token);
            store.dispatch(setCurrentUser(authData));
        }
  });
}

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
