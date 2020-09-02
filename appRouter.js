//Imports
var express = require('express');
var packagesController = require('./controllers/packagesController');
var usersController = require('./controllers/usersController');

//Router
exports.router = (function(){
    var appRouter = express.Router();

    //Users Routes
    appRouter.route('/register').get(usersController.register);
    appRouter.route('/register').post(usersController.registerSave);
    appRouter.route('/login').get(usersController.login);
    appRouter.route('/login').post(usersController.loginCheck);
    appRouter.route('/user').get(usersController.getUserProfile);
    appRouter.route('/user').put(usersController.updateUserProfile);

    //Posts Routes
    appRouter.route('/packages/').get(packagesController.getPackages);
    appRouter.route('/package/new').get(packagesController.newPackage);
    appRouter.route('/package/new').post(packagesController.addPackage);
    appRouter.route('/package/:id').get(packagesController.editPackage);
    appRouter.route('/package/:id').post(packagesController.updatePackage);
    appRouter.route('/package/:id/delete').post(packagesController.deletePackage);

    return appRouter;
})();