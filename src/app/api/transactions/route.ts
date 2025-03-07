import { connectDB } from "@/utils/db";
import TransactionModel from "@/models/transaction.model";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { AccountUserModel } from "@/models/user.model";

connectDB();

export async function GET (req:NextRequest){
  try{
    const id = await getDataFromToken(req);
    const transactions = await TransactionModel.find({user:id}).sort({ date: -1 });
    return NextResponse.json(transactions, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
};

export async function POST(req:NextRequest){
  try{
    const {description , amount , date , category} = await req.json(); // Parse request body

    const id = await getDataFromToken(req);

    const data = {
      description,
      amount,
      date ,
      category ,
      user:id
    }

    const user = await AccountUserModel.findById(id);
    const newTransaction = await TransactionModel.create(data);
    await newTransaction.save();

    user.transactions.push(newTransaction._id);
    await user.save();
    return NextResponse.json(newTransaction, { status: 201 });

  } catch (error){
    return NextResponse.json({ error: "Failed to create transaction" }, { status: 500});
  }
}