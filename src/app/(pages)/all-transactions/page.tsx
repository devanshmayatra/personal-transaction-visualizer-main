"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/ui/TransactionTable";
import TransactionForm from "@/components/ui/TransactionForm";
import { Transaction } from "@/types/transaction";
import { toast } from "sonner";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);


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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Transactions</h1>
      <div className="my-5">
        <TransactionForm onTransactionAdded={fetchData} />
      </div>
      <Card className="p-4">
        <TransactionTable transactions={transactions} change={true} loading={loading} fetchTransactions={fetchData} setLoading={setLoading} />
      </Card>
    </div>
  );
}
