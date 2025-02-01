
import { SignInForm } from "@/component/SignInForm";
import Link from "next/link";
import React from "react";
import GoogleSignin from "@/component/googleSignin"

const page = () => {
  return (
    <div className="flex flex-col mt-40 justify-center items-center">
      <div className="text-3xl font-bold text-teal-500">Sign In form</div>
      <SignInForm />
      <GoogleSignin/>
      <span className="flex flex-row gap-1">
        <p>Don't have an account?</p>
        <Link href="/auth/signup" className="font-bold underline decoration-solid">
          Register
        </Link>
      </span>
    </div>
  );
};

export default page;
