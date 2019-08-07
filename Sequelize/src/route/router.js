import express from 'express';
import userController from '../controllers/user';
import assetController from '../controllers/asset';
import validation from '../middlewares/validations';
import auth from '../middlewares/auth';
import assetAcquisition from '../controllers/acquisition';

const route = express.Router();

// user routes
route.post('/auth/signup/', validation.validateUserInfo, validation.checkPassword, userController.registerUser);
route.post('/auth/signin/', validation.checkSign, userController.login);
// route.put('/user/disable/:userId', auth, userController.disableUser);
// route.patch('/user/password/:email', auth, validation.checkPassword, userController.resetPassword);
// route.delete('/user/:userId', auth, userController.removeUser);
route.get('/users', auth.checkAuthentication, userController.getAllUsers);
// route.get('/user/:userId', auth, userController.searchUser);

// asset routes
route.get('/asset/summary/:category', assetController.assetSummary);
route.get('/asset/summary', assetController.assetSummaryForAll);
route.get('/summary/all', assetController.overAllSummary);
route.post('/asset', auth.checkAuthentication, validation.checkAssetData, assetController.registerAsset);
route.get('/asset', auth.checkAuthentication, assetController.getAllAssets);
// route.get('/asset/:serialNo', auth, assetController.getOneAsset);
route.get('/asset/status/:status', auth.checkAuthentication, assetController.assetStatus);
route.delete('/asset/:serialNo', auth.checkAuthentication, assetController.disposeAsset);

// asset acquisition
route.post('/asset/acquisition', auth.checkAuthentication, assetAcquisition.requestAsset);
route.get('/acquisitions', auth.checkAuthentication, assetAcquisition.getAllAcquisitions);


export default route;
