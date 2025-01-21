import verificationEmail from "../../emailStructures/ verificationEmail";
import { resend } from "../../lib/resend";
import ApiResponse from "@/types/ApiResponse";

export async function sendVerificationEmail(
  username: string,
  otp: string,
  email: string
):Promise<ApiResponse> {
  const host=process.env.SENDER_MAIL||"sbhnandy4@gmail.com";
    try {
        await resend.emails.send({
            from: host,
            to: email,
            subject: 'Verification Code',
            react: verificationEmail({username ,OTP:otp}),
          });
      
        return{success:true,message:"email sent successfully"}; 
    } catch (Emailerror) {
        console.log("Error sending email",Emailerror);
        return{success:false,message:"error sending mail"};
    }
}
