import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Transaction } from "@/types/transaction"; // Import your Transaction type

interface Data {
  transactions: Transaction[];
}

const CategoryPieChart = ({ transactions }: Data) => {
  // Group transactions by category
  const categoryTotals = transactions.reduce((acc: Record<string, number>, transaction) => {
    acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
    return acc;
  }, {});

  // Convert to array format for Recharts
  const pieChartData = Object.entries(categoryTotals).map(([category, total]) => ({
    name: category,
    value: total,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF6384"];

  return (
    <div className="flex flex-col items-center h-[90%]">
      <h2 className="text-lg font-bold mb-4">Category-wise Expenses</h2>
      {pieChartData.length > 0 ? (
        <PieChart width={500} height={500}>
          <Pie
            data={pieChartData}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {pieChartData.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <p>No transactions available.</p>
      )}
    </div>
  );
};

export default CategoryPieChart;
