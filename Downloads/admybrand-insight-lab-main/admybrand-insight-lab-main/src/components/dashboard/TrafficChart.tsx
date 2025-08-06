import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Download, Calendar } from "lucide-react";
import { trafficChartData } from "@/data/mockData";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))", 
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))"
];

export function TrafficChart() {
  const [data, setData] = useState(trafficChartData.map((item, index) => ({
    ...item,
    color: colors[index % colors.length]
  })));
  const [isLoading, setIsLoading] = useState(false);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => ({
        ...item,
        users: item.users + (Math.random() - 0.5) * 100
      })));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const total = data.reduce((sum, entry) => sum + entry.users, 0);

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Channel,Users,Percentage\n"
      + data.map(item => `${item.channel},${item.users},${((item.users / total) * 100).toFixed(1)}%`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "traffic_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setData(trafficChartData.map((item, index) => ({
        ...item,
        color: colors[index % colors.length]
      })));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Card className="col-span-3 border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle className="text-foreground">Traffic Sources</CardTitle>
            <CardDescription className="text-muted-foreground">
              Website traffic breakdown by source with live updates
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="hover:bg-muted/50"
            >
              <Calendar className="h-4 w-4 mr-2" />
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="hover:bg-muted/50"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={2}
              dataKey="users"
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--card-foreground))",
                fontSize: "14px",
                fontWeight: "500"
              }}
              itemStyle={{
                color: "hsl(var(--card-foreground))",
                fontWeight: "600"
              }}
              formatter={(value: number) => [
                `${value.toLocaleString()} (${((value / total) * 100).toFixed(1)}%)`,
                'Visitors'
              ]}
              labelStyle={{
                color: "hsl(var(--card-foreground))",
                fontWeight: "600"
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        
        <div className="mt-4 space-y-2">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center justify-between text-sm hover:bg-muted/20 p-2 rounded transition-colors">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-foreground">{entry.channel}</span>
              </div>
              <span className="font-medium text-foreground">
                {((entry.users / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}