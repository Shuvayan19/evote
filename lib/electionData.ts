import dbConnect from "./dbConnect"
import ElectionModel, { Election } from "@/model/Election"

export async function getElectionData(roomId: string): Promise<Election | null> {
  await dbConnect()
  const election = await ElectionModel.findOne({ roomkey: roomId })
  return election ? election.toObject() : null
}

