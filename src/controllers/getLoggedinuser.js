const ApiErrors = require("../../utils/ApiErrors");
const ApiResponse = require("../../utils/ApiResponse");
const UserModel = require("../models/user.model")

// find by and return whole user doc with out password and refershToekn
const GetLoggedInUser =async (req,res)=>
{
  const user = await UserModel.findById(req.user._id).select("-password -refershtoken");
    if(!user){
        throw new ApiErrors(400,"User not Found")
    }
    else{
        return res.status(200).json(
            new ApiResponse(200, "User Information", { data: user })
            
        )
    }
}
module.exports=GetLoggedInUser