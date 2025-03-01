// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
// import Image from "next/image";
// import LogoutForm from "@/component/LogoutForm";

// import Link from "next/link";

// const page = async () => {
//   const session = await auth();
//   if (!session?.user) {
//     redirect("/auth/signin");
//   }

//   return (
//     <div className="flex flex-col ">
//       <span className="flex  flex-row justify-between m-2">
//         <div>
//           Welcome{" "}
//           <span className="text-red-400 font-bold ml-2">
//             {session.user.email}
//           </span>
//         </div>
//         <div>
//           Your ID :{" "}
//           <span className="text-black-400 font-bold ml-2">
//             {session.user.id}
//           </span>
//         </div>
//       </span>
//       <div className="flex flex-col justify-center items-center ">
//         {session.user.image && (
//           <Image
//             src={session.user.image as string}
//             alt="description"
//             width="150"
//             height="150"
//             className="rounded-full size-32"
//           />
//         )}

//         <div className="m-2 text-3xl flex flex-col">
//           HEY!!
//           <span>{session.user.name}</span>
//           <div className="ml-8 mt-1 flex flex-col">
//             <Link href="/dashboard/createElection"
//               className="border-green-600 border-2 p-1 rounded-md mb-2  hover:bg-green-500"
//             >
//               Create Election
//             </Link>
//             <Link href="/vote"
//               className="border-orange-600 border-2 p-1 rounded-md mb-2  hover:bg-orange-500"
//             >
//               Cast Vote
//             </Link>
//             <Link href="/dashboard/userElections"
//               className="border-blue-600 border-2 p-1 rounded-md mb-2  hover:bg-blue-500"
//             >
//               Your Elections
//             </Link>
//             <LogoutForm />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
// import Image from "next/image";
// import LogoutForm from "@/component/LogoutForm";
// import Link from "next/link";

// const page = async () => {
//   const session = await auth();
//   if (!session?.user) {
//     redirect("/auth/signin");
//   }

//   return (
//     <div className="min-h-screen bg-white relative">
//       {/* Diagonal Wavy Stripes Background */}
//       {/* <div className="absolute inset-0 opacity-10 overflow-hidden">
//         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//           <pattern
//             id="wavyStripes"
//             width="100"
//             height="100"
//             patternUnits="userSpaceOnUse"
//             patternTransform="rotate(45)"
//           >
//             <path
//               d="M 0,10 C 30,10 30,0 60,0 C 90,0 90,10 120,10 L 120,20 C 90,20 90,10 60,10 C 30,10 30,20 0,20 Z"
//               fill="#10b981"
//             />
//           </pattern>
//           <rect width="100%" height="100%" fill="url(#wavyStripes)" />
//         </svg>
//       </div> */}

//       {/* Header with user info */}
//       <div className="p-6 flex justify-between items-center border-b bg-white relative z-10">
//         <div className="flex items-center gap-3">
//           {session.user.image && (
//             <Image
//               src={session.user.image as string}
//               alt="User profile"
//               width="40"
//               height="40"
//               className="rounded-full"
//             />
//           )}
//           <div>
//             <p className="text-gray-600">
//               Welcome,{" "}
//               <span className="font-medium text-emerald-600">
//                 {session.user.name}
//               </span>
//             </p>
//             <p className="text-xs text-gray-500">{session.user.email}</p>
//           </div>
//         </div>
//         <div className=" flex items-center gap-2">
//           <span className="hidden sm:block md:text-xs text-gray-500">ID: {session.user.id}</span>
//           <LogoutForm />
//         </div>
//       </div>

//       {/* Main content with Bento Grid */}
//       <div className="max-w-6xl mx-auto p-6 pt-8 relative z-10">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold text-emerald-800 mb-2">
//             Make your voice count
//           </h1>
//           <p className="text-xl text-emerald-600">
//             Simple. Secure. Transparent.
//           </p>
//         </div>

