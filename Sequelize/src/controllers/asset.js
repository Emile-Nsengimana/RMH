import model from '../db/models/index';

const { Asset } = model;
class AssetController {
    // add a new asset ---------------------------------------------------------------------------
    static async registerAsset(req, res) {
        try {
            const { serialNo, name, status, category, department, building } = req.body;
            const newAsset = {
                serialNo, name, status, category, department, building, addedBy: req.user.email
            };
            const addAsset = await Asset.create(newAsset);
            if (addAsset) {
                return res.status(201).json({
                    message: "asset added",
                });
            }
            return res.status(400).json({
                error: "asset not added! check asset information",
            });
        } catch (error) {
            return res.status(409).json({
                error: error.errors[0].message
            });
        }
    }
    // display all asset -------------------------------------------------------------------------
    static async getAllAssets(req, res) {
        try {
            const assets = await Asset.findAll();
            if (!assets.length) {
                return res.status(404).json({
                    error: "no asset found",
                });
            }
            return res.status(200).json({
                data: assets,
            });
            
        } catch (error) {
            return res.status(500).json({
                error: "server error",
            });
        }
    }

    // // search for a specific asset ---------------------------------------------------------------
    // static async getOneAsset(req, res) {
    //     try {
    //         const asset = await con.query(assetData.searchAsset, [req.params.serialNo]);
    //         if (asset.rowCount !== 0) {
    //             const addedBy = await con.query(userData.searchUserById, [asset.rows[0].addedby]);
    //             return res.status(200).json({
    //                 data: {
    //                     serialNo: asset.rows[0].serialno,
    //                     name: asset.rows[0].name,
    //                     serviceDate: asset.rows[0].servicedate,
    //                     status: asset.rows[0].status,
    //                     category: asset.rows[0].category,
    //                     department: asset.rows[0].department,
    //                     location: asset.rows[0].location,
    //                     addedby: addedBy.rows[0].firstname + ' ' + addedBy.rows[0].lastname,
    //                 }
    //             });
    //         }
    //         return res.status(404).json({
    //             error: `asset with serial no: ${req.params.serialNo} not found`,
    //         });
    //     } catch (error) {
    //         return res.status(500).json({
    //             error: "server error",
    //         });
    //     }
    // }

    // // get assets by status ---------------------------------------------------------------------------
    static async assetStatus(req, res) {
        try {
            const assetByStatus = await Asset.findAll( { where: { status: req.params.status }});
            if (!assetByStatus.length) {
                return res.status(404).json({
                    error: `no asset is ${req.params.status} for now`,
                });
            }
            return res.status(200).json({
                data: assetByStatus,
            });
            
        } catch (error) {
            return res.status(500).json({
                error: "server error",
            });
        }
    }
    // // delete an asset -------------------------------------------------------------------------------
    static async disposeAsset(req, res) {
        try {
            const removedAsset = await Asset.destroy({ where: { serialNo: req.params.serialNo}})
            if (removedAsset.rowCount !== 0) {
                return res.status(200).json({
                    message: 'asset removed',
                });
            }
            return res.status(404).json({
                error: `asset with serial no: ${req.params.serialNo} not found`,
            });
        } catch (error) {
            return res.status(500).json({
                error: "server error",
            });
        }
    }
    
    // // number of asset summary -------------------------------------------------------------------
    static async assetSummary(req, res) {
        try {
            const undeMaintenance = await Asset.findAll({ where: { category: req.params.category, status: 'under-maintenance'}});
            const inService = await Asset.findAll({ where: { category: req.params.category, status: 'inservice'}});
            // const disposed = await con.query(assetData.countThem, ['active']);

            return res.status(200).json({
                undermaintenance: undeMaintenance.length,
                inservice: inService.length
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: "server error",
            });
        }
    }

     // // number of asset summary for all -------------------------------------------------------------------
     static async assetSummaryForAll(req, res) {
        try {
            const undeMaintenance = await Asset.findAll({ where: { status: 'under-maintenance'}});
            const inService = await Asset.findAll({ where: { status: 'inservice'}});
            // const disposed = await con.query(assetData.countThem, ['active']);

            return res.status(200).json({
                undermaintenance: undeMaintenance.length,
                inservice: inService.length
            });
        } catch (error) {
            return res.status(500).json({
                status: 500,
                error: "server error",
            });
        }
    }

    //overall summary of assets
    static async overAllSummary(req, res) {
        try {
            const workstations = await Asset.findAll({ where: { category: "workstation"}});
            const printer = await Asset.findAll({ where: { category: 'printer'}});
            const scanner = await Asset.findAll({ where: { category: 'scanner'}});
            const ups = await Asset.findAll({ where: { category: 'ups'}});
            const others = await Asset.findAll();
            const sumOthers = others.length - (workstations.length + printer.length + scanner.length + ups.length);

            return res.status(200).json({
                workstations: workstations.length,
                printer: printer.length,
                scanner: scanner.length,
                ups: ups.length,
                others: sumOthers
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                status: 500,
                error: "server error",
            });
        }
    }
}

export default AssetController;