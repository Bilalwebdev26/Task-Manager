import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["member", "admin"],
      default: "member",
      required: true,
    },
  },
  { timestamps: true }
);

// 🔹 Pre-save hook → password ko hash karo
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next(); // agar password change nahi hua to skip
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 🔹 Method → password compare karo
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// 🔹 Method → JWT token generate karo
userSchema.methods.generateJWT = function () {
  return jwt.sign(
    { id: this._id }, // payload
    process.env.JWT_SECRET, // secret key (env me rakho)
    { expiresIn: "7d" } // expiry
  );
};

export const User = mongoose.model("User", userSchema);

