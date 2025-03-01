import { NextRequest, NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import ElectionModel from "@/model/Election";

export async function POST(req: NextRequest, res: NextResponse) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response('Unauthorized', {
      status: 401,
    });
  }

  try {
    await dbConnect();
    const currentDate = new Date();
    const result = await ElectionModel.deleteMany({
      endDate: { $lt: currentDate },
    });
    console.log("cron ran at:",currentDate);
    return NextResponse.json(
      {
        success: true,
        message: `Successfully deleted ${result.deletedCount} expired elections`,
        deletedCount: result.deletedCount,
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error("Cron job error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete expired elections" },
      { status: 500 }
    );
  }
}
