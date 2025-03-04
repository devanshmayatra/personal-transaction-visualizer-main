"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Transaction } from "@/types/transaction";

export function EditTransaction({ transaction, fetchTransactions, disable }: { transaction: Transaction, fetchTransactions: () => void; disable: boolean }) {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({ ...transaction });
    const [loading, setLoading] = useState(false);

    const categories = ["Food", "Rent", "Entertainment", "Transport", "Fashion", "Others"];


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            console.log(transaction._id);
            const res = await fetch(`/api/transactions/${transaction._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast.success("Transaction updated successfully!");
                fetchTransactions();
                setOpen(false);
            } else {
                toast.error("Failed to update transaction.");
            }
        } catch {
            toast.error("Error updating transaction.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">Edit</Button>
            </DialogTrigger>
            <DialogContent className="p-6">

                <DialogTitle className="text-lg font-bold">Edit Transaction</DialogTitle>
                <Input name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount" />
                <Input name="date" type="date" value={formData.date.toString().split("T")[0]} onChange={handleChange} />
                <Input name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
                <select
                    name="category"
                    defaultValue={formData.category}
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
                <Button onClick={handleUpdate} className="mt-4">
                    {loading ? "Updating..." : "Save Changes"}
                </Button>
            </DialogContent>
        </Dialog>
    );
}
