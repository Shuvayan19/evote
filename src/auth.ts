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
        return {
          email: user.email,
          id: user._id,
          name:user.userName,
        }
       
      }
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
  
  callbacks: {

    async jwt({token,user}){
      if(user){
        token.id=user.id;
        token.email=user.email;
        token.name=user.name||"USER";
        token.picture=user.image||"";

      }
      return token
    },
    async session({session,token}){
      if(session){
        session.user.id=token.id as string;
        session.user.email=token.email as string;
        session.user.name=token.name as string;
      }
      return session;
    },
    async signIn(params) {
      
       if(!params.user.email){
        return false;
       }
        try {
          await dbConnect();
          const user=await UserModel.findOne({email:params.user.email})
          if (!user) {
            // Create a new user if they don't exist
            await UserModel.create({
              userName: params.user.name,
              email: params.user.email,
              googleId: params.profile?.sub,
              authProvider: 'google',
              isVerified: true, // Google accounts are pre-verified
              profilePic: params.user.image,
              roles: {
                admin: false,
                voter: true,
              },
              isPremium: false,
              canVote: true,
              createdElection: [],
              votedElection: [],
            });
            console.log("user created succesfully");
          }
  
        } catch (error) {
          console.log("error while signing in")
        }
        return true;
    },


  //   async signIn({ profile }) {
  //     try {
  //       console.log('Profile:', profile);
  //       await dbConnect();
  //       console.log('UserModel:', UserModel);
  //       const existingUser=await UserModel.findOne({email:profile?.email})
  //       if(!existingUser){
  //         const newUser = new UserModel({
  //           userName:profile?.given_name,
  //           email:profile?.email,
  //           googleId:profile?.id,
  //           authProvider: 'google',
  //           isVerified: true, // Google accounts are pre-verified
  //           profilePic: profile?.picture,
  //           roles: {
  //             admin: false,
  //             voter: true
  //           },
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
  }

  });
