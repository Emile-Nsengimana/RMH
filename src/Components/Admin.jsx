import React, { Component } from 'react';
import {
  TabPane,
  Card,
  CardHeader,
  Row,
  Col
} from "reactstrap";
import Search from './Search';
import Menu from '../Components/Menu/Menu';
import Logo from './Logo';
import ManageUser from '../Components/Menu/ManageUser';
import Asset from '../Components/Asset/AssetComponent';
import Users from '../Components/User/Users';
import { defaultGet } from '../consumeApi';

class Admin extends Component {
  constructor(){
    super();
    this.state = {
      assets: [],
      users: [],
    };
  }

  handleAssets() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('users').style.display = 'none';
    document.getElementById('assets').style.display = 'block';

    document.getElementById('btn-assets').classList.add('iriho');
    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-users').classList.remove('iriho');
  }
  handleHome() {
    document.getElementById('assets').style.display = 'none';
    document.getElementById('users').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';

    document.getElementById('btn-home').classList.add('iriho');
    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-users').classList.remove('iriho');
  }
  handleUsers() {
    document.getElementById('dashboard').style.display = 'none';
    document.getElementById('assets').style.display = 'none';
    document.getElementById('users').style.display = 'block';

    document.getElementById('btn-users').classList.add('iriho');
    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-home').classList.remove('iriho');

  }

//   handleProfile() {
//     document.getElementById('panel-content').style.display = 'none';
//     document.getElementById('profile').style.display = 'block';

//     document.getElementById('btn-assets').classList.remove('iriho');
//     document.getElementById('btn-home').classList.remove('iriho');
//     document.getElementById('btn-profile').classList.add('iriho');
//   }
    async componentDidMount() {
    document.getElementById('btn-home').classList.add('iriho');
    const res = await defaultGet('/users', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdE5hbWUiOiJFbWlsZSIsImxhc3ROYW1lIjoiTnNlbmdpbWFuYSIsImVtYWlsIjoiZUBybWguZ292LnJ3IiwiaXNBZG1pbiI6dHJ1ZSwidHlwZSI6Im5vcm1hbCIsImlhdCI6MTU1OTQ5NDk0MH0.4lWgO6_zEj2SNYyVPXxD0WJ31gW66bkd2tW5WOA2dCk');
   const result = await res.json();
    this.setState({ users: result.data });
    console.log(result); 
  }
  render() { 
    return (
      <div>
        <div className="row">
          <div className="navbar col-md-3">
            <div className="side-bar">
              <Logo />
              <Menu
              onAssets={this.handleAssets}
              onHome={this.handleHome}
              />
              <ManageUser 
              onUsers={this.handleUsers}
              />
            </div>
          </div>
          <div className="admin-panel col-md-9">
            <Search/>
          <div id='dashboard'>
                <h6>Dashboard</h6>
                <hr></hr>
              <div>
              <TabPane tabId="1">
              <Row>
                {/* column 1 */}
                <Col sm="6">
                  <Card body style={{ margin: "10px 10px 10px 0" }}>
                    <CardHeader>Summary</CardHeader>
                    <h5>No information available for now</h5>
                  </Card>
                </Col>
                {/* column 2 */}
                <Col sm="6">
                  <Card body style={{ margin: "10px 10px 10px 0" }}>
                    <CardHeader>Workstations</CardHeader>
                    <h5>No information available for now</h5>
                  </Card>
                </Col>
                {/* column 3 */}
                <Col sm="6">
                  <Card body style={{ margin: "10px 10px 10px 0" }}>
                    <CardHeader>Scanner</CardHeader>
                    <h5>No information available for now</h5>
                  </Card>
                </Col>
                {/* column 4 */}
                <Col sm="6">
                  <Card body style={{ margin: "10px 10px 10px 0" }}>
                    <CardHeader>Other</CardHeader>
                    <h5>No information available for now</h5>
                  </Card>
                </Col>
              </Row>
            </TabPane>
              </div>
            </div>
            <Asset />
            <Users 
            allUsers={this.state.users}
            />
          </div>
          
        </div>
      </div>
    );
  }
}
 
export default Admin;
