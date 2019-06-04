import React, { Component } from "react";
import Logo from "./../Logo";
import DefaultMenuItems from '../../components/menu/DefaultMenuItems';
import UserMenuItems from '../../components/menu/UserMenuItems';
import ManageUserMenuItems from '../../components/menu/ManageUserMenuItems';

class AdminSideBar extends Component {
  render() {
    return (
      <div className="nav">
        <div className="side-bar">
          <Logo />
          <DefaultMenuItems
            onHome={this.props.handleHome}
            onClick={this.handleAssets}
          />
          <UserMenuItems
            onProfile={this.handleProfile}
          />
          <ManageUserMenuItems />
        </div>
      </div>
    );
  }
}
export default AdminSideBar;
