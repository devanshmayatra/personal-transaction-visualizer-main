"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function BudgetChart({ data }: { data: { category: string; budget: number; actual: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Actual Chart</CardTitle>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="actual" fill="#8884d8" name="Actual" />
            <Bar dataKey="budget" fill="#82ca9d" name="Budget" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
