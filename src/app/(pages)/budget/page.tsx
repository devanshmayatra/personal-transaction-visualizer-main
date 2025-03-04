"use client"

import BudgetChart from '@/components/ui/BudgetChart'
import BudgetForm from '@/components/ui/BudgetForm'
import { Transaction } from '@/types/transaction'
import { Budget } from '@/types/budget'
import React, { useEffect, useState } from 'react'
import ShowBudget from '@/components/ui/ShowBudget'

const BudgetPage = () => {

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    ; (async () => {
      const month = new Date().toISOString().slice(0, 7);

      const transactionsRes = await fetch("/api/transactions");
      const transactionsData = await transactionsRes.json();
      setTransactions(transactionsData);

      const budgetsRes = await fetch(`/api/budgets?month=${month}`);
      const budgetsData = await budgetsRes.json();
      setBudgets(budgetsData);
    })();
  }, []);

  const categorySpending = transactions.reduce((acc, tx) => {
    acc[tx.category] = (acc[tx.category] || 0) + tx.amount;
    return acc;
  }, {} as Record<string, number>);

  const chartData = budgets.map((budget) => ({
    category: budget.category,
    budget: budget.amount,
    actual: categorySpending[budget.category] || 0,
  }));

  return (
    <div className='w-[90%] m-auto flex flex-col gap-5' >
      <div className='flex gap-4' >
      <BudgetForm onBudgetAdded={() => location.reload()} />
      <ShowBudget transactions={transactions} />
      </div>
      <BudgetChart data={chartData} />
    </div>
  )
}

export default BudgetPage;