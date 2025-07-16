// check if user is logges in or not ? by applying middleware verifyjwt
// take a avatar file -----> use multer to upload in public use local path
// by local path upload it on cloudinar 
// hae url from cloudinary
// find user by req.user -----> jwt
// then update Database 

const ApiErrors = require("../../utils/ApiErrors");
const ApiResponse = require("../../utils/ApiResponse");
const uploadOnCloudinary = require("../../utils/cloudinary");
const UserModel = require("../models/user.model");

const UpdateAvatar = async (req, res) => {
  const avatarFilePath = req.files?.avatar?.[0]?.path;

  if (!avatarFilePath) {
    throw new ApiErrors(400, "Local file not uploaded");
  }

  const uploadoncloud = await uploadOnCloudinary(avatarFilePath);

  if (!uploadoncloud || !uploadoncloud.url) {
    throw new ApiErrors(400, "Cloudinary upload failed");
  }

  const user = await UserModel.findByIdAndUpdate(
    req.user._id,
    { avatar: uploadoncloud.url },
    { new: true } 
  );

  return res.status(200).json(
    new ApiResponse(200, "Avatar updated successfully", user)
  );
};

module.exports = UpdateAvatar;
