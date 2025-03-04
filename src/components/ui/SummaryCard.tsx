import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryTotals } from "@/types/category_total";

interface SummaryCardProps {
  title: string,
  value: string | number,
  categoryTotals: CategoryTotals[]
}

export const SummaryCard = ({ title, value, categoryTotals }: SummaryCardProps) => {
  return (
    <Card className="w-full" >
      <CardHeader>
        <CardTitle className="text-2xl" >{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {
          categoryTotals.length > 0 ? categoryTotals.map((total) => (
            <div key={total.category} className="flex gap-2" >
              <div className="text-lg" key={total.category}>{total.category}</div>
              <div className="text-lg"> - </div>
              <div className="text-lg">₹ {total.total}</div>
            </div>
          )) : <div className="text-4xl" >{value}</div>
        }
      </CardContent>
    </Card>
  );
}