//         {/* Bento Grid Layout */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {/* Create Election - Larger Card */}
//           <Link
//             href="/dashboard/createElection"
//             className="md:col-span-2 block"
//           >
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
//               <div className="flex justify-between mb-4">
//                 <h2 className="text-2xl font-semibold text-emerald-600">
//                   Create Election
//                 </h2>
//                 <div className="bg-emerald-100 p-2 rounded-full">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-emerald-600"
//                   >
//                     <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
//                     <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
//                   </svg>
//                 </div>
//               </div>
//               <p className="text-gray-600 flex-grow">
//                 Set up your election in minutes with customizable options and
//                 secure voting
//               </p>
//               <div className="bg-emerald-50 p-3 rounded-md mt-4 text-sm text-emerald-800">
//                 Most popular choice for organizers
//               </div>
//             </div>
//           </Link>

//           {/* User Profile Summary */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
//             <h2 className="text-xl font-semibold text-emerald-600 mb-3">
//               Your Profile
//             </h2>
//             <div className="flex justify-center mb-4">
//               {session.user.image ? (
//                 <Image
//                   src={session.user.image as string}
//                   alt="User profile"
//                   width="80"
//                   height="80"
//                   className="rounded-full"
//                 />
//               ) : (
//                 <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
//                   {session.user.name?.[0] || session.user.email?.[0] || "U"}
//                 </div>
//               )}
//             </div>
//             <div className="text-center mb-2">
//               <p className="font-medium">{session.user.name}</p>
//               <p className="text-sm text-gray-500">{session.user.email}</p>
//             </div>
//           </div>

//           {/* Cast Vote */}
//           <Link href="/vote" className="block">
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
//               <div className="flex justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-emerald-600">
//                   Cast Vote
//                 </h2>
//                 <div className="bg-emerald-100 p-2 rounded-full">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-emerald-600"
//                   >
//                     <path d="m9 12 2 2 4-4"></path>
//                     <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path>
//                     <path d="M22 19H2"></path>
//                   </svg>
//                 </div>
//               </div>
//               <p className="text-gray-600">
//                 Simple and secure voting experience
//               </p>
//             </div>
//           </Link>

//           {/* Your Elections */}
//           <Link href="/dashboard/userElections" className="md:col-span-2 block">
//             <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
//               <div className="flex justify-between mb-4">
//                 <h2 className="text-xl font-semibold text-emerald-600">
//                   Your Elections
//                 </h2>
//                 <div className="bg-emerald-100 p-2 rounded-full">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="24"
//                     height="24"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-emerald-600"
//                   >
//                     <rect
//                       width="18"
//                       height="18"
//                       x="3"
//                       y="3"
//                       rx="2"
//                       ry="2"
//                     ></rect>
//                     <line x1="12" x2="12" y1="8" y2="16"></line>
//                     <line x1="8" x2="16" y1="12" y2="12"></line>
//                   </svg>
//                 </div>
//               </div>
//               <p className="text-gray-600">
//                 Manage and view results of all your hosted elections
//               </p>
//             </div>
//           </Link>

//           {/* Quick Stats */}
//           <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
//             <h2 className="text-xl font-semibold text-emerald-600 mb-4">
//               Quick Stats
//             </h2>
//             <div className="space-y-3">
//               <div className="flex justify-between items-center border-b pb-2">
//                 <span className="text-gray-600">Elections Created</span>
//                 <span className="font-medium">{}</span>
//               </div>
//               <div className="flex justify-between items-center border-b pb-2">
//                 <span className="text-gray-600">Votes Cast</span>
//                 <span className="font-medium">0</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-600">Active Elections</span>
//                 <span className="font-medium">0</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default page;

"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LogoutForm from "@/component/LogoutForm";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";


