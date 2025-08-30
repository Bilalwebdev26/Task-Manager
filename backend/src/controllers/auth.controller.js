import { User } from "../models/user.js";

const generateToken = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    return res
      .status(400)
      .jaon({ message: "User not found while generating token." });
  }
  const token = user.generateJWT();
  return token;
};
export const registerUser = async (req, res) => {
  const { name, email, password, profilePic, invitecode } = req.body;
  try {
    const checkmail = await User.findOne({ email });
    //check email exist or not
    if (checkmail) {
      return res
        .status(409)
        .json({ message: "Email already Exist", type: "email" });
    }
    //pass
    //->check role -> admin/member
    let role = "member";
    if (invitecode && invitecode === process.env.ADMIN_INVITE_CODE) {
      role = "admin";
    }
    //createUser
    const user = await User.create({
      name,
      email,
      password,
      profilePic,
      role,
    });
    //generate token & set cookies
    const token = await generateToken(user._id);
    //set in cookies
    res.cookie("token", token, {
      httpOnly: true, // JS se access nahi hogi (secure)
      secure: process.env.NODE_ENV === "production", // sirf https me
      sameSite: "strict", // CSRF attack se bachaata hai
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });
    //jwt->cookieset kerna
  } catch (error) {
    console.log("Error in register : ",error)
     return res
        .status(500)
        .json({ message: "Error while register user", type: "catcherror" });
  }
};
export const loginUser = async (req, res) => {};
export const userProfile = async (req, res) => {};
export const updateProfile = async (req, res) => {};
