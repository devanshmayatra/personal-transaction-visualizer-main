import { Card, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-wrap gap-4 m-5">
      <Card className="flex h-30 w-full justify-center items-center p-7 lg:h-75 lg:w-[calc(50%-20px)]">
        <CardTitle className="text-xl text-center">
          Welcome to Personal Transaction Visualizer
        </CardTitle>
      </Card>
      <Card className="flex h-30 w-full justify-center items-center p-5 lg:h-75 lg:w-[calc(50%-20px)]">
        <CardTitle className="text-xl">
          Track your Expenses
        </CardTitle>
      </Card>
      <Card className="flex h-30 w-full justify-center items-center p-5 lg:h-75 lg:w-[calc(50%-20px)]">
        <CardTitle className="text-xl text-center">
          Visualize them in the forms of charts
        </CardTitle>
      </Card>
      <Card className="flex h-30 w-full justify-center items-center p-5 lg:h-75 lg:w-[calc(50%-20px)]">
        <CardTitle className="text-xl">
          Categorize them
        </CardTitle>
      </Card>
    </div>
  )
}
