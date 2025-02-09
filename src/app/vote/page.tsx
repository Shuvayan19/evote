// "use client";

// import React, { useEffect, useState } from "react";
// import { isElection } from "../../../lib/checkElection";
// import { redirect, useRouter } from "next/navigation";
// import { OtpInput } from "reactjs-otp-input";
// import { auth } from "@/auth";

// const page = () => {

//   const router = useRouter();
//   const [roomId, setroomId] = useState("");
//   const [error, setError] = useState("");
//   // useEffect(() => {
//   //   const checkSession = async () => {
//   //     const session = await auth();
//   //     if (!session?.user) {
//   //       redirect("/auth/signin");
//   //     }
//   //   };
//   //   checkSession();
//   // }, []);

//   const handleChange = (value: string) => setroomId(value);

//   async function handleVerify() {
//     if (!roomId || roomId.length < 6) {
//       setError("Please enter a valid OTP");
//       return;
//     }

//     try {
//       const isValid = await isElection(roomId);

//       if (!isValid) {
//         setError("Election not found");

//       } else {
//         alert(redirect(`/vote/${roomId}`));
//       }
//     } catch (error) {
//       console.error("Error verifying roomkey", error);
//       alert("Something went wrong. Please try again.");
//     }
//   }

//   return (
//     <div className="flex flex-col justify-center items-center p-3">
//       <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4 sm:mb-6 text-center">
//         Enter Election's Roomkey
//       </h1>
//       <div className="text-gray-400 text-sm">
//         Please enter the unique room key provided by the election coordinator to access the voting room.
//       </div>
//        <OtpInput
//         className="border-2 border-slate-400 text-3xl mr-1"
//         value={roomId}
//         onChange={handleChange}
//         numInputs={6}
//         separator={<span>{""}</span>}
//       />
//       <button
//         onClick={handleVerify}
//         className="p-2 mt-2 border-2 border-green-600 hover:bg-green-400"
//       >
//         ENTER
//       </button>
//       {error && <div className="text-red-500">{error}</div>}
//     </div>
//   );
// };

// export default page;

"use client";

import React, { useEffect, useState } from "react";

import { redirect, useRouter } from "next/navigation";
import { OtpInput } from "reactjs-otp-input";
import { auth } from "@/auth";

const Page = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (value: string) => {
    setRoomId(value);
    // Clear error when user starts typing again
    if (error) setError("");
  };

  async function handleVerify() {
    if (!roomId || roomId.length < 6) {
      setError("Please enter a valid OTP");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/verify-RoomKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ roomId }),
      });

      const data = await response.json();
      
      if (!data.isValid) {
        setError("Election not found");
      } else {
        router.push(`/vote/${roomId}`);
      }
    } catch (error) {
      console.error("Error verifying roomkey", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center p-3">
      <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4 sm:mb-6 text-center">
        Enter Election's Roomkey
      </h1>
      <div className="text-gray-400 text-sm">
        Please enter the unique room key provided by the election coordinator to
        access the voting room.
      </div>

      <OtpInput
        className="border-2 rounded-md border-slate-400 text-4xl mr-1"
        value={roomId}
        onChange={handleChange}
        numInputs={6}
        separator={<span>{""}</span>}
        isDisabled={isLoading}
      />
      {/*//*working directly on router push cant verify and 
      //*flag a wrong roomkey because of that fetching wrong pages fix that}*/}
      <button
        onClick={handleVerify}
        disabled={isLoading}
        className={`p-2 mt-2 border-2 rounded-lg border-green-600 
          ${
            isLoading ? "bg-gray-200 cursor-not-allowed" : "hover:bg-green-400"
          }`}
      >
        {isLoading ? "Verifying..." : "ENTER"}
      </button>

      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
    </div>
  );
};

export default Page;
