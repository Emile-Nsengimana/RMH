import React, { Component } from 'react';

class UserManager extends Component {
    render() { 
        return ( 
            <div>
              <label className="lb-colored-title-make" htmlFor="own">Manage user</label>
              <ul>
                <li id="btn-users" onClick={this.props.onUsers}>Users</li>
              </ul>
            </div>
         );
    }
}
 
export default UserManager;