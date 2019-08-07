import React, { Component } from 'react';
import appLogo from '../img/logo.png';

class Logo extends Component{

render(){
    return (
        <div className="navbar logo">
            <img src={appLogo} alt="app logo" width="200px"></img>
        </div>
    );
}
}

export default Logo;