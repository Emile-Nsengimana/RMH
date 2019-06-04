import React, { Component } from 'react';

class DefaultNavItem extends Component {
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
      <React.Fragment>
        <ul>
          <li id="btn-home" onClick={this.handleHome}>Home</li>
          <li id="btn-assets" onClick={this.handleAssets}>Assets</li>
        </ul>
      </React.Fragment>
    );
  }
}

export default DefaultNavItem;