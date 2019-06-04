import React, { Component } from 'react';
import { Table } from 'reactstrap';

class AssetComponent extends Component {
    render() { 
        return (  
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
                  <th><button className="btn btn-sm"><i className="fas fa-pen"></i></button></th>
                  <th><button className="btn btn-sm btn-danger"><i className="fas fa-trash-alt"></i></button></th>
                </tr>
              </tbody>
            </Table>
            <button onClick={this.handleAddAsset} className="btn-normal">New asset</button>
            <button className="btn-normal">Request asset</button>
          </div>
        );
    }
}
 
export default AssetComponent;