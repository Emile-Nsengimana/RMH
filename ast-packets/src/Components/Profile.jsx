import React, { Component } from 'react';
import logoTitle from '../img/rmh-img.png';

class UserProfile extends Component {
    render() {
        return (
            <div className="profile-details">
                
                <div className="profile-img">
                    <img src={logoTitle} alt="" width="1000px"></img>
                </div>
                <div className="details">
                <div className="form-group">
                    <label className="lb" htmlFor="name">Name</label>
                    <input className="inp" type="text" disabled value="Nsengimana Emile" />
                </div>
                <div className="form-group">
                    <label className="lb" htmlFor="name">Email</label>
                    <input className="inp" type="text" disabled value="user@rmh.gov.rw" />
                </div>
                <div className="form-group">
                    <label className="lb" htmlFor="name">Department</label>
                    <input className="inp" type="text" disabled value="Networking" />
                </div>
                <div className="form-group">
                    <label className="lb" htmlFor="name">Password</label>
                    <input className="inp inp-md" type="password" disabled value="Emile12345" /><i id="btn-change-password" className="fas fa-pen"></i>
                </div>
                </div>
            </div>
        );
    }
}

export default UserProfile;