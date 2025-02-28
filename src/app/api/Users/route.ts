import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import UserModel from "@/model/User";

export  async function GET(req: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "unauthorized" },
        { status: 401 }
      );
    }

    const email = session.user.email;

    await dbConnect();
    const user = await UserModel.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "User Not found" },
        { status: 404 }
      );
    }
    const stats = {
      votedElections: user.votedElection || 0,
      createdElection: user.createdElection || 0,
      activeVotes: user.createdElection || 0,
    };
    return NextResponse.json({ success: true, stats }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json(
      { success: false, message: "Something went wrong" },
      { status: 500 }
    );
  }
}
