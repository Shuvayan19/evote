// app/api/verifyElection/route.ts
import { NextResponse } from 'next/server';
import ElectionModel from "@/model/Election";
import dbConnect from '../../../../lib/dbConnect';


export async function POST(request: Request) {
  try {
    const { roomId,email} = await request.json();
    
    await dbConnect();
    const election = await ElectionModel.findOne({ roomkey: roomId });
    const isOldVoter = await ElectionModel.findOne({
      roomkey:roomId,
      VoterList: {$in:[email]}
    });
    if(!election){
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Roomkey. Please try again.",
        },
        { status: 404 }
      );
    }
    if (isOldVoter) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already casted your vote in this election",
        },
        { status: 401 }
      );
    }
    if(election&&!isOldVoter){return NextResponse.json(
      {
        success: true,
        message: "Roomkey verified successfully",
      },
      { status: 200 }
    )};
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify election' },
      { status: 500 }
    );
  }
}