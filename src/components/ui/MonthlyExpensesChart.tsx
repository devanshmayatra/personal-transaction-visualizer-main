import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

interface Transaction {
  amount:number,
  date:string
}

const processData = (transactions:Transaction[]) => {
  const monthlyTotals : Record<string , number> = {};

  transactions.forEach(({amount , date})=>{
    const month = new Date(date).toLocaleString("en-US",{month:"short" , year:"numeric"});

    if(!monthlyTotals[month]){
      monthlyTotals[month] = 0;
    }

    monthlyTotals[month ] += amount;
  });

  return Object.keys(monthlyTotals).map((month)=>({
    month ,
    total : monthlyTotals[month]
  }));
};

export const MonthlyExpensesChart = ({transactions}:{
  transactions:Transaction[]
}) => {
  const chartData = processData(transactions);

  return(
    <div className="bg-white p-4 rounded-lg shadow lg:w-1/2" >
      <h2 className="text-lg font-semibold mb-3" >Monthly Expenses Chart</h2>
      <ResponsiveContainer width="100%" height={200} >
        <BarChart data={chartData} >
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="total" fill="#4F46E5"/>
        </BarChart>
      </ResponsiveContainer >
    </div>
  );
}