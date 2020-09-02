var package = require('../models/packagesModel');
var jwtUtils = require('../jwt.utils');
var moment = require('moment');

//Constants
const TITLE_LIMIT = 2;
const CONTENT_LIMIT = 4;

//Routes
module.exports = {
    getPackages: (req, res) => {
        if(req.session.userId > 0 && req.session.userId != 'undefined') {
            const rows = package.getAll((data) => {
                res.render('/packages/index', { posts : data, moment: moment, currentPage: 'package' });
            });
        }
        else {
            res.redirect('/login');
        }
    },
    newPackage: (req, res) => {
            res.render('packages/form', {package : null, moment: moment, currentPage: 'package_form'});
    },
    addPackage: function(req, res) {
        package.add(req.body);
        res.redirect('/packages');
    },
    editPackage: (req, res) => {
        var id = req.params.id;
        const row = package.getById(id,(data) => {
            res.render('packages/form', {package : data, moment: moment, currentPage: 'package_form'});
        });
    },
    updatePackage: (req, res) => {
        var id = req.params.id;
        package.edit(id,req.body);
        res.redirect('/packages');
    },
    deletePackage: (req, res) => {
        var id = req.params.id;
        const row = package.remove(id);
        res.redirect('/packages');     
    }
}