import mongoose, { Schema, Document } from "mongoose";

interface Roles {
  admin: boolean;
  voter: boolean;
}
export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  verifyCode: number;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  roles: Roles;
  isPremium: boolean;
  canVote: boolean;
  createdElection: string[];
  votedElection: string[];
}

const userSchema = new Schema<User>({
  userName: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/.+\@.+\..+/, "Enter valid email address"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  verifyCode: {
    type: Number,
    required: [true, "verifyCode is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verifyCode expiry is required"],
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  roles: {
    admin: {
      type: Boolean,
      Default: false,
    },
    voter: {
      type: Boolean,
      Default: true,
    },
  },
  isPremium: {
    type: Boolean,
    Default: false,
  },
  canVote: {
    type: Boolean,
    Default: true,
  },
  createdElection: {
    type: [String],
  },
  votedElection: {
    type: [String],
  },
});

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
