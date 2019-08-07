import React, { Component } from 'react';
import { Table } from 'reactstrap';
import moment from 'moment';
import img from './img/rmh-logo.jpeg';
import logoBrand from './img/rmh-img.png';
import Logo from './Components/Logo';
import { defaultGet, consume, remove } from './API/consumeApi';
import UserProfile from './Components/Profile';
import AdminPanel from './Components/AdminPanel';
import Panel from './Components/Panels';
import logoTitle from './img/rmh-logo.jpeg';
import ReadAcquisition from './Components/ReadAcquisition';
import ReactToPrint from 'react-to-print';
import jsPDF from 'jspdf';
// import PDF, { Text, AddPage, Line, Image, Table, Html } from 'jspdf-react'
import html2pdf from 'html2pdf.js';

class Manager extends Component {
  constructor() {
    super();
    this.state = {
      assets: [],
      inservice: [],
      undermaintenance: [],
      acquisition: [],
      requesty: 0,
    };
  }

  handleAssets() {
    document.getElementById('acquisition').style.display = 'none';
    document.getElementById('panels').style.display = 'none';
    // document.getElementById('profile').style.display = 'none';
    document.getElementById('assets').style.display = 'block';
    document.getElementById('acquisition').style.display = 'none';

    document.getElementById('btn-assets').classList.add('iriho');
    document.getElementById('btn-home').classList.remove('iriho');
    // document.getElementById('btn-profile').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.remove('iriho');
  }

  // ---------------------------------------------------------------------------- Home ------------
  handleHome() {
    document.getElementById('acquisition').style.display = 'none';
    // document.getElementById('assets').style.display = 'none';
    // document.getElementById('profile').style.display = 'none';
    document.getElementById('panels').style.display = 'block';

    document.getElementById('btn-home').classList.add('iriho');
    // document.getElementById('btn-assets').classList.remove('iriho');
    // document.getElementById('btn-profile').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.remove('iriho');
  }

  // // -------------------------------------------------------------------------- Profile ------------
  // handleProfile() {
  //   document.getElementById('acquisition').style.display = 'none';
  //   document.getElementById('panels').style.display = 'none';
  //   document.getElementById('assets').style.display = 'none';
  //   // document.getElementById('users').style.display = 'none';
  //   document.getElementById('profile').style.display = 'block';

  //   document.getElementById('btn-assets').classList.remove('iriho');
  //   document.getElementById('btn-home').classList.remove('iriho');
  //   document.getElementById('btn-acquisition').classList.remove('iriho');
  //   // document.getElementById('btn-users').classList.remove('iriho');
  //   document.getElementById('btn-profile').classList.add('iriho');
  // }
  // ---------------------------------------------------------------------------- Logout ------------
  handleLogout() {
    sessionStorage.clear();
    document.getElementById('btn-home').classList.remove('iriho');
    // document.getElementById('btn-assets').classList.remove('iriho');
    // document.getElementById('btn-profile').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.remove('iriho');
    window.location.href = "http://localhost:3000/";
  }

  // -------------------------------------------------------------------------- Profile ------------
  handleViewAcquisition() {
    document.getElementById('panels').style.display = 'none';
    // document.getElementById('assets').style.display = 'none';
    // document.getElementById('users').style.display = 'none';
    // document.getElementById('profile').style.display = 'none';
    document.getElementById('acquisition').style.display = 'block';

    // document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-home').classList.remove('iriho');
    // document.getElementById('btn-users').classList.remove('iriho');
    // document.getElementById('btn-profile').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.add('iriho');
  }

  // ----------------------------------------------------------------------- Reports ------------
  handleReports() {
    // document.getElementById('reports').style.opacity = 0.4;
    // document.getElementById('dashboard').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
  }

  // ----------------------------------------------------------------------- Request Asset ------------
  handleRequestAsset() {
    // document.getElementById('assets').style.opacity = 0.4;
    // document.getElementById('asset-request').style.display = 'block';
  }

  // --------------------------------------------------------------------------- Add Asset ------------
  handleAddAsset() {
    // document.getElementById('assets').style.opacity = 0.4;
    // document.getElementById('add-asset').style.display = 'block';
  }

  // ------------------------------------------------------------------------- Exit Add Asset ------------
  handleExitAddAsset() {
    // document.getElementById('assets').style.opacity = 1;
    // document.getElementById('add-asset').style.display = 'none';
  }

  // --------------------------------------------------------------------- Exit Asset Request ------------
  handleExitAssetRequest() {
    // document.getElementById('assets').style.opacity = 1;
    // document.getElementById('asset-request').style.display = 'none';
  }

