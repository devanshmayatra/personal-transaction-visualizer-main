import { connectDB } from "@/lib/db";
import TransactionModel from "@/models/transaction.model";
import { NextResponse } from "next/server";

export async function GET (){
  try{
    await connectDB();
    const transactions = await TransactionModel.find();
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
};

export async function POST(req:Request){
  try{
    await connectDB();
    let body = await req.json(); // Parse request body

    const newTransaction = await TransactionModel.create(body);
    await newTransaction.save();

    return NextResponse.json(newTransaction, { status: 201 });

  } catch (error){
    console.error(error);
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500});
  }
}