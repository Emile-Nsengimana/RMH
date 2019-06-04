import React, { Component } from 'react';
import Brand from './components/signin/Brand';
import LoginSpace from './components/signin/LoginSpace';
import AppInfo from './components/signin/AppInfo';

class Siginin extends Component {
    state = { 
        email: '',
        password: ''
     }
    render() { 
        return ( 
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <AppInfo></AppInfo>
                        </div>
                        <div className="col-md-4">
                            <LoginSpace></LoginSpace>
                        </div>
                    </div>
                </div>
            </React.Fragment>
         );
    }
}
 
export default Siginin;