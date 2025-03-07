import { connectDB } from "@/utils/db";
import { NextRequest, NextResponse } from 'next/server';

connectDB();

export async function GET(){
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

  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}