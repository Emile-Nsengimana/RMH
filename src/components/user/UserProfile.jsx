import React, { Component } from 'react';
import profilePic from '../../Ui/img/profile.png';

class UserProfile extends Component {
    render() {
        return (
            <div className="profile-details">
                <div className="profile-img">
                    <img src={profilePic} alt=""></img>
                </div>
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
                    <input className="inp inp-md" stype="password" disabled value="Emile12345" /><i id="btn-change-password" class="fas fa-pen"></i>
                </div>
            </div>
        );
    }
}

export default UserProfile;