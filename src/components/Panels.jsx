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
  Button,
  Badge,
  Row,
  Col
} from "reactstrap";
import { InputGroup, InputGroupAddon, Input } from "reactstrap";
import classnames from "classnames";
import UserProfile from '../components/user/UserProfile';

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

  handleAddAsset(){
    document.getElementById('assets').style.opacity = 0.4;
    document.querySelector('.search').style.opacity = 0.4;
    document.getElementById('add-asset').style.display = 'block';
  }
  render() {
    return (
      <React.Fragment>
        <div id="panel-content">
        <div className="search">
          <InputGroup className="txt-lg">
            <label className="lb-default">SEARCH</label>
            <Input />
            <InputGroupAddon addonType="append">
              <Button color="secondary">Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </div>

        {/* Assets */}
        <div id="assets">
          <Table responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Department</th>
                <th>Status</th>
                <th>Issue date</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>UPS-1</td>
                <td>APC</td>
                <td>Hardware</td>
                <td>Inservice</td>
                <td>12-12-2019</td>
                <th><button className="btn btn-sm"><i class="fas fa-pen"></i></button></th>
                <th><button className="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button></th>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>UPS-1</td>
                <td>APC</td>
                <td>Hardware</td>
                <td>Inservice</td>
                <td>12-12-2019</td>
                <th><button className="btn btn-sm"><i class="fas fa-pen"></i></button></th>
                <th><button className="btn btn-danger btn-sm"><i class="fas fa-trash-alt"></i></button></th>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>UPS-1</td>
                <td>APC</td>
                <td>Hardware</td>
                <td>Inservice</td>
                <td>12-12-2019</td>
                <th><button className="btn btn-sm"><i class="fas fa-pen"></i></button></th>
                <th><button className="btn btn-sm btn-danger"><i class="fas fa-trash-alt"></i></button></th>
              </tr>
            </tbody>
          </Table>
          <button onClick={this.handleAddAsset} className="btn btn-normal">New asset</button>
          <button className="btn btn-normal">Request asset</button>
        </div>
        <div id="add-asset">
          <form>
            <div className="asset-info">
            <div class="form-group">
              <label for="exampleInputEmail1">Serial No</label>
              {/* <small id="emailHelp" class="form-text text-muted">*</small> */}
              <input type="text" class="form-control" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Manufacture</label>
              {/* <small id="emailHelp" class="form-text text-muted">*</small> */}
              <input type="text" class="form-control" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Type</label>
              <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Department</label>
              <input type="text" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Status</label>
              <input type="text" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Date of service</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            </div>
            {/* Asset location */}
            <div className="asset-location">
            <div class="form-group">
              <label for="exampleInputEmail1">Serial No</label>
              {/* <small id="emailHelp" class="form-text text-muted">*</small> */}
              <input type="text" class="form-control" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">Manufacture</label>
              {/* <small id="emailHelp" class="form-text text-muted">*</small> */}
              <input type="text" class="form-control" aria-describedby="emailHelp"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Type</label>
              <input type="password" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Department</label>
              <input type="text" class="form-control" id="exampleInputPassword1"/>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Status</label>
              <input type="text" class="form-control" id="exampleInputPassword1" />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Date of service</label>
              <input type="password" class="form-control" id="exampleInputPassword1" />
            </div>
            </div>
            
            {/* <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="exampleCheck1" />
              <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div> */}
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
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
                Network
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggle("3");
                }}
              >
                Hardware
            </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === "4" })}
                onClick={() => {
                  this.toggle("4");
                }}
              >
                Software
            </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
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
            <TabPane tabId="2">
              <table>
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th>Actual Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                </tbody>
              </table>
              <h6>Total: <Badge href="#" color="secondary">10</Badge></h6>
            </TabPane>
            <TabPane tabId="3">
              <table>
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Type</th>
                    <th>Actual Location</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                  <tr>
                    <td>2183901802</td>
                    <td>HP-101</td>
                    <td>Hardware</td>
                    <td>Workstation</td>
                    <td>CT scan</td>
                    <td>Inservice</td>
                  </tr>
                </tbody>
              </table>
              <h6>Total: <Badge href="#" color="secondary">10</Badge></h6>
            </TabPane>
            <TabPane tabId="4">
              <Row>
                <Col sm="12">
                  <table>
                    <thead>
                      <tr>
                        <th>Serial No.</th>
                        <th>Name</th>
                        <th>Department</th>
                        <th>Type</th>
                        <th>Actual Location</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2183901802</td>
                        <td>HP-101</td>
                        <td>Hardware</td>
                        <td>Workstation</td>
                        <td>CT scan</td>
                        <td>Inservice</td>
                      </tr>
                      <tr>
                        <td>2183901802</td>
                        <td>HP-101</td>
                        <td>Hardware</td>
                        <td>Workstation</td>
                        <td>CT scan</td>
                        <td>Inservice</td>
                      </tr>
                      <tr>
                        <td>2183901802</td>
                        <td>HP-101</td>
                        <td>Hardware</td>
                        <td>Workstation</td>
                        <td>CT scan</td>
                        <td>Inservice</td>
                      </tr>
                      <tr>
                        <td>2183901802</td>
                        <td>HP-101</td>
                        <td>Hardware</td>
                        <td>Workstation</td>
                        <td>CT scan</td>
                        <td>Inservice</td>
                      </tr>
                      <tr>
                        <td>2183901802</td>
                        <td>HP-101</td>
                        <td>Hardware</td>
                        <td>Workstation</td>
                        <td>CT scan</td>
                        <td>Inservice</td>
                      </tr>
                      <tr>
                        <td>2183901802</td>
                        <td>HP-101</td>
                        <td>Hardware</td>
                        <td>Workstation</td>
                        <td>CT scan</td>
                        <td>Inservice</td>
                      </tr>
                      <tr>
                        <td>2183901802</td>
                        <td>HP-101</td>
                        <td>Hardware</td>
                        <td>Workstation</td>
                        <td>CT scan</td>
                        <td>Inservice</td>
                      </tr>
                    </tbody>
                  </table>
                  <h6>Total: <Badge href="#" color="secondary">10</Badge></h6>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
        </div>
        <div id="profile">
                <UserProfile />
        </div>
        <div id="notes">

        </div>
      </React.Fragment>
    );
  }
}
