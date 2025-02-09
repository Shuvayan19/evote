import { Suspense } from "react"
import { notFound } from "next/navigation"
import VotingArea from "./VotingArea"


export default async function VotePage({ params }: { params: Promise<{ roomkey: string }> }) {
  const roomkey =( await params).roomkey;
  const electionData=await fetch(`${process.env.HOST_ADDRESS}/api/create-Election/?roomid=${roomkey}`).then((res) => res.json())
  console.log(electionData);
  if (!electionData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">{electionData.election.ElectionName}</h1>
        <Suspense fallback={<div>Loading voting area...</div>}>
          <VotingArea roomId={roomkey} candidates={electionData.election.Candidates} />
        </Suspense>
      </div>
    </div>
  )
}

