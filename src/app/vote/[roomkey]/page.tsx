import { Suspense } from "react"
import { notFound } from "next/navigation"
import VotingArea from "./VotingArea"
import { getElectionData } from "../../../../lib/electionData"

export default async function VotePage({ params }: { params: { roomId: string } }) {
  const { roomId } = params
  const electionData = await getElectionData(roomId)

  if (!electionData) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">{electionData.ElectionName}</h1>
        <Suspense fallback={<div>Loading voting area...</div>}>
          <VotingArea roomId={roomId} candidates={electionData.Candidates} />
        </Suspense>
      </div>
    </div>
  )
}

