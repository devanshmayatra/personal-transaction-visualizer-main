import { connectDB } from "@/utils/db";
import { AccountUserModel } from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from "bcryptjs";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    connectDB();
    const body = await req.json();
    const { name, email, password } = await body;

    const user = await AccountUserModel.findOne({ email: email });

    if (user) {
      return NextResponse.json({ message: "User already exists"} , {
        status: 400
      });
    }

    //validation

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new AccountUserModel({
      name: name,
      email: email,
      password: hashedPassword
    });

    const savedUser = await newUser.save();

    //send verification mail
    // await sendMail({ email, emailType: "VERIFY", userId: savedUser._id })

    return NextResponse.json({
      message: "User created successfully",
      success:true,
      status:200,
      user: savedUser,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}