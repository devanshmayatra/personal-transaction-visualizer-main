"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/ui/TransactionTable";
import { toast } from "sonner";
import TransactionForm from "@/components/ui/TransactionForm";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { MonthlyExpensesChart } from "@/components/ui/MonthlyExpensesChart";
import { useTransactions } from "@/app/fetcher/useTransactions";
import { Transaction } from "@/types/transaction";
import CategoryPieChart from "@/components/ui/CategoryPieChart";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions from API
  const fetchData = async () => {
    const data = await useTransactions();
    if (data) {
      setTransactions(data);
      setLoading(false);
    }
  }

  // Fetch transactions from API
  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex flex-col lg:flex-row " >
      <div className="p-6 w-1/2 h-screen">
        <MonthlyExpensesChart transactions={transactions} />
      </div>
      <div className="p-6 w-1/2 h-screen">
        <CategoryPieChart transactions={transactions}/>
      </div>
    </div>
  );
}
