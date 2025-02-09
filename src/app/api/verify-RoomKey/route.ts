// app/api/verifyElection/route.ts
import { NextResponse } from 'next/server';
import ElectionModel from "@/model/Election";
import dbConnect from '../../../../lib/dbConnect';


export async function POST(request: Request) {
  try {
    const { roomId } = await request.json();
    
    await dbConnect();
    const election = await ElectionModel.findOne({ roomkey: roomId });
    
    return NextResponse.json({ 
      isValid: !!election 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to verify election' },
      { status: 500 }
    );
  }
}