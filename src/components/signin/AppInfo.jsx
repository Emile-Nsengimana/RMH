import React, { Component } from "react";
import imgLogo from '../../Ui/img/screen-logo.png';

class AppInfo extends Component {
  render() {
    return (
      <div className="info">
        <img src={imgLogo} alt=""></img>
      </div>
    );
  }
}

export default AppInfo;
