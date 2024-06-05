import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

// regExp for email validation
// const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "UserName is required."],
      minLength: [3, "Name must be larger than 2 characters."],
      maxLength: [49, "Name must be shorten than 50 characters."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: [true, "Email must be unique"],
      // match: [emailRegex, "Invalid email format."], // Added custom error message for email validation
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [5, "Password must be longer than 5 characters."],
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.post("validate", (user) => {
  const notHashedPassword = user.password;
  const salt = bcrypt.genSaltSync(18);
  const hashedPassword = bcrypt.hashSync(notHashedPassword, salt);
  user.password = hashedPassword;
});

export const userModel =
  mongoose.models?.User || mongoose.model("User", UserSchema);
// https://www.youtube.com/watch?v=nGoSP3MBV2E&t=11523s
