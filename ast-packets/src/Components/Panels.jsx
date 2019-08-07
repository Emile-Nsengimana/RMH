import React, { Component } from 'react';
import {
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
import classnames from "classnames";
import UserProfile from '../Components/Profile';
import Chart from 'chart.js';
import { defaultGet, consume, remove } from './../API/consumeApi';
import moment from 'moment';
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

  async handleSummary() {
    const overallSummary = await defaultGet('/summary/all', sessionStorage.getItem("token"));
    if (overallSummary.ok) {
      const result = await overallSummary.json();
      console.log(result);

      var pc = result.workstations;
      var printer = result.printer;
      var scanners = result.scanner;
      var ups = result.ups;
      var others = result.others;
    }
    let ctx = document.getElementById('myChart1').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Workstation', 'Scanner', 'UPS', 'Printer', 'Others'],
        datasets: [{
          label: '# of assets',
          data: [pc, scanners, ups, printer, others],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    ctx.innerHTML = myChart;
  }

  async handleWorkstationSummary() {
    const scannerSummary = await defaultGet('/asset/summary/workstation', sessionStorage.getItem("token"));
    var inserviceWorkstation;
    var undermaintenanceWorkstation;
    if (scannerSummary.ok) {
      const result = await scannerSummary.json();
      inserviceWorkstation = result.inservice;
      undermaintenanceWorkstation = result.undermaintenance;
    }
    let ctx = document.getElementById('myChart2').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['in-service', 'under-maintance'],
        datasets: [{
          label: '# of Votes',
          data: [inserviceWorkstation, undermaintenanceWorkstation],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            // 'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            // 'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    ctx.innerHTML = myChart;
  }

  async handleScannerSummary() {

    const scannerSummary = await defaultGet('/asset/summary/scanner', sessionStorage.getItem("token"));
    var inserviceScanner;
    var undermaintenanceScanner;
    if (scannerSummary.ok) {
      const result = await scannerSummary.json();
      inserviceScanner = result.inservice;
      undermaintenanceScanner = result.undermaintenance;
    }
    let ctx = document.getElementById('myChart3').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['in-service', 'under-maintance'],
        datasets: [{
          label: '# of Votes',
          data: [inserviceScanner, undermaintenanceScanner],
          backgroundColor: [
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            // 'rgba(255, 99, 132, 0.2)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            // 'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    ctx.innerHTML = myChart;
  }

  async handleOthersSummary() {
    const scannerSummary = await defaultGet('/asset/summary', sessionStorage.getItem("token"));
    var inserviceAll;
    var undermaintenanceAll;
    if (scannerSummary.ok) {
      const result = await scannerSummary.json();
      inserviceAll = result.inservice;
      undermaintenanceAll = result.undermaintenance;
    }
    let ctx = document.getElementById('myChart4').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['in-service', 'under-maintenance'],
        datasets: [{
          label: '# of Votes',
          data: [inserviceAll, undermaintenanceAll],
          backgroundColor: [
            'rgba(19, 82, 82, 0.541)',
            'rgba(54, 162, 235, 0.2)',
            // 'rgba(255, 206, 86, 0.2)',
            // 'rgba(75, 192, 192, 0.2)',
            // 'rgba(153, 102, 255, 0.2)',
            // 'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(19, 82, 82, 1)',
            'rgba(54, 162, 235, 1)',
            // 'rgba(255, 206, 86, 1)',
            // 'rgba(75, 192, 192, 1)',
            // 'rgba(153, 102, 255, 1)',
            // 'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
    ctx.innerHTML = myChart;
  }

  componentDidMount() {
    this.handleSummary();
    this.handleWorkstationSummary();
    this.handleScannerSummary();
    this.handleOthersSummary();
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
                      <canvas id="myChart1" width="400"></canvas>
                    </Card>
                  </Col>
                  {/* column 2 */}
                  <Col sm="6">
                    <Card body style={{ margin: "10px 10px 10px 0" }}>
                      <CardHeader>Workstations</CardHeader>
                      <canvas id="myChart2" width="400"></canvas>
                    </Card>
                  </Col>
                  {/* column 3 */}
                  <Col sm="6">
                    <Card body style={{ margin: "10px 10px 10px 0" }}>
                      <CardHeader>Scanner</CardHeader>
                      <canvas id="myChart3" width="400"></canvas>
                    </Card>
                  </Col>
                  {/* column 4 */}
                  <Col sm="6">
                    <Card body style={{ margin: "10px 10px 10px 0" }}>
                      <CardHeader>Asset state</CardHeader>
                      <canvas id="myChart4" width="400"></canvas>
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
                      <tr key={asset.serialNo}>
                        <td>{asset.serialNo}</td>
                        <td>{asset.name}</td>
                        <td>{asset.category}</td>
                        <td>{asset.department}</td>
                        <td>{asset.status}</td>
                        <td>{asset.building}</td>
                        <td>{moment(asset.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                      </tr>))}
                  </tbody>
                </table>
                <h5>Total: <Badge href="#" color="secondary">{this.props.inservice.length}</Badge></h5>
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
                      <tr key={asset.serialNo}>
                        <td>{asset.serialNo}</td>
                        <td>{asset.name}</td>
                        <td>{asset.category}</td>
                        <td>{asset.department}</td>
                        <td>{asset.status}</td>
                        <td>{asset.building}</td>
                        <td>{moment(asset.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                      </tr>))}
                  </tbody>
                </table>
                <h5>Total: <Badge href="#" color="secondary">{this.props.undermaintenance.length}</Badge></h5>
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
