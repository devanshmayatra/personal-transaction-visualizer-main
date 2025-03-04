import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-5 m-5">
      <Card className="flex justify-center items-center p-7 h-75 w-150">
        <CardTitle className="text-3xl text-center">
          Welcome to Personal Transaction Visualizer
        </CardTitle>
      </Card>
      <Card className="flex justify-center items-center p-5 h-75 w-150">
        <CardTitle className="text-3xl">
          Track your Expenses
        </CardTitle>
      </Card>
      <Card className="flex justify-center items-center p-5 h-75 w-150">
        <CardTitle className="text-3xl text-center">
          Visualize them in the forms of charts
        </CardTitle>
      </Card>
      <Card className="flex justify-center items-center p-5 h-75 w-150">
        <CardTitle className="text-3xl">
          Categorize them
        </CardTitle>
      </Card>
    </div>
  )
}
