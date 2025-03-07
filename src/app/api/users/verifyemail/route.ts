import { connectDB } from "@/utils/db";
import { AccountUserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';


connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { token } = await body;

    console.log(token);

    const user = await AccountUserModel.findOne({
      verifyToken: token,
      verifyExpiryToken: { $gt: Date.now() }
    });

    if (!user) {
      return NextResponse.json({ error: "INvalid Token" }, { status: 400 });
    }
    console.log(user);

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyExpiryToken = undefined;

    await user.save();

    return NextResponse.json({
      error: "Email verified succesfully",
      success: true
    },
      { status: 200 });


  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
}