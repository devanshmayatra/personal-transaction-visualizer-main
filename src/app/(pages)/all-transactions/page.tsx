"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/ui/TransactionTable";
import TransactionForm from "@/components/ui/TransactionForm";
import { useTransactions } from "@/app/fetcher/useTransactions";
import { Transaction } from "@/types/transaction";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const data = await useTransactions();
    if(data){
      setTransactions(data);
      setLoading(false);
    }
  }

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
