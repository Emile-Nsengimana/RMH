import React, { Component } from 'react';
import imgLogo from '../../Ui/img/logo.png';

class Brand extends Component {
 
    render() { 
        return (  
            <div className="brand" >
                <img src={ imgLogo } alt='app logo'></img>
            </div>
        );
    }
}
 
export default Brand;