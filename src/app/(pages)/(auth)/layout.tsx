import { Card, CardHeader } from "@/components/ui/card";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen lg:gap-10 flex-col items-center lg:pt-10 bg-gray-100">
      <Card className="m-4">
        <CardHeader className="text-center lg:text-2xl">
          Welcome yo yout Personal Transaction Visualizer
        </CardHeader>
      </Card>
      <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-lg m-2">
        {children}
      </div>
    </div>
  );
}