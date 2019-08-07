import React, { Component } from 'react';
import ReactToPrint from 'react-to-print';
import Manager from '../Manager';
import img from '../img/rmh-logo.jpeg';

class Example extends React.Component {
    render(){
        return(
            <div id = "view-acquisition-model" >
                <img src={img} alt=""></img>
                <div className="form-group">
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure voluptatibus ab eum quisquam asperiores impedit officia accusantium saepe, officiis debitis, hic consequatur. Numquam, debitis expedita dolorum culpa quidem totam sint?
                        {/* {console.log(this.props)}; */}
                        {/* Mr/Mrs, <input type="text" disabled value={this.state.requesty.requestedBy} /> has requested an asset <input type="text" disabled value={this.props.assetName} /> <br /> */}
                        {/* with a description of <input type="text" disabled value={this.props.description} /> reason being <input type="text" disabled value="replacement of the other broken mouse" /> */}
                    </p>
                </div>
                <div >
                    {/* <button type="submit" className="btn btn-warning" onClick={this.props.handleExitAssetRequest}>Deject</button> */}
                    {/* <button className="btn-normal" onClick={this.handleAcquireAsset}>Approve</button> */}
                </div>
          </div>
        );
    }
}
class Example2 extends React.Component {
    render() {
        return (
            <div>
                <ReactToPrint
                    trigger={() => <a href="#">Print this out!</a>}
                    content={() => this.componentRef}
                />
                <Example ref={el => (this.componentRef = el)} />
            </div>
        );
    }
}

export default Example2;