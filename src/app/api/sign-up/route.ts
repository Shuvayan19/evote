import bcrypt from "bcryptjs";
import dbConnect from "../../../../lib/dbConnect";
import UserModel from "@/model/User";
import { sendVerificationEmail } from "@/helper/sendVerificationEmail";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const {
      userName,
      email,
      password,
    } = await request.json();
    //Checking existing username and verification
    const existingVerifiedUser = await UserModel.findOne({
      userName,
      isVerfied: true,
    });
    if (existingVerifiedUser) {
      return Response.json(
        {
          success: false,
          message: "Account with this username already exists",
        },
        { status: 400 }
      );
    }
    //Checking existing email
    const existingVerifiedEmail = await UserModel.findOne({ email });
    if (existingVerifiedEmail) {
      return Response.json(
        {
          success: false,
          message: "Account with this email already exists",
        },
        { status: 400 }
      );
    }
    //Registering with google provider
    // if (authProvider === 'google') {
    //   let username=email.split('@')[0];
    //   const existingUser=await UserModel.findOne({username});
    //   if(existingUser){
    //     username = `${userName}${Math.floor(Math.random() * 1000)}`;
    //   }
    //   const newUser = new UserModel({
    //     userName:username,
    //     email,
    //     googleId,
    //     authProvider: 'google',
    //     isVerified: true, // Google accounts are pre-verified
    //     profilePicture,
    //     roles: [false, true],
    //     isPremium: false,
    //     canVote: true,
    //     createdElection: [],
    //     votedElection: [],
    //   });
    //   await newUser.save();
    //   return Response.json(
    //     {
    //       success: true,
    //       message: "Google account registered successfully",
    //     },
    //     { status: 201 }
    //   );
    // }
    //create a new user with hashing the password give new verification code
    else {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const hashedPassword = await bcrypt.hash(password, 10);
      const codeExpiry = new Date();
      codeExpiry.setHours(codeExpiry.getHours() + 1);
      const newUser = new UserModel({
        userName: userName,
        email: email,
        password: hashedPassword,
        authProvider:"credentials",
        verifyCode: otp,
        verifyCodeExpiry: codeExpiry,
        isVerified: false,
        roles: [false, true],
        isPremium: false,
        canVote: true,
        createdElection: [],
        votedElection: [],
      });
      //Saved the user in the Database
      await newUser.save();
      //generating the email with the given new user's details
      const emailResponse = sendVerificationEmail(userName, otp, email);
      if (!(await emailResponse).success) {
        return Response.json(
          { redirect:false,
            success: false,
            message: (await emailResponse).message,
          },
          { status: 500 }
        );
      } else {
        return Response.json(
          { redirect:true,
            success: true,
            message: "Otp sent to email.Please verify to continue",
          },
          { status: 201 }
        );
      }
    }
  } catch (error) {
    console.log("Failed Registering the user", error);
    return Response.json(
      {
        success: false,
        message: "Error Registering User",
      },
      { status: 500 }
    );
  }
}
