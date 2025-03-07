import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(req: NextRequest){
  try {
    const response = NextResponse.json({
      message:"Logged out succesfully",
      success:true
    });

    response.cookies.set("token" , "" , {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;

  } catch (error : any) {
    return NextResponse.json({
      error:error.messsage,
    },{
      status:500
    })
  }
}