import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = async (req: NextRequest) => {
  try {
    const token = req.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Token not found in cookies");
    }

    if (!process.env.TOKEN_SECRET) {
      throw new Error("TOKEN_SECRET is not set in environment variables");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET);
    return decodedToken.id;
  } catch (error: any) {
    console.error("JWT Verification Error:", error.message);
    throw new Error("Invalid or expired token");
  }
};
