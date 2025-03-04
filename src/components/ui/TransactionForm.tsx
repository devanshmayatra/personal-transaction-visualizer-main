import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionForm({ onTransactionAdded }: { onTransactionAdded: () => void }) {

  const categories = ["Food", "Rent", "Entertainment", "Transport", "Fashion", "Others"];

  //data state
  const [formData, setFormData] = useState({ date: "", description: "", amount: "", category: "Select Category" });

  //loading state
  const [loading, setLoading] = useState(false);

  //handle submit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.date || !formData.category) {
      toast.error("All fields are required!");
      return;
    }

    const transaction = {
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: formData.date,
      category: formData.category
    }

    try {
      setLoading(true);
      const res = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(transaction)
      });

      if (!res.ok) {
        throw new Error("Failed to add New Trasaction");
      }

      toast.success("Transaction added succesfully");
      setFormData({ date: "", description: "", amount: "", category: categories[0] });
      onTransactionAdded();

    } catch {
      toast.error("Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg lg:w-1/2">
      <Input
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, description: e.target.value }))}
      />
      <Input
        type="number"
        placeholder="Amount"
        value={formData.amount} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, amount: e.target.value }))}
      />
      <Input
        placeholder="Date"
        type="date"
        value={formData.date} onChange={(e) => setFormData((prevFormData) => ({ ...prevFormData, date: e.target.value }))}
      />
      <select
        name="category"
        defaultValue=""
        onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
        className="w-full p-2 border rounded"
      >
        <option value="" disabled>Select a category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}