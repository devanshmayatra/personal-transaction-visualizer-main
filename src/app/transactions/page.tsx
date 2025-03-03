"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/ui/TransactionTable";
import { toast } from "sonner"; // ✅ Import Sonner toast
import TransactionForm from "@/components/ui/TransactionForm";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { MonthlyExpensesChart } from "@/components/ui/MonthlyExpensesChart";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from API
  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (error) {
      toast.error("Error fetching transactions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [])

  // Calculate total expenses
  const totalExpenses = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  // Get most recent transaction
  const recentTransaction = transactions.length
    ? transactions[transactions.length - 1].description
    : "No transactions";


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Transactions</h1>
      <div className="grid grid-cols-2 gap-4">
        <SummaryCard title="Total Expenses" value={`₹${totalExpenses}`} />
        <SummaryCard title="Recent Transaction" value={recentTransaction} />
      </div>

      <div className="my-5 flex gap-4">
        <TransactionForm onTransactionAdded={fetchTransactions} />
        <MonthlyExpensesChart transactions={transactions} />
      </div>

      <Card className="p-4">
        <TransactionTable transactions={transactions} loading={loading} />
      </Card>
    </div>
  );
}
