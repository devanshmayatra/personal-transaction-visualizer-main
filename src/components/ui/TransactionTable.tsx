import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EditTransaction } from "./EditTrancaction";

interface Transaction {
  _id: string;
  description: string;
  amount: number;
  date: string;
}

export default function TransactionTable({ transactions, loading, fetchTransactions, setLoading }: { transactions: Transaction[]; loading: boolean; fetchTransactions: () => Promise<void>; setLoading: Dispatch<SetStateAction<boolean>> }) {

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/transactions/${id}`, { method: "DELETE" });

      if (res.ok) {
        toast.success("Transaction deleted successfully!");
        fetchTransactions(); // Refresh the list
      } else {
        toast.error("Failed to delete transaction.");
      }
    } catch {
      toast.error("Error deleting transaction.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((tx) => (
            <TableRow key={tx._id}>
              <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell className="font-medium">₹{tx.amount.toFixed(2)}</TableCell>
              <TableCell className="space-x-2">
                <EditTransaction transaction={tx} fetchTransactions={fetchTransactions} />
              </TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(tx._id)}
                  disabled={loading}
                >
                  {loading ? "Delete..." : "Delete"}
                </Button>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No transactions found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
