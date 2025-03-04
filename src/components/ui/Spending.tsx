"use client";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Transaction } from "@/types/transaction";

export default function SpendingInsights({ transactions }: { transactions: Transaction[] }) {
  const [monthlySpending, setMonthlySpending] = useState<Record<string, number>>({});
  const [biggestCategory, setBiggestCategory] = useState("");
  const [overspendingCategories, setOverspendingCategories] = useState<string[]>([]);
  
  useEffect(() => {
    // Fetch spending trends from API
    const fetchSpendingTrends = async () => {
      const res = await fetch("/api/spending");
      const data = await res.json();
      setMonthlySpending(data);
    };
    fetchSpendingTrends();

    // Calculate spending per category
    const categoryTotals = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {} as Record<string, number>);

    // Find the biggest spending category
    const maxCategory = Object.keys(categoryTotals).reduce((max, cat) =>
      categoryTotals[cat] > (categoryTotals[max] || 0) ? cat : max, "");

    setBiggestCategory(maxCategory);

    // Check for overspending categories
    const fetchBudgets = async () => {
      const month = new Date().toISOString().slice(0, 7);
      const res = await fetch(`/api/budgets?month=${month}`);
      const budgets = await res.json();

      const overBudget = budgets
        .filter((b:Transaction) => categoryTotals[b.category] > b.amount)
        .map((b:Transaction) => b.category);

      setOverspendingCategories(overBudget);
    };
    fetchBudgets();
  }, [transactions]);

  // Get last two months spending for trend analysis
  const months = Object.keys(monthlySpending).sort();
  const lastMonth = months[months.length - 1];
  const prevMonth = months[months.length - 2] || lastMonth;
  const trend = lastMonth && prevMonth
    ? ((monthlySpending[lastMonth] - monthlySpending[prevMonth]) / monthlySpending[prevMonth]) * 100
    : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p>
          Last Month Spending: <strong>₹{monthlySpending[lastMonth]?.toFixed(2) || 0}</strong>
        </p>
        <p>
          Trend: <strong className={trend > 0 ? "text-red-500" : "text-green-500"}>
            {trend.toFixed(2)}%
          </strong> {trend > 0 ? "increase" : "decrease"} from previous month
        </p>
        <p>Biggest Spending Category: <strong>{biggestCategory || "N/A"}</strong></p>
        {overspendingCategories.length > 0 && (
          <p className="text-red-500">Overspending in: {overspendingCategories.join(", ")}</p>
        )}
      </CardContent>
    </Card>
  );
}
