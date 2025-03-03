import { useState } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TransactionForm({onTransactionAdded}:{onTransactionAdded:()=> void}){

  //data states
  const [description , setDescription] = useState("");
  const [amount , setAmount] = useState("");
  const [date , setDate] = useState("");

  //loading state
  const [loading , setLoading] = useState(false);

  //handle submit function
  const handleSubmit = async (e:React.FormEvent)=>{
    e.preventDefault();

    if(!description || !amount || !date){
      toast.error("All fields are required!");
      return;
    }

    const transaction = {
      description,
      amount:parseFloat(amount),
      date
    }

    try{
      setLoading(true);
      const res = await fetch("/api/transactions", {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(transaction)
      });

      if(!res.ok){
        throw new Error("Failed to add New Trasaction");
      }

      toast.success("Transaction added succesfully");
      setDescription("");
      setAmount("");
      setDate("");
      onTransactionAdded();

    } catch{
      toast.error("Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return(
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-lg w-1/2">
      <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
      <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <Button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Transaction"}
      </Button>
    </form>
  );
}