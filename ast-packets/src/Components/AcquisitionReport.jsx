import React, { Component } from 'react';
import Approve from '../img/svg/approve.svg';
import Deny from '../img/svg/deny.svg';
import logoBrand from '../img/rmh-img.png';
import html2pdf from 'html2pdf.js';
import moment from 'moment'
;
class AcquisitionReport extends Component {

    handlePrint() {
        // var element = document.getElementById('view-acquisition-model');
        // html2pdf(element);
        // document.getElementById('hide-in-report').style.display = 'block';
        // document.getElementById('hide-in-report-2').style.display = 'block';
        // document.getElementById('hide-in-report-2').classList.add('hide-it');
        var element = document.getElementById('print-req-report');
        var opt = {
          margin: 0,
          filename: 'myfile.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 4 },
          jsPDF: { unit: 'in', orientation: 'portrait' }
        };
    
        // New Promise-based usage:
        html2pdf().set(opt).from(element).save();
    
        // Old monolithic-style usage:
        html2pdf(element, opt);
      }

    render() {
        return (
            <div id="acquisition-report" className="acquisition-details">
                <div id="print-req-report">
                    <img className="img-logo" src={logoBrand} alt='logo' width="650px" />
                    <h2>ASSET ACQUISITION FORM</h2>
                    <div className="form-group-report format">
                            <h4>Date:</h4><span><p>{moment(this.props.acquisitionInfo.createdAt).format('DD-MM-YYYY')}</p></span><br />
                            <h4>Completed by:</h4><span><p>{this.props.acquisitionInfo.requestedBy}</p></span><br />
                        <div className="form-group-report">
                            <h2>Asset details</h2>
                            <h4>Asset name:</h4><span><p>{this.props.acquisitionInfo.assetName}</p></span><br />
                            <h4>Description:</h4><span><p>{this.props.acquisitionInfo.description}</p></span><br />
                            <h4>Reason:</h4><div><textarea cols="75" rows="10" value={this.props.acquisitionInfo.reason} disabled></textarea></div>
                            <br />
                        </div>
                    </div>
        
                    <div id="stamp-approve">
                        <img src={Approve} alt="Ooops" />
                    </div>
                    <div id="stamp-deny">
                        <img src={Deny} alt="Ooops" />
                    </div>
                </div>
                <button className="btn-print" onClick={this.handlePrint}>Export as pdf</button>
            </div>
        );
    }
};

export default AcquisitionReport;