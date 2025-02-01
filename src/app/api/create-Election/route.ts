import ElectionModel, { Candidate } from "@/model/Election";
import dbConnect from "../../../../lib/dbConnect";

const generateUniqueRoomKey = async () => {
  let roomkey;
  do {
    roomkey = Math.floor(100000 + Math.random() * 900000);
  } while (await ElectionModel.exists({ roomkey })); // Ensure uniqueness
  return roomkey;
};

export async function POST(req: Request, res: Response) {
  try {
    await dbConnect();
    const { ElectionName, NoC, Candidates, Duration, parentId, isStrict } =
      await req.json();
    //Checking details of the submission
    if (!ElectionName || !Candidates || !parentId || Candidates.length < 2) {
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
      party_img: candidate.party_img || "", // Default to empty string if not provided
      votes: 0,
    }));
    const newKey=await generateUniqueRoomKey();
    const newElection = new ElectionModel({
      ElectionName,
      NoC,
      Candidates: newCandidate,
      Duration: 10,
      parentId,
      isStrict: false,
      roomkey:newKey
    });
    await newElection.save();

    return Response.json(
      { success: true, message: "New election created" , roomkey: newElection.roomkey,  // Send roomkey separately
        election: newElection},
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
