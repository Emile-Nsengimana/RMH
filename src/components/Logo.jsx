import React, { Component } from 'react';
import appLogo from '.././Ui/img/logo.png';
import menu from '.././Ui/img/menu.png';

class Logo extends Component{

render(){
    return (
        <div className="navbar logo">
            <img src={appLogo} alt="app logo" width="170px"></img>
        </div>
    );
}
}

export default Logo;