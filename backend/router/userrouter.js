const express = require('express');
const userRouter = express.Router();
const userController = require('../contoller/usercontroller');

userRouter.get('/getAllUsers',userController.getAllUsers);
userRouter.get('/getUserById/:id',userController.getUserById);
userRouter.put('/updateUser/:userid/:username',userController.updateUser);
userRouter.delete('/deleteUser/:id',userController.deleteUser);





module.exports=userRouter