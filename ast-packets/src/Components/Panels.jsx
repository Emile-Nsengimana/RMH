import React, { Component } from 'react';
import {
  Table,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  CardHeader,
  Badge,
  Row,
  Col
} from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import classnames from "classnames";
import UserProfile from '../Components/Profile';

export default class Panels extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }


  render() {
    return (
      <React.Fragment>
        <div id="panel-content">
          {/* <div className="search">
          <InputGroup className="txt-lg">
            <label className="lb-default">SEARCH</label>
            <Input />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </div> */}


          {/* panels */}
          <div id="panels" className="nav-default">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "1" })}
                  onClick={() => {
                    this.toggle("1");
                  }}
                >
                  Dashboard
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "2" })}
                  onClick={() => {
                    this.toggle("2");
                  }}
                >
                  Inservice
            </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === "3" })}
                  onClick={() => {
                    this.toggle("3");
                  }}
                >
                  Under-maintenance
            </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>

              {/* ---------------------------------------------------- TAB 1 -------------------------------------------------------- */}

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

              {/* ---------------------------------------------------- TAB 2 -------------------------------------------------------- */}

              <TabPane tabId="2">
                <div className="asset-title">
                  <h4>IN-SERVICE ASSETS</h4>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Serial No.</th>
                      <th>Name</th>
                      <th>category</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Building</th>
                      <th>Service date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.inservice.map(asset => (
                      <tr key={asset.serialno}>
                        <td>{asset.serialno}</td>
                        <td>{asset.name}</td>
                        <td>{asset.category}</td>
                        <td>{asset.department}</td>
                        <td>{asset.status}</td>
                        <td>{asset.location}</td>
                        <td>{asset.servicedate}</td>
                      </tr>))}
                  </tbody>
                </table>
                <h6>Total: <Badge href="#" color="secondary">10</Badge></h6>
              </TabPane>

              {/* ---------------------------------------------------- TAB 3 -------------------------------------------------------- */}

              <TabPane tabId="3">
                <div className="asset-title">
                  <h4>UNDER-MAINTENANCE ASSETS</h4>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>Serial No.</th>
                      <th>Name</th>
                      <th>category</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Building</th>
                      <th>Service date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.props.undermaintenance.map(asset => (
                      <tr key={asset.serialno}>
                        <td>{asset.serialno}</td>
                        <td>{asset.name}</td>
                        <td>{asset.category}</td>
                        <td>{asset.department}</td>
                        <td>{asset.status}</td>
                        <td>{asset.location}</td>
                        <td>{asset.servicedate}</td>
                      </tr>))}
                  </tbody>
                </table>
                <h6>Total: <Badge href="#" color="secondary">10</Badge></h6>
              </TabPane>
            </TabContent>
          </div>
        </div>
        {/* <div id="profile">
                <UserProfile />
        </div>
        <div id="notes">

        </div> */}


      </React.Fragment>
    );
  }
}
