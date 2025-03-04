"use client";

import { useState, useEffect } from "react";
import { MonthlyExpensesChart } from "@/components/ui/MonthlyExpensesChart";
import { Transaction } from "@/types/transaction";
import CategoryPieChart from "@/components/ui/CategoryPieChart";
import { toast } from "sonner";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      setTransactions(data);
    } catch {
      toast.error("Error fetching transactions");
    }
  };

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
