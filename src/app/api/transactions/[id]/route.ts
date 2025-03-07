import { connectDB } from "@/utils/db";
import TransactionModel from "@/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";

connectDB();

export async function PUT(req: NextRequest) {
  try {

    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();
    const body = await req.json();

    const userID = await getDataFromToken(req) || "";

    if (!body.amount || !body.date || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(id, body, { user: { $eq: userID }, new: true });

    if (!updatedTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {

    // Extract ID from the request URL
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const userID = await getDataFromToken(req) || "";

    if (!id) {
      return NextResponse.json({ error: "Transaction ID is required" }, { status: 400 });
    }

    const deletedTransaction = await TransactionModel.findByIdAndDelete(id, { user: { $eq: userID } });

    if (!deletedTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Transaction deleted successfully" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}