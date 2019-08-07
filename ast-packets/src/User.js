import React, { Component } from 'react';
import img from './img/rmh-logo.jpeg';
import logoBrand from './img/rmh-img.png';
import Logo from './Components/Logo';
import { defaultGet, consume, remove } from './API/consumeApi';
import UserProfile from './Components/Profile';
import Panel from './Components/Panels';
import logoTitle from './img/rmh-logo.jpeg';
import moment from 'moment';
import html2pdf from 'html2pdf.js';
import AcquisitionReport from './Components/AcquisitionReport';

class User extends Component {
  constructor() {
    super();
    this.state = {
      assets: [],
      inservice: [],
      undermaintenance: [],
      acquisition: [],
      acquisitionReq: []
    };
  }

  handleAssets() {
    document.getElementById('acquisition').style.display = 'none';
    document.getElementById('panels').style.display = 'none';
    document.getElementById('assets').style.display = 'block';
    document.getElementById('acquisition').style.display = 'none';

    document.getElementById('btn-assets').classList.add('iriho');
    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.remove('iriho');
  }

  // ---------------------------------------------------------------------------- Home ------------
  handleHome() {
    document.getElementById('acquisition').style.display = 'none';
    document.getElementById('assets').style.display = 'none';
    document.getElementById('panels').style.display = 'block';

    document.getElementById('btn-home').classList.add('iriho');
    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.remove('iriho');
  }

  // ---------------------------------------------------------------------------- Logout ------------
  handleLogout() {
    sessionStorage.clear();
    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.remove('iriho');
    window.location.href = "http://localhost:3000/";
  }

  // -------------------------------------------------------------------------- Profile ------------
  handleViewAcquisition() {
    document.getElementById('panels').style.display = 'none';
    document.getElementById('assets').style.display = 'none';
    document.getElementById('acquisition').style.display = 'block';

    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-acquisition').classList.add('iriho');
  }

  // ----------------------------------------------------------------------- Request Asset ------------
  handleRequestAsset() {
    document.getElementById('assets').style.opacity = 0.4;
    document.getElementById('asset-request').style.display = 'block';
  }

  // --------------------------------------------------------------------------- Add Asset ------------
  handleAddAsset() {
    document.getElementById('assets').style.opacity = 0.4;
    document.getElementById('add-asset').style.display = 'block';
  }

  // ------------------------------------------------------------------------- Exit Add Asset ------------
  handleExitAddAsset() {
    document.getElementById('assets').style.opacity = 1;
    document.getElementById('add-asset').style.display = 'none';
  }

  // --------------------------------------------------------------------- Exit Asset Request ------------
  handleExitAssetRequest() {
    document.getElementById('assets').style.opacity = 1;
    document.getElementById('asset-request').style.display = 'none';
  }

  // ---------------------------------------------------------------------- Dispose Asset ------------
  async handleDisposeAsset(ast) {
    try {
      const removeUser = await remove(`/asset/${ast.serialNo}`, 'delete',
        sessionStorage.getItem("token"));
      const result = await removeUser.json();
      const msg = document.getElementById('message');
      msg.classList.remove('success');
      msg.classList.add('warn');
      msg.innerText = result.message;
    } catch (error) {
      throw error;
    }
    document.getElementById('btn-home').classList.remove('iriho');
  }

  // ----------------------------------------------------------------------------  Mount --------------------
  async componentDidMount() {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) window.location.href = 'http://localhost:3000/';
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
  handlePrint() {
    // html2pdf(element);
    var element = document.getElementById('acquisition');
    var opt = {
      margin:       0,
      filename:     'myfile.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { scale: 4 },
      jsPDF:        { unit: 'in', orientation: 'landscape' }
    };
    
    // New Promise-based usage:
    html2pdf().set(opt).from(element).save();
    
    // Old monolithic-style usage:
    html2pdf(element, opt);
  }
  // ---------------------------------------------------------------------------- Asset Acquisition ------------
  async handleAcquireAsset() {
    try {
      const newAcquisition = {
        assetName: document.getElementById('txt-asset-name').value,
        description: document.getElementById('txt-asset-description').value,
        reason: document.getElementById('txt-asset-reason').value,
      };
      const sendAcquistion = await consume('/asset/acquisition', 'post', newAcquisition, sessionStorage.getItem('token'));
      const sentAcquistion = await sendAcquistion.json();
    } catch (error) {

    }
  }

