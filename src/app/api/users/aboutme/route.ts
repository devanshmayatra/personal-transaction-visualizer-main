import { connectDB } from "@/utils/db";
import { AccountUserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export async function POST(req: NextRequest){
  const id = await getDataFromToken(req);
  const user = await AccountUserModel.findOne({
    _id:id
  }).select("-password");

  if(!user){
    return NextResponse.json({
      error:"User Not Found / Invalid Token",
    }, {
      status:404,
    })
  }

  return NextResponse.json({
    message: "User Found",
    data:user, 
    success: true,
  });
}