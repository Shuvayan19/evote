import ElectionModel, { Candidate } from "@/model/Election";
import dbConnect from "../../../../lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";



const generateUniqueRoomKey = async () => {
  let roomkey;
  do {
    roomkey = Math.floor(100000 + Math.random() * 900000);
  } while (await ElectionModel.exists({ roomkey })); // Ensure uniqueness
  return roomkey;
};
export async function GET(req: NextRequest) {
  const roomkey = req.nextUrl.searchParams.get("roomid");
  const email=req.nextUrl.searchParams.get("email");
  try {
    await dbConnect();
    if(roomkey){
      const election = await ElectionModel.findOne({ roomkey });
      if (!election) {
        return NextResponse.json(
          { success: false, message: "No Election found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, election })
    }
    if(email){
      const elections=await ElectionModel.find({parentMail:email})
      if (!elections||elections.length===0) {
        return NextResponse.json(
          { success: false, message: "No Election found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, elections })
    }
    return NextResponse.json(
      { success: false, message: "Missing required query parameter" },
      { status: 400 }
    );

    }
    catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, message: "error fetching election" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();
    const data=await req.json();
    console.log(data.Candidates);
    const { ElectionName,ElectionDesc, NoC, Candidates, Duration, parentMail, isStrict } =
      data;
    //Checking details of the submission
    if (!ElectionName || !Candidates || !parentMail || Candidates.length < 2) {
      return Response.json(
        { success: false, message: "Incomplete Details" },
        { status: 400 }
      );
    }
    //Checking the Number of Candidates
    if (Candidates.length !== NoC) {
      return Response.json(
        { success: false, message: "Number of Candidates does not match" },
        { status: 400 }
      );
    }
    const newCandidate = Candidates.map((candidate: Candidate) => ({
      Candidate_Name: candidate.Candidate_Name,
      party_img: candidate.party_img || null, // Default to empty string if not provided
      color: candidate.color || "", // Default to empty string if not provided
      votes: 0,
    }));
    const newKey = await generateUniqueRoomKey();
    const newElection = new ElectionModel({
      ElectionName,
      NoC,
      ElectionDesc,
      Candidates: newCandidate,
      Duration: 10,
      parentMail,
      isStrict: false,
      isActive:true,
      roomkey: newKey,
    });
    await newElection.save();

    return Response.json(
      {
        success: true,
        message: "New election created",
        roomkey: newElection.roomkey, // Send roomkey separately
        election: newElection,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "error creating election" },
      { status: 500 }
    );
  }
}
