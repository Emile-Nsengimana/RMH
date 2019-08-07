import model from '../db/models/index';

const { Acquisition, User } = model;

class acquireAsset {
    // acquire asset
    static async requestAsset(req, res) {
        try {
            const manager = await User.findOne( { where: { type: 'manager'}});
            const { assetName, description, reason } = req.body;
            const newAcquisition = {
                assetName, description, reason, requestedBy: req.user.email, acquiredTo: manager.dataValues.email
            };
            const saveAcquition = await Acquisition.create(newAcquisition);
            if (saveAcquition) {
                return res.status(201).json({
                    message: "acquisition sent",
                });
            }
            return res.status(400).json({
                error: "please you need to fill all required information",
            });
        } catch (error) {
            return res.status(500).json({
                error: "server error"
            });
        }
    }

    // read acquisition
    // static async openAcquisition(req, res) {
    //     try {
    //         const getOne = await con.query(acquisitionData.searchAcquisition, [req.params.reqno]);
    //         if (getOne.rowCount !== 0) {
    //             await con.query(acquisitionData.updateAcquisitionStatus, ['read', req.params.reqno]);

    //             return res.status(200).json({
    //                 data: getOne
    //             });
    //         }
    //         return res.status(404).json({
    //             message: 'request not found'
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             error: 'server error please try again'
    //         });
    //     }
    // }

    // // respond acquisition
    // static async respondeAcquisition(req, res) {
    //     try {
    //         const getOne = await con.query(acquisitionData.searchAcquisition, [req.params.reqno]);
    //         if (getOne.rowCount !== 0) {
    //             await con.query(acquisitionData.updateAcquisitionDecision, [req.body.decision, req.body.reason, req.params.reqno]);
    //             return res.status(200).json({
    //                 data: getOne
    //             });
    //         }
    //         return res.status(404).json({
    //             message: 'acquisition not found'
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             error: 'server error please try again'
    //         });
    //     }
    // }

    // // delete acquisition
    // static async deleteAcquisition(req, res) {

    // }

    // // get all acquisitions
    static async getAllAcquisitions(req, res) {
        try {
            const acquistions = await Acquisition.findAll();
            if(acquistions){
                return res.status(200).json({
                    data: acquistions
                });
            }
        } catch (error) {
            
        }
    }

    // // get all rejected acquisition
    // static async rejectedAcquisition(req, res) {

    // }

    // // get all accepted acquisition
    // static async acceptedAcquisition(req, res) {

    // }

}

export default acquireAsset;
