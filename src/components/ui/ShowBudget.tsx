"use client";
import { useState, useEffect } from "react";
import { Transaction } from "@/types/transaction";
import { Budget } from "@/types/budget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetOverview({ transactions }: { transactions: Transaction[] }) {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    ; (async () => {
      const month = new Date().toISOString().slice(0, 7);
      const res = await fetch(`/api/budgets?month=${month}`);
      const data = await res.json();
      console.log(data)
      setBudgets(data);
    })();
  }, []);

  const categorySpending = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Card className="lg:w-100" >
      <CardHeader>
        <CardTitle>Budget vs Actual Spending</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {budgets.map((budget) => (
            <li key={budget.category} className="flex justify-between text-sm">
              <span>{budget.category}</span>
              <span className="font-medium">
                ₹{categorySpending[budget.category] || 0} / ₹{budget.amount}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
