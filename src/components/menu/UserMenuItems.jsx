import React, { Component } from "react";

class UserItem extends Component {
  render() {
    return (
      <React.Fragment>
        <label className="lb-colored-title" htmlFor="own">Your</label>
        <ul>
          <li id="btn-profile" onClick={this.props.onProfile}>Profile</li>
          <li><a href="#" />Notes</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default UserItem;
