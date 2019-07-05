import React, { Component } from 'react';
import imgLogo from './img/screen-logo.png';
import { consume } from './API/consumeApi';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    async handleLogin() {
        try {
            const credentials = {
                email: document.getElementById('txt-email').value,
                password: document.getElementById('txt-password').value,
            }
            const login = await consume('/auth/signin/', 'post', credentials);
            const loginInfo = await login.json();
            if (loginInfo.status === 200) {
                sessionStorage.setItem("token", loginInfo.data.token);
            }
            console.log(loginInfo);
        } catch (error) {
            console.log(error);
        }
    }

    handleChange(email, password) {
        console.log(email);
    }

    handleSubmit() {
        console.log(this.state);
    }
    render() {
        return (
            <React.Fragment>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="info">
                                <img src={imgLogo} alt=""></img>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="signin">
                                <h1>SIGN IN</h1>
                                {/* <form onSubmit={this.handleSubmit}> */}
                                <div className="form-group">
                                    <i className="fas fa-user-tie"></i>
                                    <input id="txt-email" className="inp" name="email" type="email" required placeholder="enter username" />
                                </div>
                                <div className="form-group">
                                    <i className="fas fa-lock"></i>
                                    <input id="txt-password" className="inp" name="password" type="password" name="password" placeholder="enter your password" />
                                </div>
                                <div className="link-default">
                                    <h5>Forgot password?</h5><button id="btn-reset-password" className="btn-link">click here</button>
                                </div>
                                <div className="form-group">
                                    <button id="btn-signin" className="btn-default btn-signin" onClick={this.handleLogin}>Sign In</button>
                                </div>
                                {/* </form> */}
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
