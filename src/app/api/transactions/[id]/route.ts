import { connectDB } from "@/lib/db";
import TransactionModel from "@/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest | Request , { params }: { params: { id: string, }, }) {
  try {
    await connectDB();

    const { id } = params;
    const body = await req.json();

    if (!body.amount || !body.date || !body.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const updatedTransaction = await TransactionModel.findByIdAndUpdate(id, body, { new: true });

    if (!updatedTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }

    return NextResponse.json(updatedTransaction, { status: 200 });
  } catch (error) {
    console.error("Error updating transaction:", error);
    return NextResponse.json({ error: "Failed to update transaction" }, { status: 500 });
  }
}

export async function DELETE(req:Request ,{ params }: { params: { id: string } }) {
  try {
    await connectDB();
    const { id } = params;
    const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
    if (!deletedTransaction) {
      return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Transaction deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    return NextResponse.json({ error: "Failed to delete transaction" }, { status: 500 });
  }
}