  // ---------------------------------------------------------------------------- Regisster Asset ------------
  async handleRegisterAsset() {
    try {
      const msg = document.getElementById('message');
      const newAsset = {
        serialNo: document.getElementById('txt-serial-no').value,
        name: document.getElementById('txt-name').value,
        status: document.getElementById('txt-status').value,
        category: document.getElementById('txt-category').value,
        department: document.getElementById('txt-department').value,
        building: document.getElementById('txt-building').value
      };
      const registerAsset = await consume('/asset', 'post', newAsset, sessionStorage.getItem('token'));
      let assetAdded;
      if (registerAsset.status === 201) {
        assetAdded = await registerAsset.json();
        msg.classList.add('success');
        msg.innerText = assetAdded.message;
      }
      if (registerAsset.status !== 201) {
        assetAdded = await registerAsset.json();
        msg.classList.add('warn');
        msg.innerText = assetAdded.error;
        // document.getElementById('message').innerHTML = assetAdded.data.message;
      }

    } catch (error) {
      throw error;
    }
  }

  async handleAcquisitionReport(payload){
    await this.setState({acquisitionReq: payload});
    if(payload.status === 'rejected'){
      document.getElementById('stamp-approve').style.display = 'none';
      document.getElementById('stamp-deny').style.display = 'block';
      document.getElementById('acquisition-report').style.display = 'block';
      return;
    }
    if(payload.status === 'approved'){
    document.getElementById('stamp-deny').style.display = 'none';
    document.getElementById('stamp-approve').style.display = 'block';
    document.getElementById('acquisition-report').style.display = 'block';
    }

    return;
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
                  <li id="btn-assets" onClick={this.handleAssets}>Assets</li>
                  {/* <label className="lb-colored-title">Your</label> */}
                  {/* <li id="btn-profile" onClick={this.handleProfile}>Profile</li> */}
                  <li id="btn-acquisition" onClick={this.handleViewAcquisition} onDoubleClick={this.handleFill}>Acquisition</li>
                  <li id="btn-notes" onClick={this.handleLogout}>Logout</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="user-panel col-md-9">
            <div id="message"></div>
            <button onClick={this.handlePrint}>Print</button>

            {/* ----------------------------------------------------- ASSETS ----------------------------------------------------- */}
            <div id="assets">
              <div className="logo-header">
                <img src={logoBrand} alt=' RMH ' width="800px" />
              </div>
              <div id="message-assets"></div>
              <table responsive>
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
              </table>
              <button onClick={this.handleAddAsset} className="btn-normal">New asset</button>
              <button onClick={this.handleRequestAsset} className="btn-normal">Request asset</button>
            </div>

            {/* ----------------------------------------------------- ACQUISITIONS ----------------------------------------------------- */}
            <div id="acquisition">
              <div className="logo-header">
                <img src={logoBrand} alt=' RMH ' width="800px" />
              </div>
              <div id="message-assets"></div>
              <table responsive>
                <thead>
                  <tr>
                    {/* <th>#</th> */}
                    <th>Requesting</th>
                    <th>Description</th>
                    {/* <th>Reason</th> */}
                    <th>Requested by</th>
                    <th>Status</th>
                    <th>Decision</th>
                    <th>Requested on</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.acquisition.map(acquisition => (
                    <tr key={acquisition.id} onDoubleClick={() => {this.handleAcquisitionReport(acquisition)}}>
                      {/* <td>{acquisition.id}</td> */}
                      <td>{acquisition.assetName}</td>
                      <td>{acquisition.description}</td>
                      {/* <td>{acquisition.reason}</td> */}
                      <td>{acquisition.requestedBy}</td>
                      <td>{acquisition.decision}</td>
                      <td>{acquisition.status}</td>
                      <td>{moment(acquisition.createdAt).format('DD-MM-YYYY HH:mm')}</td>
                      <th><button className="btn btn-sm btn-danger" onClick={() => this.handleDisposeAsset(acquisition)}><i className="fas fa-trash-alt"></i></button></th>
                    </tr>))}
                </tbody>
              </table>
            </div>

            {/* ----------------------------------------------------- ASSET REQUEST ----------------------------------------------------- */}
            <div id="asset-request">
              <img src={img} alt=""></img>
              <h5>ASSET ACQUISITION FORM</h5>
              <div className="form-group">
                <label>Requesting</label>
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
            </div>

            {/* ----------------------------------------------------- ADD ASSET ----------------------------------------------------- */}

            <div id="add-asset">
              <div className="logo-header">
                <img src={logoTitle} alt=' RMH ' />
              </div>
              <h3>ADD ASSET FORM</h3>
              {/* <form> */}
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
                  {/* <input type="text" className="form-control" id="txt-status" /> */}
                  <select className="form-control" id="txt-status" >
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
                  <select className="form-control" id="txt-department" >
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
              {/* </form> */}
            </div>

            <div id='dashboard'>
              {/* <Search /> */}
              <Panel
                inservice={this.state.inservice}
                undermaintenance={this.state.undermaintenance}
              />
            </div>
            <div id="profile">
              <UserProfile />
            </div>
            <AcquisitionReport 
              acquisitionInfo={this.state.acquisitionReq}  
            />
          </div>

        </div>

      </div>
    );
  }
}

export default User;
