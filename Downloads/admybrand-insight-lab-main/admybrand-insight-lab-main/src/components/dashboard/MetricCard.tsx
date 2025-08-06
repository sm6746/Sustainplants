import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  colorClass: string;
  delay?: number;
}

export function MetricCard({ title, value, change, icon, colorClass, delay = 0 }: MetricCardProps) {
  const isPositive = change >= 0;
  
  return (
    <Card 
      className="relative overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all duration-300 group animate-in slide-in-from-bottom-4 fade-in-0"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${colorClass} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClass} bg-opacity-20 group-hover:scale-110 transition-transform duration-200`}>
          {icon}
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1 group-hover:scale-105 transition-transform duration-200">
          {value}
        </div>
        <div className="flex items-center space-x-1">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-emerald-500 animate-pulse" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500 animate-pulse" />
          )}
          <span className={`text-sm font-medium ${
            isPositive ? 'text-emerald-500' : 'text-red-500'
          }`}>
            {isPositive ? '+' : ''}{change.toFixed(1)}%
          </span>
          <span className="text-sm text-muted-foreground">from last month</span>
        </div>
      </CardContent>
    </Card>
  );
}