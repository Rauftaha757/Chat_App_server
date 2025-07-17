// change password
// middle ware verify jwt
// get id by req.user._id
// find user 
// take password ---------> and update

const ApiErrors = require("../../utils/ApiErrors");
const ApiResponse = require("../../utils/ApiResponse");
const UserModel = require("../models/user.model");

const changepassword = async (req,res)=>{
    const {oldpass,newpass}=req.body;
    const user=await UserModel.findById(req.user._id);
    const checkoldpass=await user.isPasswordCorrect(oldpass);
    if(!checkoldpass){
        throw new ApiErrors(400,"Old Password is not Correct")
    }
    else{
        user.password=newpass;
      await  user.save();
        return res.status(200).json(
            new ApiResponse(201,"Password Updated Successfully")
        )
    }
}
module.exports=changepassword;