// Define stats type
interface UserStats {
  votedElections: number;
  createdElection: number;
  activeVotes: number;
};

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<UserStats>({
    votedElections: 0,
    createdElection: 0,
    activeVotes: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch user stats
  const fetchUserStats = async () => {
    try {
      const response = await fetch("/api/Users");
      const data = await response.json();

      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch user stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin");
    } else if (status === "authenticated") {
      fetchUserStats();
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-emerald-600 text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render the dashboard content if not authenticated
  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header with user info */}
      <div className="p-6 flex justify-between items-center border-b bg-white relative z-10">
        <div className="flex items-center gap-3">
          {session.user.image && (
            <Image
              src={session.user.image as string}
              alt="User profile"
              width="40"
              height="40"
              className="rounded-full"
            />
          )}
          <div>
            <p className="text-gray-600">
              Welcome,{" "}
              <span className="font-medium text-emerald-600">
                {session.user.name}
              </span>
            </p>
            <p className="text-xs text-gray-500">{session.user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">ID: {session.user.id}</span>
          <LogoutForm /> 
        </div>
      </div>

      {/* Main content with Bento Grid */}
      <div className="max-w-6xl mx-auto p-6 pt-8 relative z-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">
            Make your voice count
          </h1>
          <p className="text-xl text-emerald-600">
            Simple. Secure. Transparent.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Create Election - Larger Card */}
          <Link
            href="/dashboard/createElection"
            className="md:col-span-2 block"
          >
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-between mb-4">
                <h2 className="text-2xl font-semibold text-emerald-600">
                  Create Election
                </h2>
                <div className="bg-emerald-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                </div>
              </div>
              <p className="text-gray-600 flex-grow">
                Set up your election in minutes with customizable options and
                secure voting
              </p>
              <div className="bg-emerald-50 p-3 rounded-md mt-4 text-sm text-emerald-800">
                Most popular choice for organizers
              </div>
            </div>
          </Link>

          {/* User Profile Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
            <h2 className="text-xl font-semibold text-emerald-600 mb-3">
              Your Profile
            </h2>
            <div className="flex justify-center mb-4">
              {session.user.image ? (
                <Image
                  src={session.user.image as string}
                  alt="User profile"
                  width="80"
                  height="80"
                  className="rounded-full"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-2xl font-bold">
                  {session.user.name?.[0] || session.user.email?.[0] || "U"}
                </div>
              )}
            </div>
            <div className="text-center mb-2">
              <p className="font-medium">{session.user.name}</p>
              <p className="text-sm text-gray-500">{session.user.email}</p>
            </div>
          </div>

          {/* Cast Vote */}
          <Link href="/vote" className="block">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-emerald-600">
                  Cast Vote
                </h2>
                <div className="bg-emerald-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <path d="m9 12 2 2 4-4"></path>
                    <path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7Z"></path>
                    <path d="M22 19H2"></path>
                  </svg>
                </div>
              </div>
              <p className="text-gray-600">
                Simple and secure voting experience
              </p>
            </div>
          </Link>

          {/* Your Elections */}
          <Link href="/dashboard/userElections" className="md:col-span-2 block">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
              <div className="flex justify-between mb-4">
                <h2 className="text-xl font-semibold text-emerald-600">
                  Your Elections
                </h2>
                <div className="bg-emerald-100 p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-emerald-600"
                  >
                    <rect
                      width="18"
                      height="18"
                      x="3"
                      y="3"
                      rx="2"
                      ry="2"
                    ></rect>
                    <line x1="12" x2="12" y1="8" y2="16"></line>
                    <line x1="8" x2="16" y1="12" y2="12"></line>
                  </svg>
                </div>
              </div>
              <p className="text-gray-600">
                Manage and view results of all your hosted elections
              </p>
            </div>
          </Link>

          {/* Quick Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col">
            <h2 className="text-xl font-semibold text-emerald-600 mb-4">
              Quick Stats
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Elections Created</span>
                <span className="font-medium">{stats.createdElection}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="text-gray-600">Votes Cast</span>
                <span className="font-medium">{stats.votedElections}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Active Elections</span>
                <span className="font-medium">{stats.activeVotes}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
