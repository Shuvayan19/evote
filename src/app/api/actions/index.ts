"use server";

import { signIn, signOut } from "@/auth";

import { redirect } from "next/navigation";

// export async function doSocialLogin(formData:FormData) {

//   try {
//     await signIn("google");
//   } catch (error) {
//     console.error("Error during social login:", error);
//     throw error; // Re-throw the error to handle it in the client component
//   }
// }
// export async function doCredentiallogin(formData: FormData) {
//   try {
//     const response = await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirect: false,
//       callbackUrl: "/dashboard",
//     });

//     return response;
//   } catch (error) {
//     console.error(error);
//   }
// }
// export async function doCredentiallogin(formData: FormData) {
//   try {
//     const response = await signIn("credentials", {
//       email: formData.get("email"),
//       password: formData.get("password"),
//       redirect: false,
//     });
//     if (response?.error) {
//       // Throw an error with the message from the response
//       throw new Error(response.error);
//     }

//     return response; // Return response for successful login
//   } catch (error) {
//     throw (error)
// }
// }
export async function login(formData: FormData): Promise<any> {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error: any) {
    console.error("Error during credential login:", error);
    return { message: error.message, statusCode: 500 };
  }
  redirect("/dashboard");
}

export async function doSociallogout() {
  //logout function
  await signOut({ redirectTo: "/auth/signin", redirect: true });
}
