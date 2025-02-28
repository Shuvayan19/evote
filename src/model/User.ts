import mongoose, { Schema, Document,models } from "mongoose";

interface Roles {
  admin: boolean;
  voter: boolean;
}
export interface User extends Document {
  userName: string;
  email: string;
  password: string;
  googleId?: string;
  authProvider: string;
  verifyCode: string | null;
  verifyCodeExpiry: Date | null;
  isVerified: boolean;
  roles: Roles;
  isPremium: boolean;
  canVote: boolean;
  createdElection: number;
  votedElection: number;
  profilePic: string;
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
  },
  googleId: {
    type: String,
  },
  authProvider: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
  },
  verifyCode: {
    type: String,
    required: false,
  },
  verifyCodeExpiry: {
    type: Date,
    required: false,
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
    type:Number,
  },
  votedElection: {
    type: Number,
  },
});

const UserModel =
  (mongoose.models.User ) ||
  mongoose.model<User>("User", userSchema);

export default UserModel;
