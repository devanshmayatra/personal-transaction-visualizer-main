"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["Food", "Transport", "Shopping", "Entertainment", "Fashion", "Other"];

export default function BudgetForm({ onBudgetAdded }: { onBudgetAdded: () => void }) {
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category || !amount) {
      toast.error("Please enter all fields");
      return;
    }

    setLoading(true);
    try {
      const month = new Date().toISOString().slice(0, 7); // "YYYY-MM"
      console.log("MONTH:",month)
      await fetch("/api/budgets", {
        method: "POST",
        body: JSON.stringify({ category, amount, month }),
        headers: { "Content-Type": "application/json" },
      });

      toast.success("Budget added!");
      onBudgetAdded();
      setCategory("");
      setAmount("");
    } catch {
      toast.error("Failed to add budget");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded-lg shadow-md w-full">
      <Select onValueChange={setCategory}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="number"
        placeholder="Budget Amount"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? "Saving..." : "Set Budget"}
      </Button>
    </form>
  );
}
