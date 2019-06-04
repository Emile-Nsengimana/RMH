import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './Components/Admin';
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Admin />, document.getElementById('root'));

serviceWorker.unregister();
