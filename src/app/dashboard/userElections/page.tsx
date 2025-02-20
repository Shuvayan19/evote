// "use client";

// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
// import { Election } from "@/model/Election";
// import { useSession } from "next-auth/react";
// import { notFound } from "next/navigation";
// import React, { useEffect, useState } from "react";

// const page = () => {
//   const [elections, setElections] = useState<Election[]>([]);
//   const [error, setError] = useState("");
//   const { data: session } = useSession();
//   const email = session?.user?.email;

//   useEffect(() => {
//     async function getElection() {
//       try {
//         if (!email) return;

//         const response = await fetch(`/api/Elections?email=${email}`);
//         const data = await response.json();

//         if (!data.success) {
//           setError(data.message);
//           return;
//         }

//         setElections(data.elections);
//       } catch (error: any) {
//         console.log(error);
//         setError(error.message);
//       }
//     }

//     if (session) {
//       getElection();
//     }
//   }, [session, email]);

//   return (
//     <div>
//       <div>Your Elections</div>
//       {elections.map((election, index) => (
//         <div key={index} className="grid grid-cols-1 m-3 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

//           <Card>
//             <CardHeader>
//               <CardTitle>{election.ElectionName}</CardTitle>
//               {election.ElectionDesc&&<CardDescription>{election.ElectionDesc}</CardDescription>}
//             </CardHeader>
//             <CardContent>{/*display the horizontal chart here */}
//             </CardContent>
//             <CardFooter>{/*display the winner of the current winning candidate */}</CardFooter>
//           </Card>

//         </div>
//       ))}
//       {error && <div className="text-sm text-red-500">{error}</div>}
//     </div>
//   );
// };

// export default page;

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Candidate, Election } from "@/model/Election";
import { useSession } from "next-auth/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect, useState } from "react";

const ElectionsPage = () => {
  const [elections, setElections] = useState<Election[]>([]);
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const email = session?.user?.email;

  useEffect(() => {
    async function getElection() {
      try {
        if (!email) return;

        const response = await fetch(`/api/Elections?email=${email}`);
        const data = await response.json();

        if (!data.success) {
          setError(data.message);
          return;
        }

        setElections(data.elections);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    }

    if (session) {
      getElection();
    }
  }, [session, email]);

  const getWinningCandidate = (candidates: Candidate[]) => {
    if (!candidates || candidates.length === 0) return null;

    return candidates.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
  };

  const prepareChartData = (candidates: Candidate[]) => {
    if (!candidates) return [];
    return candidates.map((candidate) => ({
      name: candidate.Candidate_Name,
      votes: candidate.votes,
      fill: candidate.color || "#000000",
    }));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl sm:text-3xl font-bold text-emerald-600 mb-4 sm:mb-6 text-center">
        Your Election's
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {elections.map((election, index) => {
          const winningCandidate = getWinningCandidate(election.Candidates);
          const chartData = prepareChartData(election.Candidates);

          return (
            <Card key={index} className="w-full md:w-10/12  md:ml-24">
              <CardHeader>
                {/* <CardTitle className="flex justify-between">{election.ElectionName}{election.roomkey}</CardTitle> */}
                <CardTitle className="flex justify-between items-center">
                  <span>{election.ElectionName}</span>
                  <span className="text-red-500 underline decoration-2 underline-offset-2 font-medium">
                    Room: {election.roomkey}
                  </span>
                </CardTitle>
                {election.ElectionDesc && (
                  <CardDescription>{election.ElectionDesc}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={chartData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 30, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis type="category" dataKey="name" width={120} />
                      <Tooltip />
                      <Bar
                        dataKey="votes"
                        fill="#8884d8"
                        radius={[0, 4, 4, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                {winningCandidate && (
                  <div className="space-y-2">
                    <p className="font-semibold">Current Leading Candidate:</p>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: winningCandidate.color }}
                      />
                      <span>{winningCandidate.Candidate_Name}</span>
                      <span className="font-medium">
                        ({winningCandidate.votes} votes)
                      </span>
                    </div>
                  </div>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {error && <div className="text-sm text-red-500 mt-4">{error}</div>}
    </div>
  );
};

export default ElectionsPage;
