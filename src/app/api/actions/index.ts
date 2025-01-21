"use server";

import { signIn, signOut } from "@/auth";

import { redirect } from "next/navigation";

// export async function doSociallogin(provider: string) {
//   //login function

//   console.log(provider);
//   return signIn(provider, {
//     callbackUrl: "/dashboard",
//     redirect: false,
//   });
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
export async function login(formData: FormData) :Promise<any>{
  try {
   const email= formData.get("email") as string;
    const password= formData.get("password")as string;
   
    await signIn("credentials", {
      redirect: false,
      callbackUrl:"/",
      email,
      password
      
    });
   
    
  } catch (error:any) {
    console.error("Error during credential login:", error);
    throw new Error(error)
    }
    redirect('/dashboard');
   
}

export async function doSociallogout() {
  //logout function
  await signOut( {redirectTo: "/auth/signin", redirect: true});
}
