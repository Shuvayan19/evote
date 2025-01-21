import GoogleSignIn from "@/component/googleSignin";
import SignUpForm from "@/component/SignUpForm";
import Link from "next/link";

const page = () => {
  return (
    <div className="flex flex-col mt-40 justify-center items-center">
      <div className="text-3xl font-bold text-teal-500">Sign Up form</div>
      <SignUpForm />
      <GoogleSignIn/>
      <span className="flex flex-row gap-1">
        <p>Already have an account?</p>
        <Link href="/auth/signin" className="font-bold underline decoration-solid">
          Login
        </Link>
      </span>
    </div>
  );
};

export default page;
