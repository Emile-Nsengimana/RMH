import React, { Component } from 'react';
import  AdminSideBar  from './components/menu/AdminSideBar';
import {
  Input,
  InputGroup,
  InputGroupAddon,
  TabPane,
  Nav,
  Card,
  CardHeader,
  Button,
  Row,
  Col
} from "reactstrap";

class Admin extends Component {
  handleAssets() {
    document.getElementById('panel-content').style.display = 'block';
    document.getElementById('panels').style.display = 'none';
    document.getElementById('assets').style.display = 'block';
    document.getElementById('profile').style.display = 'none';

    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-profile').classList.remove('iriho');
    document.getElementById('btn-assets').classList.add('iriho');
  }
  handleHome() {
    document.getElementById('panel-content').style.display = 'block';
    document.getElementById('assets').style.display = 'none';
    document.getElementById('profile').style.display = 'none';
    document.getElementById('panels').style.display = 'block';

    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-profile').classList.remove('iriho');
    document.getElementById('btn-home').classList.add('iriho');
  }
  handleProfile() {
    document.getElementById('panel-content').style.display = 'none';
    document.getElementById('profile').style.display = 'block';

    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-profile').classList.add('iriho');
  }
  componentDidMount() {
    document.getElementById('btn-home').classList.add('iriho');
  }
  render() { 
    return (
      <div>
        <div className="row">
          <div className="navbar col-md-3">
            <AdminSideBar />
          </div>
          <div className="col-md-9">
          <Nav>
            <div className="nav-default">
              <InputGroup className="txt-lg">
                <label className="lb-default">SEARCH</label>
                <Input />
                <InputGroupAddon addonType="append">
                  <Button color="secondary">Search</Button>
                </InputGroupAddon>
              </InputGroup>
              <div>
              {/* <NavItem> */}
                <h6>Dashboard</h6>
                <hr></hr>
              {/* </NavItem> */}
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
            </div>
            
          </Nav>
          </div>
          
        </div>
      </div>
    );
  }
}
 
export default Admin;
