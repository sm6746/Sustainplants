import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { ConversionChart } from "@/components/dashboard/ConversionChart";
import { TrafficChart } from "@/components/dashboard/TrafficChart";
import { DataTable } from "@/components/dashboard/DataTable";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { DollarSign, Users, Target, TrendingUp } from "lucide-react";
import { metricsData } from "@/data/mockData";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentMetrics, setCurrentMetrics] = useState(metricsData);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.title === "Total Revenue" 
          ? `$${(Math.random() * 10000 + 40000).toFixed(0)}`
          : metric.title === "Active Users"
          ? `${(Math.random() * 1000 + 2000).toFixed(0)}`
          : metric.title === "Conversions"
          ? `${(Math.random() * 500 + 1000).toFixed(0)}`
          : `${(Math.random() * 20 + 10).toFixed(1)}%`,
        change: (Math.random() * 40 - 20)
      })));
    }, 5000);

    // Simulate initial loading
    setTimeout(() => setIsLoading(false), 1000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "DollarSign": return <DollarSign className="h-4 w-4 text-emerald-500" />;
      case "Users": return <Users className="h-4 w-4 text-blue-500" />;
      case "Target": return <Target className="h-4 w-4 text-orange-500" />;
      case "TrendingUp": return <TrendingUp className="h-4 w-4 text-purple-500" />;
      default: return <DollarSign className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="flex justify-between items-center">
            <div className="h-8 bg-muted rounded animate-pulse w-48"></div>
            <div className="h-8 bg-muted rounded animate-pulse w-12"></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-7">
            <div className="col-span-4 h-80 bg-muted rounded-lg animate-pulse"></div>
            <div className="col-span-3 h-80 bg-muted rounded-lg animate-pulse"></div>
          </div>
          <div className="h-96 bg-muted rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8 transition-all duration-300">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center">
          <DashboardHeader />
          <ThemeToggle />
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {currentMetrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={getIcon(metric.icon)}
              colorClass={metric.colorClass}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Charts Row 1 */}
        <div className="grid gap-4 md:grid-cols-7">
          <RevenueChart />
          <TrafficChart />
        </div>

        {/* Charts Row 2 */}
        <div className="grid gap-4 md:grid-cols-7">
          <ConversionChart />
        </div>

        {/* Data Table */}
        <div className="grid gap-4">
          <DataTable />
        </div>
      </div>
    </div>
  );
}