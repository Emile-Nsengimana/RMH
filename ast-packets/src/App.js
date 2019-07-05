import React, { Components } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Admin from './Admin';
import Login from './Login';
import User from './User';
import Manager from './Manager';

function App (){
    return (
        <Router>
            <Route path='/' exact component={Login} />
            <Route path='/admin' component={Admin} />
            <Route path='/user' component={User} />
            <Route path='/manager' component={Manager} />
        </Router>
    );
}

export default App;