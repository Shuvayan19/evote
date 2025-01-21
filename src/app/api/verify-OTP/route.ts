// import UserModel from "@/model/User";
// import dbConnect from "../../../../lib/dbConnect";
// export async function POST(request: Request) {
//   await dbConnect();
//   try {
//     const { email,otp } = await request.json();
//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return Response.json(
//         {
//           success: false,
//           message: "No user with this emailid!",
//           redirectto: "/sign-up",
//         },
//         { status: 400 }
//       );
//     }
//     if (user.isVerified) {
//       return Response.json(
//         {
//           success: false,
//           message: "User already verified.Please Log in",
//           redirectto: "/signin",
//         },
//         { status: 400 }
//       );
//     }
//     const isOtpMismatch = user.verifyCode != otp;
//     const isOtpExpired = user.verifyCodeExpiry && user.verifyCodeExpiry < new Date();
    
//     if (isOtpMismatch || isOtpExpired) {
//         // Handle invalid or expired OTP
//         if (isOtpMismatch) {
//             return Response.json({
//               success: false,
//               message: "Invalid OTP. Please try again.",
//             }, { status: 400 });
//           }
          
//           if (isOtpExpired) {
//             return Response.json({
//               success: false,
//               message: "OTP has expired. Please request a new one.",
//               redirectto:"/signup"
//             }, { status: 400 });
//           }
//           return Response.json({
//             success: true,
//             message: "OTP has been successfully Verified",
//             redirectto:"/signin"
//           }, { status: 200 });
//     }

//     //Finally after all check if the user passed mark him verified
//     user.isVerified=true;
//     user.verifyCode=null;
//     user.verifyCodeExpiry=null;
//   } catch (error) {
//     console.log("OTP verification error", error);
//     return Response.json(
//       {
//         success: false,
//         message: "Something went wrong!",
//         redirectto: "/signin",
//       },
//       { status: 500 }
//     );
//   }
// }
import UserModel from "@/model/User";
import dbConnect from "../../../../lib/dbConnect";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email, otp } = await request.json();
    const user = await UserModel.findOne({ email });

    // Check if user exists
    if (!user) {
      return new Response(JSON.stringify({
        success: false,
        message: "No user with this emailid!",
        redirectto: "/auth/sign-up",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if already verified
    if (user.isVerified) {
      return new Response(JSON.stringify({
        success: false,
        message: "User already verified. Please Log in",
        redirectto: "/auth/signin",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check OTP validity
    if (user.verifyCode != otp) {
      return new Response(JSON.stringify({
        success: false,
        message: "Invalid OTP. Please try again.",
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check OTP expiry
    if (user.verifyCodeExpiry && user.verifyCodeExpiry < new Date()) {
      return new Response(JSON.stringify({
        success: false,
        message: "OTP has expired. Please request a new one.",
        redirectto: "/auth/signup"
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // If all checks pass, verify the user
    user.isVerified = true;
    user.verifyCode = null;
    user.verifyCodeExpiry = null;
    await user.save();

    return new Response(JSON.stringify({
      success: true,
      message: "OTP has been successfully Verified",
      redirectto: "/auth/signin"
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.log("OTP verification error", error);
    return new Response(JSON.stringify({
      success: false,
      message: "Something went wrong!",
      redirectto: "/auth/signin",
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}