import React, { Component } from 'react';
import { Table } from 'reactstrap';
import img from './img/rmh-logo.jpeg';
import logoBrand from './img/rmh-img.png';
import Logo from './Components/Logo';
import { defaultGet, consume, remove } from './API/consumeApi';
// import UserProfile from './Components/Profile';
import Panel from './Components/Panels';
import logoTitle from './img/rmh-logo.jpeg';
import moment from 'moment';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      assets: [],
      inservice: [],
      undermaintenance: [],
      users: [],
      acquisitions: []
    };
  }

  handleAssets() {
    document.getElementById('panels').style.display = 'none';
    document.getElementById('users').style.display = 'none';
    // document.getElementById('profile').style.display = 'none';
    document.getElementById('assets').style.display = 'block';

    document.getElementById('btn-assets').classList.add('iriho');
    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-users').classList.remove('iriho');
    // document.getElementById('btn-profile').classList.remove('iriho');
  }

  async handleDisposeAsset(ast) {
    try {
      const removeUser = await remove(`/asset/${ast.serialno}`, 'delete',
        sessionStorage.getItem("token"));
      const result = await removeUser.json();
      const msg = document.getElementById('message');
      msg.classList.add('warn');
      msg.innerText = result.message;

    } catch (error) {
      throw error;
    }
    this.componentDidMount();
    document.getElementById('btn-home').classList.remove('iriho');
  }

  handleHome() {
    document.getElementById('assets').style.display = 'none';
    // document.getElementById('profile').style.display = 'none';
    document.getElementById('panels').style.display = 'block';
    document.getElementById('users').style.display = 'none';

    document.getElementById('btn-home').classList.add('iriho');
    document.getElementById('btn-assets').classList.remove('iriho');
    document.getElementById('btn-users').classList.remove('iriho');
  }

  handleUsers() {
    document.getElementById('assets').style.display = 'none';
    // document.getElementById('profile').style.display = 'none';
    document.getElementById('panels').style.display = 'none';
    document.getElementById('users').style.display = 'block';

    document.getElementById('btn-home').classList.remove('iriho');
    document.getElementById('btn-assets').classList.remove('iriho');
    // document.getElementById('btn-profile').classList.remove('iriho');
    document.getElementById('btn-users').classList.add('iriho');
  }

  // handleProfile() {
  //   document.getElementById('panels').style.display = 'none';
  //   document.getElementById('assets').style.display = 'none';
  //   document.getElementById('users').style.display = 'none';
  //   document.getElementById('profile').style.display = 'block';

  //   document.getElementById('btn-assets').classList.remove('iriho');
  //   document.getElementById('btn-home').classList.remove('iriho');
  //   document.getElementById('btn-users').classList.remove('iriho');
  //   document.getElementById('btn-profile').classList.add('iriho');
  // }

  handleRequestAsset() {
    document.getElementById('assets').style.opacity = 0.4;
    document.getElementById('asset-request').style.display = 'block';
  }
  handleAddAsset() {
    document.getElementById('assets').style.opacity = 0.4;
    document.getElementById('add-asset').style.display = 'block';
  }

  handleAddUser() {
    document.getElementById('modal-add-user').style.display = 'block';
  }

  async handleRegisterUser() {
    const userId = document.getElementById('txt-userid').value;
    const firstName = document.getElementById('txt-fname').value;
    const lastName = document.getElementById('txt-lname').value;
    const gender = document.getElementById('txt-gender').value;
    const email = document.getElementById('txt-email').value;
    const phoneNo = document.getElementById('txt-phone').value;
    const department = document.getElementById('txt-department-2').value;
    const password = document.getElementById('txt-password').value;
    const confirmPassword = document.getElementById('txt-password').value;
    const type = document.getElementById('txt-type').value;

    const newUser = {
      userId,
      firstName,
      lastName,
      gender,
      department,
      type,
      email,
      phoneNo,
      password,
      confirmPassword
    };
    const addNewUser = await consume('/auth/signup', 'post', newUser, sessionStorage.getItem('token'));
    const userAdded = await addNewUser.json();
    console.log(userAdded);
  }

  async handleRemoveUser(usr) {
    try {
      const removeUser = await remove(`/user/${usr.userId}`, 'delete', sessionStorage.getItem('token'))
      const result = await removeUser.json();
      const msg = document.getElementById('message');
      msg.classList.add('warn');
      msg.innerText = result.message;
      this.componentDidUpdate();
    } catch (error) {
      throw error;
    }
  }

  handleExitAddAsset() {
    document.getElementById('assets').style.opacity = 1;
    document.getElementById('add-asset').style.display = 'none';
  }

  handleExitAssetRequest() {
    document.getElementById('assets').style.opacity = 1;
    document.getElementById('asset-request').style.display = 'none';
  }
  async componentDidMount() {
    const token = sessionStorage.getItem('token');
    if (!token) window.location.href = 'http://localhost:3000/';
    document.getElementById('btn-home').classList.add('iriho');
    try {
      const usr = await defaultGet('/users', token);
      const ast = await defaultGet('/asset', token);
      const inservice = await defaultGet('/asset/status/inservice', token);
      const undermaintenance = await defaultGet('/asset/status/under-maintenance', token);
      // const getAcquisition = await defaultGet('/asset/acquisition', sessionStorage.getItem("token"));

      if (usr.ok) {
        const userInfos = await usr.json();
        if (userInfos.data) {
          this.setState({ users: userInfos.data });
        }
      }
      if (undermaintenance.ok) {
        const undermaintenanceAst = await undermaintenance.json();
        if (undermaintenanceAst.data) {
          this.setState({ undermaintenance: undermaintenanceAst.data });
        }
      }
      if (ast.ok && inservice.ok) {
        const resultAst = await ast.json();
        const inserviceAst = await inservice.json();
        // if (!resultAst.data || !inserviceAst) {
        //   this.setState({ assets: [] });
        // }
        if (resultAst.data && inserviceAst) {
          this.setState({ assets: resultAst.data });
          this.setState({ inservice: inserviceAst.data });
        }
      }

    } catch (error) {
      throw error;
    }
  }

  async handleRegisterAsset() {
    try {
      const newAsset = {
        serialNo: document.getElementById('txt-serial-no').value,
        name: document.getElementById('txt-name').value,
        status: document.getElementById('txt-status').value,
        category: document.getElementById('txt-category').value,
        department: document.getElementById('txt-department').value,
        location: document.getElementById('txt-building').value
      };
      const registerAsset = await consume('/asset', 'post', newAsset, sessionStorage.getItem('token'));
      const assetAdded = await registerAsset.json();
      if (registerAsset.status === 201) {
        console.log(assetAdded);
      }
      console.log('---------------------->\n ', assetAdded.errors);
    } catch (error) {
      throw error;
    }
  }
  async componentDidUpdate() {
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
                  <li id="btn-assets" onClick={this.handleAssets}>Assets</li>
                  {/* <label className="lb-colored-title">Your</label> */}
                  <li id="btn-users" onClick={this.handleUsers}>Users</li>
                  {/* <li id="btn-profile" onClick={this.handleProfile}>Profile</li> */}
                  <li id="btn-notes">Logout</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="user-panel col-md-9">
            <div id="message"></div>
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

            {/* ----------------------------------------------------- ASSET REQUEST ----------------------------------------------------- */}
            <div id="asset-request">
              <img src={img} alt=""></img>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="UPS, Monitor, Keyboard ..." />
              </div>
              <div className="form-group">
                <label>Name</label>
                <input type="text" className="form-control" placeholder="UPS, Monitor, Keyboard ..." />
              </div>
              <div className="form-group">
                <label>Quantity</label>
                <select className="form-control">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
              </div>

              <div className="form-group">
                <label>Reason</label>
                <textarea className="form-control" rows="10"></textarea>
              </div>
              <button type="submit" className="btn btn-warning" onClick={this.handleExitAssetRequest}>Cancel</button>
              <button className="btn-normal">Request</button>
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
                  <input type="text" className="form-control" id="txt-status" />
                </div>

                <div className="form-group">
                  <label>Category</label><small className="text-muted">*</small>
                  <input type="password" className="form-control" id="txt-category" />
                </div>

                <div className="form-group">
                  <label>Department</label><small className="text-muted">*</small>
                  <input type="text" className="form-control" id="txt-department" />
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
            {/* ----------------------------------------------------- MANAGE USERS----------------------------------------------------- */}
            <div id="users">
              <div id="message"></div>
              <h2>Users</h2>
              <button onClick={this.handleAddUser} className="btn-normal">Add new user</button>
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
                  {this.state.users.map(user => (
                    <tr key={user.userId}>
                      <td>{user.firstName} {user.lastName}</td>
                      <td>{user.type}</td>
                      <td>{user.department}</td>
                      <td>{user.status}</td>
                      <td>{user.phoneNo}</td>
                      <td>{user.email}</td>
                      <td>{user.gender}</td>
                      <td><button onClick={() => this.handleDisableUser(user)} className="btn btn-sm">Disable</button></td>
                      <td><button onClick={() => this.handleRemoveUser(user)} className="btn btn-sm btn-danger"><i className="fas fa-trash-alt"></i></button></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            {/* <div id="profile">
              <UserProfile />
            </div> */}

            {/* add user --------------------------------------------------------------------------------- */}
            <div id="modal-add-user">
              <img src={img} alt=""></img>
              <div className="form-group">
                <label>User ID:</label>
                <input id="txt-userid" className="form-control" type="text"></input>
              </div>
              <div>
                <label>First name:</label>
                <input id="txt-fname" className="form-control" type="text"></input>
              </div>
              <div>
                <label>Last Name:</label>
                <input id="txt-lname" className="form-control" type="text"></input>
              </div>
              <div className="form-group">
                <label>Gender:</label>
                <select id="txt-gender" className="form-control">
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="form-group">
                <label>Type:</label>
                <select id="txt-type" className="form-control">
                  <option value="normal">Normal</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department:</label>
                <select id="txt-department-2" className="form-control">
                  <option value="Network">Network</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Software">Software</option>
                </select>
              </div>
              <div className="form-group">
                <label>Phone No:</label>
                <input id="txt-phone" className="form-control" type="text"></input>
              </div>
              <div className="form-group">
                <label>E-mail:</label>
                <input id="txt-email" className="form-control" type="email"></input>
              </div>
              <div className="form-group">
                <label>Password:</label>
                <input id="txt-password" className="form-control" type="text"></input>
              </div>
              <button type="submit" className="btn btn-warning" onClick={this.handleExitAddAsset}>Cancel</button>
              <button id="btn-register-user" className="btn-normal" onClick={this.handleRegisterUser}>Register user</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Admin;
