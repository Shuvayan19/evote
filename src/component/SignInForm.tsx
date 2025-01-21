// "use client";
// import { doSociallogin, doCredentiallogin } from "@/app/api/actions";
// import { useRouter } from "next/navigation";
// import { FormEvent } from "react";
// import { useState } from "react";

// export const SignInForm = () => {
//   const router = useRouter();
//   const [error, setError] = useState("");
//   async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault();
//     try {
//       const formData = new FormData(event.currentTarget);
//       const action = formData.get("action");

//       console.log("Retrieved action:", action);

//       // if (!action) {
//       //   console.error("No action found in form submission.");
//       //   return;
//       // }

//       if (action === "credentials") {
//         // Handle credentials login
//         const response = await doCredentiallogin(formData);

//         if (response.error) {
//           setError(response.error.message || "Invalid credentials.");
//         } else {
//           router.push("/dashboard");
//         }
//       } else {
//         // Handle social login (Google)
//         const response = await doSociallogin(formData);

//         return response;
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       setError("Something went wrong. Please try again.");
//     }
//   }

//   return (
//     <div>
//       <p className="text-red-600 p-2">{error}</p>
//       <form className="flex flex-col  " onSubmit={handleFormSubmit}>
//         <div className="m-3  pl-1 pr-1 flex flex-col">
//           <input
//             className="mt-2 mb-2  border-black-300 p-2 border-2"
//             type="email"
//             name="email"
//             placeholder="email"
//           />
//           <input
//             className="mb-2 border-black-300 p-2 border-2"
//             type="password"
//             name="password"
//             placeholder="password"
//           />
//         </div>{" "}
//         <button
//           className="border-green-600 border-2 p-1 rounded-md mb-2 hover:bg-green-500"
//           type="submit"
//           name="action"
//           value="credentials"
//         >
//           Sign In
//         </button>
//         <button
//           className="border-yellow-600 border-2 p-1 rounded-md hover:bg-yellow-500"
//           type="submit"
//           name="action"
//           value="google"
//         >
//           Sign in with Google
//         </button>
//       </form>
//     </div>
//   );
// };

"use client";
import { login } from "@/app/api/actions";
import { useRouter } from "next/navigation";

import { FormEvent, useState } from "react";

export const SignInForm = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  // async function handleCredentialSubmit(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   try {
  //     const formData = new FormData(event.currentTarget);
  //     await doCredentiallogin(formData);
  //     router.push("/dashboard");

  //   } catch (error) {
  //       setError("An unexpected error occurred. Please try again.");

  //     // Display the error message (error will be a string
  //   }
  // }

  async function handlelogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = new FormData(event.currentTarget);

      const response = await login(formData);

      // if (!!response.error) {
      //   setError("Wrong Password entered"); // Redirect on successful login
      // }
      if (response?.ok) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.message || "Something went wrong. Please try again.");
    }
  }
  // async function handleGoogleSignIn(e: React.MouseEvent<HTMLButtonElement>) {
  //   e.preventDefault();
  //   try {
  //     // const formData = new FormData();
  //     // formData.append("action", "google");
  //     await doSociallogin("google");
  //   } catch (error) {
  //     console.error("Error during Google login:", error);
  //     setError("Something went wrong. Please try again.");
  //   }
  // }

  return (
    <div>
      {error && <p className="text-red-600 p-2">{error}</p>}

      <form className="flex flex-col" onSubmit={handlelogin}>
        <div className="m-3 pl-1 pr-1 flex flex-col">
          <input
            className="mt-2 mb-2 border-black-300 p-2 border-2"
            type="email"
            name="email"
            placeholder="email"
            required
          />
          <input
            className="mb-2 border-black-300 p-2 border-2"
            type="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <button
          className="border-green-600 border-2 p-1 rounded-md mb-2 hover:bg-green-500"
          type="submit"
        >
          Sign In
        </button>
        {/* <button
          className="border-yellow-600 border-2 p-1 rounded-md hover:bg-yellow-500"
          type="button"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button> */}
      </form>
    </div>
  );
};
