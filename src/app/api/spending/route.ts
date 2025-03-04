import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import TransactionModel from "@/models/transaction.model";

export async function GET() {
  await connectDB();
  
  // Get transactions for the last 3 months
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 2);

  const transactions = await TransactionModel.find({
    date: { $gte: threeMonthsAgo, $lte: now }
  });

  // Group transactions by month
  const monthlySpending: Record<string, number> = {};
  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toISOString().slice(0, 7); // "YYYY-MM"
    monthlySpending[month] = (monthlySpending[month] || 0) + transaction.amount;
  });

  return NextResponse.json(monthlySpending);
}
