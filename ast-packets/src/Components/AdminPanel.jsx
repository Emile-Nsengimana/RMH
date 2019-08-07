import React, { Component } from 'react';
import {
  TabContent,
  TabPane,
  Nav,
  Card,
  CardHeader,
  Row,
  Col
} from "reactstrap";
import Chart from 'chart.js';
import { defaultGet} from './../API/consumeApi';
import moment from 'moment';
import logoBrand from '../img/rmh-img.png';

export default class Panels extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1",
      pcs: 0,
      printers: 0,
      scanners: 0,
      ups: 0,
      others: 0
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
      this.setState({pcs: result.workstations, printers: result.printer, scanners: result.scanner, ups: result.ups, others: result.others});
    }
    let ctx = document.getElementById('myChart1').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Workstation', 'Scanner', 'UPS', 'Printer', 'Others'],
        datasets: [{
          label: '# of assets',
          data: [this.state.pcs, this.state.scanners, this.state.ups, this.state.printers, this.state.others],
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
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
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
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
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
            'rgba(54, 162, 235, 0.2)'
          ],
          borderColor: [
            'rgba(19, 82, 82, 1)',
            'rgba(54, 162, 235, 1)'
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
          <div id="panels" className="nav-default">
          <div id='hide-in-report' className="form-group-last">
                <div className="logo-header">
                  <img src={logoBrand} alt=' RMH ' width="800px" />
                </div>
                <h1>Asset summary report</h1>
                <br></br>

                <label>Workstations: </label><input className="summary" defaultValue={this.state.pcs}></input><br></br>
                <label>Scanner: </label><input className="summary" defaultValue={this.state.scanners}></input><br></br>
                <label>UPS: </label><input className="summary" defaultValue={this.state.ups}></input><br></br>
                <label>Printer: </label><input className="summary" defaultValue={this.state.printers}></input><br></br>
                <label>Others: </label><input className="summary" defaultValue={this.state.others}></input>
              </div>
            <TabContent activeTab={this.state.activeTab}>

              {/* ---------------------------------------------------- TAB 1 -------------------------------------------------------- */}

              <TabPane tabId="1">
                <Row>
                  {/* column 1 */}
                  <Col sm="6">
                    <Card body style={{ margin: "10px 10px 10px 0" }}>
                      <CardHeader>Summary</CardHeader>
                      <canvas id="myChart1" width="400" height="250"></canvas>
                    </Card>
                  </Col>
                  {/* column 2 */}
                  <Col sm="6">
                    <Card body style={{ margin: "10px 10px 10px 0" }}>
                      <CardHeader>Workstations</CardHeader>
                      <canvas id="myChart2" width="400" height="250"></canvas>
                    </Card>
                  </Col>
                  {/* column 3 */}
                  <Col sm="6">
                    <Card body style={{ margin: "10px 10px 10px 0" }}>
                      <CardHeader>Scanner</CardHeader>
                      <canvas id="myChart3" width="400" height="250"></canvas>
                    </Card>
                  </Col>
                  {/* column 4 */}
                  <Col sm="6">
                    <Card body style={{ margin: "10px 10px 10px 0" }}>
                      <CardHeader>Asset state</CardHeader>
                      <canvas id="myChart4" width="400" height="250"></canvas>
                    </Card>
                  </Col>
                </Row>
              </TabPane>
            </TabContent>
            <div id='hide-in-report-2' className="print">
                  <label className="printed">Printed on: </label><label className="printed-value">{moment.utc().format('DD-MM-YYYY')}</label><br />
                  <label className="printed">Printed by: </label><label className="printed-value">{sessionStorage.getItem('lastName')} {sessionStorage.getItem('firstName')}</label>
                </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
