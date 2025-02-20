import { NextRequest } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import ElectionModel from "@/model/Election";
import { auth } from "@/auth";

export async function POST(req: NextRequest) {
  try {
    //check if there is user in the session
    const session = await auth();
    if (!session?.user) {
      return Response.json({success:false,message:"unauthorized"},{ status: 401 });
    }
    //:Storing the mail id as userid inside voterlist for now maintaining the uniqueness
    

    const { roomkey, Candidate_Name,email} = await req.json();
    if(!roomkey||!Candidate_Name){
      return Response.json({success:false,message:"incomplete inputs"},{status:400})
    }
    //connect Db
    await dbConnect();
    //now check whether the user has already voted in this election or not by checking
    //user id and the election voter list
    const isOldVoter = await ElectionModel.findOne({
      roomkey,
      VoterList: session.user?.email,
    });
    if (isOldVoter) {
      return Response.json(
        {
          success: false,
          message: "You have already casted your vote in this election",
        },
        { status: 401 }
      );
    }
   

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
      { $inc: { "Candidates.$.votes": 1 }, $push: { VoterList:  email  } },
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
