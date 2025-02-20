"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { OtpInput } from "reactjs-otp-input";

const Page = () => {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const session = useSession();
  if (!session.data?.user) {
    redirect("/auth/signin");
  }
  //! Again, we are using the email as the userid to preserve uniqueness for now until we find a fix
  const email = session.data?.user?.email;
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
      const response = await fetch("/api/verify-RoomKey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ roomId, email }),
      });

      

      if (response.status === 200) {
        router.push(`/vote/${roomId}`);
      }
      else{
        const data = await response.json();
        setError(data.message || "Invalid Roomkey"); // Show specific error message
        
      } 
    } catch (error: any) {
      console.error("Error verifying roomkey", error);
      setError(error.message || "Something went wrong. Please try again.");
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
        className="border-2 rounded-md border-red-300 text-4xl mr-1"
        value={roomId}
        onChange={handleChange}
        numInputs={6}
        separator={<span>{""}</span>}
        isDisabled={isLoading}
      />
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
