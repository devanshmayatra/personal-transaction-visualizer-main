import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SummaryCardProps {
  title: string,
  value: string | number
}

export const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <Card className="w-full" >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-l font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}