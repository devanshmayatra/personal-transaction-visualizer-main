import { toast } from "sonner";

export const useTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      if (!res.ok) throw new Error("Failed to fetch transactions");
      const data = await res.json();
      return data
    } catch {
      toast.error("Error fetching transactions");
    }
  };