  // ---------------------------------------------------------------------- Dispose Asset ------------
  async handleDisposeAsset(ast) {
    // try {
    //   const removeUser = await remove(`/asset/${ast.serialNo}`, 'delete',
    //     sessionStorage.getItem("token"));
    //   const result = await removeUser.json();
    //   const msg = document.getElementById('message');
    //   msg.classList.remove('success');
    //   msg.classList.add('warn');
    //   msg.innerText = result.message;
    // } catch (error) {
    //   throw error;
    // }
    // document.getElementById('btn-home').classList.remove('iriho');
  }

  async handleDisposeAcquisition(acq) {
    // document.getElementById('view-acquisition-model').style.display='none';
    console.log();
    try {
      const removeAcq = await remove(`/acquisitions/${acq.id}`, 'delete',
        sessionStorage.getItem("token"));
      const result = await removeAcq.json();
      const msg = document.getElementById('message');
      msg.classList.remove('success');
      msg.classList.add('warn');
      msg.innerText = result.message;
    } catch (error) {
      throw error;
    }
  }
  handlePrint() {
    // var element = document.getElementById('view-acquisition-model');
    // html2pdf(element);
    document.getElementById('hide-in-report').style.display = 'block';
    document.getElementById('hide-in-report-2').style.display = 'block';
    document.getElementById('hide-in-report-2').classList.add('hide-it');
    var element = document.getElementById('dashboard');
    var opt = {
      margin: 0,
      filename: 'myfile.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 4 },
      jsPDF: { unit: 'in', orientation: 'landscape' }
    };

    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();

    // Old monolithic-style usage:
    html2pdf(element, opt);
  }
  // ----------------------------------------------------------------------------  Mount --------------------
  async componentDidMount() {
    try {
      const token = sessionStorage.getItem('token');
      // if (!token) window.location.href = 'http://localhost:3000/';
      document.getElementById('btn-home').classList.add('iriho');
      const ast = await defaultGet('/asset', sessionStorage.getItem("token"));
      const inservice = await defaultGet('/asset/status/inservice', sessionStorage.getItem("token"));
      const undermaintenance = await defaultGet('/asset/status/under-maintenance', sessionStorage.getItem("token"));
      const acquisitions = await defaultGet('/acquisitions', sessionStorage.getItem("token"));
      if (acquisitions.ok) {
        const resultAcquisition = await acquisitions.json();
        this.setState({ acquisition: resultAcquisition.data });
      }
      if (undermaintenance.ok) {
        const undermaintenanceAst = await undermaintenance.json();
        if (undermaintenanceAst.data) this.setState({ undermaintenance: undermaintenanceAst.data });
      }
      if (inservice.ok) {
        const inserviceAst = await inservice.json();
        this.setState({ inservice: inserviceAst.data });
      }
      if (ast.ok) {
        const resultAst = await ast.json();
        if (resultAst.data) {
          this.setState({ assets: resultAst.data });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  handleReadAcquisition(acquisition) {
    console.log(acquisition);
    document.getElementById('view-acquisition-model').style.display = 'block';
    this.setState({ requesty: acquisition });
    console.log(acquisition);
  }

  // ---------------------------------------------------------------------------- Respond to Asset Acquisition ------------
  async handleRespondAcquisition(response) {
    try {
      console.log(response);
      const res = {
        status: document.getElementById('txt-asset-respond-req').value,
        reason: document.getElementById('txt-asset-reason-req').value,
      };
      const resAcquistion = await consume(`/acquisitions/responde/${response}`, 'put', res, sessionStorage.getItem('token'));
      const sentResponse = await resAcquistion.json();
      console.log(sentResponse);
    } catch (error) {
      console.log(error);
    }
  }

  // ---------------------------------------------------------------------------- Regisster Asset ------------
  async handleRegisterAsset() {
    // try {
    //   const msg = document.getElementById('message');
    //   const newAsset = {
    //     serialNo: document.getElementById('txt-serial-no').value,
    //     name: document.getElementById('txt-name').value,
    //     status: document.getElementById('txt-status').value,
    //     category: document.getElementById('txt-category').value,
    //     department: document.getElementById('txt-department').value,
    //     location: document.getElementById('txt-building').value
    //   };
    //   const registerAsset = await consume('/asset', 'post', newAsset, sessionStorage.getItem('token'));
    //   let assetAdded;
    //   if (registerAsset.status === 201) {
    //     assetAdded = await registerAsset.json();
    //     msg.classList.add('success');
    //     msg.innerText = assetAdded.message;
    //   }
    //   if (registerAsset.status !== 201) {
    //     assetAdded = await registerAsset.json();
    //     msg.classList.add('warn');
    //     msg.innerText = assetAdded.error;
    //     // document.getElementById('message').innerHTML = assetAdded.data.message;
    //   }

    // } catch (error) {
    //   throw error;
    // }
  }

  // async componentDidUpdate() {
  // document.getElementById('btn-home').classList.add('iriho');
  // try {
  //   const ast = await defaultGet('/asset', sessionStorage.getItem('token'));
  //   if (ast.ok) {
  //     const resultAst = await ast.json();
  //     if (!resultAst.data) {
  //       this.setState({ assets: [] });
  //     }
  //     if (resultAst.data) {
  //       this.setState({ assets: resultAst.data });
  //     }
  //   }

  // } catch (error) {
  //   throw error;
  // }
  // this.componentDidMount();
  // }
  handleRequestRejection() {
    const isRejected = document.getElementById('txt-asset-respond-req').value;
    console.log(isRejected === 'rejected');
    if (isRejected === 'rejected') document.getElementById('reject').style.display = 'block';
    if (isRejected !== 'rejected') document.getElementById('reject').style.display = 'none';
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="navbar col-md-3">
            <div className="side-bar">
              <Logo />
              <div>
                <ul>
                  <li id="btn-home" onClick={this.handleHome}>Home</li>
                  {/* <li id="btn-assets" onClick={this.handleAssets}>Assets</li> */}
                  {/* <label className="lb-colored-title">Your</label> */}
                  {/* <li id="btn-profile" onClick={this.handleProfile}>Profile</li> */}
                  <li id="btn-acquisition" onClick={this.handleReports}>Reports</li>
                  <li id="btn-acquisition" onClick={this.handleViewAcquisition}>Acquisition</li>
                  <li id="btn-notes" onClick={this.handleLogout}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="user-panel col-md-9">
            <div id="message"></div>

            {/* ----------------------------------------------------- ASSETS ----------------------------------------------------- */}
            <div id="assets">
              <div className="logo-header">
                <img src={logoBrand} alt=' RMH ' width="800px" />
              </div>
              <div id="message-assets"></div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Serial No.</th>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Location</th>
                    <th>Issue date</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.assets.map(asset => (
                    <tr key={asset.serialNo}>
                      <td>{asset.serialNo}</td>
                      <td>{asset.name}</td>
                      <td>{asset.category}</td>
                      <td>{asset.department}</td>
                      <td>{asset.status}</td>
                      <td>{asset.building}</td>
                      <td>{moment(asset.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                      <th><button className="btn btn-sm"><i className="fas fa-pen"></i></button></th>
                      <th><button className="btn btn-sm btn-danger" onClick={() => this.handleDisposeAsset(asset)}><i className="fas fa-trash-alt"></i></button></th>
                    </tr>))}
                </tbody>
              </Table>
              <button onClick={this.handleAddAsset} className="btn-normal">New asset</button>
              <button onClick={this.handleRequestAsset} className="btn-normal">Request asset</button>
            </div>

            {/* ----------------------------------------------------- ACQUISITIONS ----------------------------------------------------- */}
            <div id="acquisition">
              <div className="logo-header">
                <img src={logoBrand} alt=' RMH ' width="800px" />
              </div>
              <div id="message-assets"></div>
              <Table responsive>
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Name</th>
                    <th>Description</th>
                    <th>Reason</th>
                    <th>Request by</th>
                    <th>Status</th>
                    <th>Descision</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.acquisition.map(acquisition => (
                    <tr key={acquisition.id} onDoubleClick={() => this.handleReadAcquisition(acquisition)}>
                      {/* <td>{acquisition.id}</td> */}
                      <td>{acquisition.assetName}</td>
                      <td>{acquisition.description}</td>
                      <td>{acquisition.reason}</td>
                      <td>{acquisition.requestedBy}</td>
                      <td>{acquisition.status}</td>
                      <td>{acquisition.decisionReason}</td>
                      {/* <td>{moment(acquisition.createdAt).format('DD-MM-YYYY HH:mm')}</td> */}
                      <th><button className="btn btn-sm btn-danger" onClick={() => this.handleDisposeAcquisition(acquisition)}><i className="fas fa-trash-alt"></i></button></th>
                    </tr>))}
                </tbody>
              </Table>
            </div>

            {/* ----------------------------------------------------- ASSET REQUEST ----------------------------------------------------- */}
            {/* <div id="asset-request">
              <img src={img} alt=""></img>
              <h5>ASSET ACQUISITION FORM</h5>
              <div className="form-group">
                <label>Name</label>
                <input id="txt-asset-name" type="text" className="form-control" placeholder="UPS, Monitor, Keyboard ..." />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea id="txt-asset-description" className="form-control" rows="4"></textarea>
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea id="txt-asset-reason" className="form-control" rows="4"></textarea>
              </div>
              <button type="submit" className="btn btn-warning" onClick={this.handleExitAssetRequest}>Cancel</button>
              <button className="btn-normal" onClick={this.handleAcquireAsset}>Request</button>
            </div> */}

            {/* ----------------------------------------------------- ADD ASSET ----------------------------------------------------- */}

            {/* <div id="add-asset">
              <div className="logo-header">
                <img src={logoTitle} alt=' RMH ' />
              </div>
              <h3>ADD ASSET FORM</h3>
              <form>
              <div className="asset-info">
                <div className="form-group">
                  <label>Serial No</label>
                  <small className="text-muted">*</small>
                  <input type="text" className="form-control" id="txt-serial-no" />
                </div>

                <div className="form-group">
                  <label>Name</label>
                  <small className="text-muted">*</small>
                  <input type="text" className="form-control" id="txt-name" />
                </div>

                <div className="form-group">
                  <label>Status</label><small className="text-muted">*</small>
                  <input type="text" className="form-control" id="txt-status" /> */}
            {/* <select className="form-control" id="txt-status" >
                    <option value="under-maintenance">Under-maintenance</option>
                    <option value="inservice">In-service</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Category</label><small className="text-muted">*</small>
                  <input type="text" className="form-control" id="txt-category" />
                </div>

                <div className="form-group">
                  <label>Department</label><small className="text-muted">*</small>
                  {/* <input type="text" className="form-control" id="txt-department" /> */}
            {/* <select className="form-control" id="txt-department" >
                    <option value="Networking">Networking</option>
                    <option value="Software">Software</option>
                    <option value="Hardware">Hardware</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Building</label><small className="text-muted">*</small>
                  <input type="text" className="form-control" id="txt-building" />
                </div>
              </div>
              <button type="submit" className="btn btn-warning" onClick={this.handleExitAddAsset}>Cancel</button>
              <button type="submit" className="btn btn-normal" onClick={this.handleRegisterAsset}>Add</button>
              </form>  */}
            {/* </div> */}
            <button className="btn-print" onClick={this.handlePrint}>Export as pdf</button>

            <div id='dashboard'>
              {/* <Search /> */}
              <AdminPanel
              // inservice={this.state.inservice}
              // undermaintenance={this.state.undermaintenance}
              />
              <div>

              </div>

            </div>

            <div id="profile">
              <UserProfile />
            </div>
          </div>
          <div id="view-acquisition-model">
          <img src={img} alt=""></img><br/>
                     <h2>REQUEST DETAILS</h2>      
                <h5>Request made by: <i>{this.state.requesty.requestedBy}</i></h5>
                <div className="form-group">
                  <label>Requesting</label>
                  <input id="txt-asset-name" type="text" disabled className="form-control" value={this.state.requesty.assetName} />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea id="txt-asset-description" disabled className="form-control" value={this.state.requesty.description} rows="2"></textarea>
                </div>

                <div className="form-group">
                  <label>Reason</label>
                  <textarea id="txt-asset-reason" disabled className="form-control" value={this.state.requesty.reason} rows="2"></textarea>
                </div>
                <div className="form-group">
                  <label>Status</label>
                  <input disabled className="form-control" value={this.state.requesty.status} />
                </div>
                <hr/>
                <div className="form-group">
                  <label>Respond to this request</label>
                  <select id="txt-asset-respond-req" className="form-control" onChange={this.handleRequestRejection}>
                    <option value='accepted'>accept</option>
                    <option value='rejected'>reject</option>
                  </select>
                  <div id="reject" className="form-group"><br/>
                  <label>Reason for rejection</label>
                  <textarea id="txt-asset-reason-req" className="form-control" rows="2"></textarea>

                </div>
                </div>
                {/* <button type="submit" className="btn btn-warning" onClick={this.handleExitAssetRequest}>Deny</button>
                <button className="btn-normal" onClick={this.handleAcquireAsset}>Approve</button> */}
            <div >
            {/* <button type="submit" className="btn btn-warning" onClick={this.handlePrint}>Print</button> */}
            <button className="btn-normal" onClick={() => this.handleRespondAcquisition(this.state.requesty.id)}>Respond</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Manager;
