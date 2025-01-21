import bcrypt from "bcryptjs";
import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import UserModel from "./model/User";
import { NextResponse } from "next/server";
import email from "next-auth/providers/email";

import dbConnect from "../lib/dbConnect";
import Google from "next-auth/providers/google";


export class LoginError extends CredentialsSignin {
  code = "custom";
  constructor(message?: any, errorOptions?: any) {
    super(message, errorOptions);
    this.message = message;
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session:{
    strategy:'jwt'
  },
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
     async authorize (credentials):Promise<any>{
        if (credentials === null) return null;

        await dbConnect();
        // Fetch user from the database
        const user = await UserModel.findOne({
          email: credentials?.email,
          isVerified: true,
        });
        if (!user) {
          throw new LoginError("no such user")
        }
        const isMatched = await bcrypt.compare(
          credentials.password as string,
          user.password
        );
        if (!isMatched) {
          throw new LoginError("password is wrong")
        }
        const userData = {
          email: user.email,
          id: user._id,
        };
        return userData;
      },
    }),

    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut:"/auth/signin"
  },
  
  // callbacks: {
  //   async session({session}){
  //     return session;
  //   },
  //   async signIn({ profile }) {
  //     try {
  //       console.log()
  //       await dbConnect();
  //       const existingUser=UserModel.findOne({email:profile?.email})
  //       if(!existingUser){
  //         const newUser = new UserModel({
  //           userName:profile?.family_name,
  //           email:profile?.email,
  //           googleId:profile?.id,
  //           authProvider: 'google',
  //           isVerified: true, // Google accounts are pre-verified
  //           profilePicture:profile?.picture,
  //           roles: [false, true],
  //           isPremium: false,
  //           canVote: true,
  //           createdElection: [],
  //           votedElection: [],
  //         });
  //         await newUser.save();
  //       }
  //       return true;
  //     } catch (error) {
  //       console.log(error);
  //       return false;
  //     }
  //   }
  // }

  });
