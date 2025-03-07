import { connectDB } from "@/utils/db";
import { AccountUserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";
import jwt from 'jsonwebtoken';
import { TokenData } from "@/types/tokenData";

connectDB();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const user = await AccountUserModel.findOne({ email });

    if (!user) {
      return new Response('User not found', {
        status: 404,
      });
    }
    console.log("User exists");

    const isValid = await bcryptjs.compare(password, user.password);

    if (!isValid) {
      return new Response('Invalid password', {
        status: 401,
      });
    }

    const tokenData : TokenData = {
      id: user._id.toString(),
      name:user.name,
      email: user.email,
    };

    const signedTken = await jwt.sign(tokenData , process.env.TOKEN_SECRET! , {
      expiresIn: '1d',
    });

    const response = NextResponse.json({
      message:"Signed in succesfully",
      success:true
    });
    
    response.cookies.set("token" , signedTken , {
      httpOnly: true,
    });

    return response;


  } catch (error: any) {
    throw NextResponse.json({ error: error.mesage }, { status: 500 })
  }
}