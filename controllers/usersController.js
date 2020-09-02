//Imports
var jwtUtils = require('../jwt.utils');
var bcrypt = require('bcrypt');
var user = require('../models/usersModel');
const expSession = require('express-session');
var session;

//Constants
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*\d).{4,20}$/;

//Routes
module.exports = {
    register: (req, res) => {
        var errors = false; 
        res.render('admin/users/register', {currentPage: 'register', errors: errors});
    },
    registerSave: function(req,res) {
        //Params
        var { email, name, password, confirm} = req.body;
        var message;
        var error = false;

        if(email == '' || name == '' || password == '') {
            //res.render('admin/users/register', {currentPage: 'register', errors: true, message: 'Veuillez remplir les champs!'});
            error = true;
            message = "Veuillez remplir les champs!";
        }

        if(name.length >= 13 || name.length <= 4) {
            //res.render('admin/users/register', {currentPage: 'register', errors: true, message: 'Le nom devrait être compris entre 4 - 12 caractères'});
            error = true;
            message = 'Le nom devrait être compris entre 4 - 12 caractères';
        }

        if(!EMAIL_REGEX.test(email)) {
            //res.render('admin/users/register', {currentPage: 'register', errors: true, message: 'Adresse email invalide!'});
            error = true;
            message = 'Adresse email invalide!';
        }

        if(!PASSWORD_REGEX.test(password)) {
            //res.render('admin/users/register', {currentPage: 'register', errors: true, message: 'Le mot de passe devrait être compris entre 4 - 20 caractères et doit contenir un chiffre'});
            error = true;
            message = 'Le mot de passe devrait être compris entre 4 - 20 caractères et doit contenir un chiffre';
        }

        if(password !== confirm) {
            //res.render('admin/users/register', {currentPage: 'register', errors: true, message: 'Veuiller Reconfirmer votre mot de passe!'});
            error = true;
            message = 'Veuiller Reconfirmer votre mot de passe!';
        }

        if(error) {
            res.render('admin/users/register', {currentPage: 'register', errors: true, message: 'Veuiller Reconfirmer votre mot de passe!'});
        }
        else {
            user.getByEmail(email, (result) => {
                if(result) {
                    res.render('admin/users/register', {currentPage: 'register', errors: true, message: 'L\'email existe déjà, Veuillez choisir une autre adresse'});
                }
                else {
                    var newUser = req.body;
                    bcrypt.hash(newUser.password, 10, (err, hash) => {
                        newUser.password = hash;
                        user.add(newUser, () => {
                            res.redirect('/login');
                        });
                    });
                }
            });
        }
    },
    login: (req, res, next) => {
        res.render('admin/users/login', {errors: false, currentPage: 'login'});
    },
    loginCheck: (req,res, errors) => {
        //Params
        var {email,password} = req.body;
        session = req.session;
        
        if(email === '' || password === '') {
            res.render('admin/users/login', {currentPage:'login', errors:true, message: 'Veuillez remplir les champs!'});
        }

        user.getByEmail(email, (userFound) => {
            if(userFound) {
                bcrypt.compare(password , userFound.password, function(err, result) {
                    if(result) {
                      session.userId = userFound.id;
                      res.redirect('/admin/posts');
                    } else {
                      res.render('admin/users/login', {errors: true, currentPage: 'login', message: 'Login ou Mot de passe incorrect'});
                    } 
                });
            }
            else {
                res.render('admin/users/login', {errors: true, currentPage: 'login', message: 'Utilisateur introuvable'});
            }
        });
    },
    getUserProfile: function(req, res) {
        
    },
    updateUserProfile: function(req, res) {
        
    }
}