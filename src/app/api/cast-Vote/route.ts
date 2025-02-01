import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import ElectionModel from "@/model/Election";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { roomkey, Candidate_Name } = await req.json();
    const election = await ElectionModel.findOne({ roomkey });
    if (!election) {
      console.log("no such election is found");
      return Response.json(
        { success: false, message: "no such election is currently active" },
        { status: 404 }
      );
    }
    const updatedElection = await ElectionModel.findOneAndUpdate(
      {
        roomkey,
        "Candidates.Candidate_Name": Candidate_Name,
      },
      { $inc: { "Candidates.$.votes": 1 } },
      { new: true }
    );
    if (!updatedElection) {
      console.log("wrong Candidate info passed");
      return Response.json(
        { success: false, message: "Candidate name does not match" },
        { status: 404 }
      );
    }
    return Response.json(
      { success: true, message: "Vote Casted Successfully", updatedElection },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
