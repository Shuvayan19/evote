// "use client";
// import { useState } from "react";
// import React from "react";
// import { OtpInput } from "reactjs-otp-input";

// const page = () => {
//   const [otp, setOtp] = useState("");

//   const handleChange = (otp: string) => setOtp(otp);
//   async function handleVerify() {
//     await fetch("/api/verify-OTP", {
//       method: "POST",
//       headers: { "content-type": "application/json" },
//       body:JSON.stringify({otp})
//     });
//   }
//   return (
//     <div>
//       <OtpInput
//         value={otp}
//         onChange={handleChange}
//         numInputs={6}
//         separator={<span>-</span>}
//       />
//       <button
//          onClick={handleVerify}
//         className="p-2 mt-2 border-2 border-green-600 hover:bg-green-400"
//       >
//         Verify
//       </button>
//     </div>
//   );
// };

// export default page;
"use client";
import { useState, useEffect } from "react";

import {OtpInput} from "reactjs-otp-input"; // Ensure correct import path
import { useRouter, useSearchParams } from "next/navigation";


const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get email from query params
    const emailFromQuery = searchParams.get("email");
    if (emailFromQuery) {
      setEmail(emailFromQuery);
    } else {
      console.error("No email provided");
      router.push("/sign-up"); // Redirect back if no email
    }
  }, [searchParams, router]);

  const handleChange = (otp: string) => setOtp(otp);

  async function handleVerify() {
    if (!otp || otp.length < 6) {
      alert("Please enter a valid OTP");
      return;
    }

    try {
      const response = await fetch("/api/verify-OTP", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ otp, email }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        router.push(result.redirectto || "/auth/signin");
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <div className="flex flex-col justify-center items-center p-3">
      <OtpInput className="border-2 border-slate-400 text-3xl mr-1"
        value={otp}
        onChange={handleChange}
        numInputs={6}
        separator={<span>{""}</span>}
      />
      <button
         onClick={handleVerify}
        className="p-2 mt-2 border-2 border-green-600 hover:bg-green-400"
      >
        Verify
      </button>
    </div>
  );
};

export default VerifyOtpPage;
