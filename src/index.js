import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/Ui/css/main.css";
import Signin from './Signin';
import Admin from './Admin';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
