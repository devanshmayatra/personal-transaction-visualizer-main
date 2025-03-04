import { NextRequest, NextResponse } from "next/server";
import { BudgetModel } from "@/models/budget.model";
import { connectDB } from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const url = new URL(req.url);
    const month = url.searchParams.get("month"); // Get month from query params
    if (!month) return NextResponse.json({ error: "Month is required" }, { status: 400 });

    const budgets = await BudgetModel.find({ month });
    return NextResponse.json(budgets, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch budgets" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { category, amount, month } = await req.json();
    console.log(category, amount, month)

    if (!category || !amount || !month) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const newBudget = await BudgetModel.create({ category, amount, month });
    await newBudget.save();

    return NextResponse.json(newBudget, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to set budget" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const { id, amount } = await req.json();

    if (!id || !amount) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    const updatedBudget = await BudgetModel.findByIdAndUpdate(id, { amount }, { new: true });

    return NextResponse.json(updatedBudget, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update budget" }, { status: 500 });
  }
}
