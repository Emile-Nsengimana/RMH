import React, { Component } from 'react';

class DefaultMenu extends Component {
  
  render() {
    return (
      <React.Fragment>
        <ul>
          <li id="btn-home" onClick={this.props.onHome}>Home</li>
          <li id="btn-assets" onClick={this.props.onAssets}>Assets</li>
          <label className="lb-colored-title">Your</label>
          <li id="btn-profile">Profile</li>
          <li id="btn-notes">Notes</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default DefaultMenu;
