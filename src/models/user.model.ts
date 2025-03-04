import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide a email"],
    unique: true,
  },
  username: { type: String, required: [true, "Please provide a username"] },
  password: { type: String, required: [true, "Please provide a password"] },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  forgotPasswordToken: String,
  forgorPasswordTokenExpiry: Date,
  verifyToken: String,
  verifyTokenExpiry: Date,
});

const Users = mongoose.models.users || mongoose.model("users", userSchema);

export default Users;
