"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "@/auth";
import GoogleSignIn from "./googleSignin";


const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  // async function handleGoogleSignIn() {
  //   try {
  //     const result = await signIn("google", {
  //       callbackUrl: "/dashboard",
  //       redirect: false,
  //     });

  //     if (result?.error) {
  //       setError(result.error);
  //     } else if (result?.url) {
  //       router.push(result.url);
  //     }
  //   } catch (err) {
  //     console.error("Error during Google sign-in:", err);
  //     setError("Something went wrong with Google sign-in.");
  //   }
  // }
  // async function handleGoogleSignIn() {
  //   try {
  //     const result = await signIn("google", {
  //       redirect: false,
  //     });

  //     if (result?.error) {
  //       console.error("Google sign-in error:", result.error);
  //       return;
  //     }

  //     // Fetch the user's Google profile
  //     const { email, id: googleId, image: profilePicture } = result?.user || {};

  //     // Send Google profile details to your backend
  //     const response = await fetch("/api/sign-up", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         email,
  //         googleId,
  //         profilePicture,
  //         authProvider: "google",
  //       }),
  //     });

  //     const data = await response.json();

  //     if (data.success) {
  //       console.log("Google sign-in successful:", data.user);
  //       router.push("/dashboard"); // Redirect to dashboard
  //     } else {
  //       console.error("Error during Google sign-in:", data.message);
  //     }
  //   } catch (err) {
  //     console.error("Error during Google sign-in:", err);
  //   }
  // }

  async function handleFormRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const name = formData.get("name");
      const password = formData.get("password");
      const email = formData.get("email") as string;
      console.log(formData.get("action"));

      const response = await fetch("/api/sign-up", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          userName: name,
        }),
      });
      if (response.status === 201) {
        // Redirect to OTP verification page with email in query params
        router.push(
          `/auth/verify-otp?email=${encodeURIComponent(email as string)}`
        );
      } else {
        const data = await response.json();
        setError(data.message || "Sign-up failed."); // Show specific error message
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
      setError("Something went wrong. Please try again.");
    }
  }

  return (
    <div>
      {error && <p className="text-red-600 p-2">{error}</p>}{" "}
      {/* Show specific error */}
      <form className="flex flex-col mt-3 " onSubmit={handleFormRegister}>
        <div className="m-3  pl-1 pr-1 flex flex-col">
          <input
            className="mb-2 border-black-300 p-2 border-2"
            type="text"
            name="name"
            placeholder="username"
          />
          <input
            className="mt-2 mb-2  border-black-300 p-2 border-2"
            type="email"
            name="email"
            placeholder="email"
          />
          <input
            className="mt-2 mb-2 border-black-300 p-2 border-2"
            type="password"
            name="password"
            placeholder="password"
          />
        </div>{" "}
        <button
          className="border-green-600 border-2 p-1 rounded-md mb-2  hover:bg-green-500"
          type="submit"
          name="action"
          value="credentials"
        >
          Sign Up
        </button>
      </form>
       
    </div>
  );
};

export default SignUpForm;
