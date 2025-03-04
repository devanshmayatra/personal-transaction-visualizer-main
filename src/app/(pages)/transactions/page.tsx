"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import TransactionTable from "@/components/ui/TransactionTable";
import { SummaryCard } from "@/components/ui/SummaryCard";
import { useTransactions } from "@/app/fetcher/useTransactions";
import { Transaction } from "@/types/transaction";
import { CategoryTotals } from "@/types/category_total";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const categories = ["Food", "Rent", "Entertainment", "Transport", "Fashion", "Others"];

  const categoryTotals: CategoryTotals[] = categories.map((category) => ({ category, total:
    0 }));

    transactions.forEach(
      (transaction) => {
        const categoryIndex = categories.indexOf(transaction.category);
        categoryTotals[categoryIndex].total += transaction.amount;
        console.log(categoryTotals[4]);
      }
    )

  // Fetch transactions from API
  const FetchData = async () => {
      const data = await useTransactions();
      if(data){
        setTransactions(data);
        setLoading(false);
      }
    }
  
    // Fetch transactions from API
    useEffect(() => {
      FetchData();
    }, [])

  // Calculate total expenses
  const totalExpenses = transactions.reduce((acc, txn) => acc + txn.amount, 0);

  // Get most recent transaction
  const mostRecentTransaction = transactions.length
    ? `${transactions[0].description} - ₹ ${ transactions[0].amount}`
    : "No transactions";


    const newTransactions=[];
    for(let i = 0 ; i < 5 ; i++){
      newTransactions[i] = transactions[i];
    }

    const recentTransactions : Transaction[] = transactions.length > 5 ? newTransactions : transactions;  

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Transactions</h1>
      <div className="grid grid-cols-2 gap-4 my-5">
        <SummaryCard title="Total Expenses" value={`₹${totalExpenses}`} categoryTotals={[]}/>
        <SummaryCard title="Category Wise Summary" value={mostRecentTransaction} categoryTotals={categoryTotals}/>
      </div>

      <Card className="py-5">
        <TransactionTable transactions={recentTransactions} change={false} loading={loading} fetchTransactions={FetchData} setLoading={setLoading} />
      </Card>
    </div>
  );
}
