import React, { Component } from "react";
import Logo from "./../Logo";
import DefaultMenuItems from '../../components/menu/DefaultMenuItems';
import UserMenuItems from '../../components/menu/UserMenuItems';
import Report from '../../components/menu/UserReport';

class UserSideBar extends Component {

  render() {
    return (
      <div className="nav">
        <div className="side-bar">
          <Logo />
          <DefaultMenuItems
            onHome={this.props.handleHome}
            onClick={this.props.handleAssets}
          />
          <UserMenuItems
            onProfile={this.props.handleProfile}
          />
          <Report />
        </div>
      </div>
    );
  }
}
export default UserSideBar;
