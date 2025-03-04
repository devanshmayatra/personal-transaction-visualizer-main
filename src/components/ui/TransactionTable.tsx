import { Skeleton } from "@/components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dispatch, SetStateAction } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { EditTransaction } from "./EditTrancaction";
import { Transaction } from "@/types/transaction";

export default function TransactionTable({
  transactions,
  loading,
  fetchTransactions,
  setLoading,
  change
}: {
  transactions: Transaction[]; loading: boolean;
  fetchTransactions: () => Promise<void>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  change: boolean
}) {

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
          <TableHead>Category</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead className={`space-x-2 ${!change && `hidden`}`}>Edit</TableHead>
          <TableHead className={`space-x-2 ${!change && `hidden`}`}>Delete</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              <TableCell>{transaction.description}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell className="font-medium">₹{transaction.amount.toFixed(2)}</TableCell>
              <TableCell className={`space-x-2 ${!change && `hidden`}`}>
                <EditTransaction transaction={transaction} fetchTransactions={fetchTransactions} />
              </TableCell>
              <TableCell className={`space-x-2 ${!change && `hidden`}`}>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(transaction._id)}
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
