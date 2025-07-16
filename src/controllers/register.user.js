// we will request user to fill name,password,email,username,avatar
// check all feilds are empty or not
// check if user already exsists
// uplaod avatar

const ApiErrors = require("../../utils/ApiErrors");
const uploadOnCloudinary = require("../../utils/cloudinary");
const UserModel = require("../models/user.model");

// Function to generate refresh token
const generateRefreshToken = async (userId) => {
  try {
    const refreshToken = jwt.sign(
      { userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "10d" }
    );
    return refreshToken;
  } catch (error) {
    throw new ApiErrors(500, "Error generating refresh token");
  }
};

const RegisterUser = async (req, res) => {
  const { name, username, email, password } = req.body;
  if ([name, email, username, password].some((fields) => fields == "")) {
    throw new ApiErrors(400, "Please fill required fields");
  } else {
    const userexsist = await UserModel.findOne({ email });
    if (userexsist) {
      throw new ApiErrors(400, "User Allready Exsits");
    } else {
      const avatarfilepath = req.files?.avatar?.[0]?.path;
      if (!avatarfilepath) {
        throw new ApiErrors(400, "Avatar Local file not Uploaded");
      } else {
        const CheckUploadOnCloudniary = await uploadOnCloudinary(
          avatarfilepath
        );
        if (!CheckUploadOnCloudniary) {
          throw new ApiErrors(400, "Avatar Cloudinary file not Uploaded");
        } else {
          const avatarurl = CheckUploadOnCloudniary.url;
          const Usercreated = await UserModel.create({
            name,
            email,
            password,
            username: username.toLowerCase(),
            avatar: avatarurl
          });

          const originaluser = await UserModel.findById(Usercreated._id).select(
            "-password -refershtoken"
          );

          res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: originaluser,
          });
        }
      }
    }
  }
};
module.exports = RegisterUser;
