import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CategoryTotals } from "@/types/category_total";

interface SummaryCardProps {
  title: string,
  value: string | number,
  categoryTotals: CategoryTotals[]
}

export const SummaryCard = ({ title, value, categoryTotals }: SummaryCardProps) => {
  return (
    <Card className="lg:w-1/2" >
      <CardHeader>
        <CardTitle className=" text-xl lg:text-2xl" >{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex  flex-col flex-wrap" >
        {
          categoryTotals.length > 0 ? categoryTotals.map((total) => (
            <div key={total.category} className="flex gap-2" >
              <div className=" text-sm lg:text-lg" key={total.category}>{total.category}</div>
              <div className=" text-sm lg:text-lg"> - </div>
              <div className=" text-sm lg:text-lg">₹ {total.total}</div>
            </div>
          )) : <div className="text-xl lg:text-3xl" >{value}</div>
        }
      </CardContent>
    </Card>
  );
}