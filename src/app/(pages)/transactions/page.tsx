"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/ui/TransactionTable";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { Transaction } from "@/types/transaction";
import { CategoryTotals } from "@/types/category_total";
import { toast } from "sonner";
import ShowBudget from "@/components/ui/ShowBudget";
import SpendingInsights from "@/components/ui/Spending";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Food", "Rent", "Entertainment", "Transport", "Fashion", "Others"];

  const categoryTotals: CategoryTotals[] = categories.map((category) => ({
    category, total:
      0
  }));

  transactions.forEach(
    (transaction) => {
      const categoryIndex = categories.indexOf(transaction.category);
      categoryTotals[categoryIndex].total += transaction.amount;
      console.log(categoryTotals[4]);
    }
  )

  // Fetch transactions from API
  const fetchData = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch {
      toast.error("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  // Fetch transactions from API
  useEffect(() => {
    fetchData();
  }, [])


  // Calculate total expenses
  const totalExpenses = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  // Get most recent transaction
  const mostRecentTransaction = transactions.length
    ? `${transactions[0].description} - ₹ ${transactions[0].amount}`
    : "No transactions";


  const newTransactions = [];
  for (let i = 0; i < 5; i++) {
    newTransactions[i] = transactions[i];
  }

  const recentTransactions: Transaction[] = transactions.length > 5 ? newTransactions : transactions;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Transactions</h1>
      <div className="flex flex-col gap-x-4 my-5 lg:flex-row">
        <SummaryCard title="Total Expenses" value={`₹${totalExpenses}`} categoryTotals={[]} />
        <SummaryCard title="Category Wise Summary" value={mostRecentTransaction} categoryTotals={categoryTotals} />
        <ShowBudget transactions={transactions} />
        <SpendingInsights transactions={transactions} />
      </div>

      <Card className="py-5 my-5">
        <TransactionTable transactions={recentTransactions} change={false} loading={loading} fetchTransactions={fetchData} setLoading={setLoading} />
      </Card>
    </div>
  );
}
