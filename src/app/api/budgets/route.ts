import { NextRequest, NextResponse } from "next/server";
import { BudgetModel } from "@/models/budget.model";
import { connectDB } from "@/utils/db";
import { getDataFromToken } from "@/utils/getDataFromToken";
import { AccountUserModel } from "@/models/user.model";

connectDB();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const month = url.searchParams.get("month"); // Get month from query params
    if (!month) return NextResponse.json({ error: "Month is required" }, { status: 400 });

    const id = await getDataFromToken(req);

    const budgets = await BudgetModel.find({ month, user: id });
    return NextResponse.json(budgets, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { category, amount, month } = await req.json();
    console.log(category, amount, month)

    if (!category || !amount || !month) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const id = await getDataFromToken(req);

    const newBudget = await BudgetModel.create({ category, amount, month, user: id });
    await newBudget.save();
    const user = await AccountUserModel.findById(id);
    user.budgets.push(newBudget);
    await user.save();


    return NextResponse.json(newBudget, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to set budget" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, amount } = await req.json();

    if (!id || !amount) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const userID = await getDataFromToken(req);

    const updatedBudget = await BudgetModel.findByIdAndUpdate(id, { amount }, { user: { $eq: userID }, new: true });

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
  }
}
