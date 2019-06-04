import React, { Component } from 'react';
import { Table } from 'reactstrap';

class UserComponent extends Component {
    
    componentDidMount(){
        // console.log(this.props);
    }
    render() {
        return ( 
            <div id="users">
            <Table responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Phone No</th>
                  <th>Email</th>
                  <th>Gender</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                  {this.props.allUsers.map( user => (
                <tr key={user.email}>
                    <td>{user.firstname}</td>
                    <td>{user.type}</td>
                    <td>{user.department}</td>
                    <td>{user.status}</td>
                    <td>{user.phoneno}</td>
                    <td>{user.email}</td>
                    <td>{user.gender}</td>
                    <td><button className="btn btn-sm">Disable</button></td>
                    <td><button className="btn btn-sm btn-danger"><i className="fas fa-trash-alt"></i></button></td>
                </tr>
                  ))}
                
              </tbody>
            </Table>
            <button onClick={this.handleAddAsset} className="btn-normal">Add user</button>
            <button className="btn-normal">Disable user</button>
          </div>
         );
    }
}
 
export default UserComponent;