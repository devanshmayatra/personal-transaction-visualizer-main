import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/db";
import TransactionModel from "@/models/transaction.model";
import { getDataFromToken } from "@/utils/getDataFromToken";

await connectDB();

export async function GET(req: NextRequest) {
  
  // Get transactions for the last 3 months
  const now = new Date();
  const threeMonthsAgo = new Date();
  threeMonthsAgo.setMonth(now.getMonth() - 2);

  const userID = await getDataFromToken(req);

  const transactions = await TransactionModel.find({
    date: { $gte: threeMonthsAgo, $lte: now },
    user: {$eq: userID}
  });

  // Group transactions by month
  const monthlySpending: Record<string, number> = {};
  transactions.forEach((transaction) => {
    const month = new Date(transaction.date).toISOString().slice(0, 7); // "YYYY-MM"
    monthlySpending[month] = (monthlySpending[month] || 0) + transaction.amount;
  });

  return NextResponse.json(monthlySpending);
}
