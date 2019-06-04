import React from 'react';
import UserSideBar from './components/menu/UserSideBar';
import Panel from './components/Panels';

function App() {
  return (
    <div>
      <div className="row">
      <div className="navbar col-md-3">
          <UserSideBar />
      </div>      
      <div className="col-md-9">
          <Panel></Panel>
      </div>
    </div>
    </div>
  );
}

export default App;
