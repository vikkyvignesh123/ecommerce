const express = require('express');
const authrouter = express.Router();
const authcontroller = require('../contoller/authendicateController');


authrouter.post('/register', authcontroller.register);

authrouter.post('/login', authcontroller.login);


module.exports=authrouter;