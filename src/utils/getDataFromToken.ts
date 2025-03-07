import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: string;
  iat?: number;
  exp?: number;
}

export const getDataFromToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value || "";

    if (!token) {
      throw new Error("Token not found in cookies");
    }

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not set in environment variables");
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET) as DecodedToken;
    return decodedToken.id!;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
    }
  }
};
