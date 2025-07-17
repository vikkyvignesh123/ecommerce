const user = require('../model/user');
const User = require('../model/user');

const bcrypt = require('bcryptjs');

const getAllUsers = async (req,res)=>{
    try{
       const userData = await User.find();
       res.json({
        success: true,
        status:200,
        message:"successfully data received",
        data:userData
       })
    }
    catch(err)
    {
        console.log(err);
    }
}

const getUserById = async (req,res)=>{
    try{
        const id = req.params.id
        const getId= await User.findById(id)
        res.json({
            success:true,
            status:200,
            message:"successfully received user ID",
            data:getId
        })
    }
    catch(err)
    {
        console.log("cannot find userId",err);
    }
}

const updateUser = async (req, res) => {
  try {
    const { userid, username } = req.params;

    const updatedUser = await User.findByIdAndUpdate(
      userid,
      { $set: { username } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      status: 200,
      message: "Data Updated Successfully",
      data: updatedUser,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

const deleteUser = async (req,res)=>{
    try{
        const deleteUserDetails = req.params.id
        const deleteData = await User.findByIdAndDelete(deleteUserDetails);
        res.json({
            success:true,
            status:200,
            message:"Successfulle Delete User",
            data:deleteData

        })
    }
    catch(err)
    {
        res.json({
            success:false,
            status:404,
            message:"cannot find user"

        })
    }
}


module.exports={
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}