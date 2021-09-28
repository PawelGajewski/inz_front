import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router'
import './index.css';
import App from './App';
import Logowanie from './logowanie/logowanie';
import Rejestracja from './rejestracja/rejestracja'
import * as serviceWorker from './serviceWorker';


// ReactDOM.render((
//     <Router history={browserHistory}>
//       <Route path="/" component={Rejestracja} />
//     </Router>
//   ), document.getElementById('app'));


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

