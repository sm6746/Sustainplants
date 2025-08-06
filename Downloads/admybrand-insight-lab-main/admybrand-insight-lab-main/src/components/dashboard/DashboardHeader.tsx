import { CalendarDays, Download, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardHeader() {
  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
          ADmyBRAND Insights
        </h1>
        <p className="text-muted-foreground">
          Analytics dashboard for digital marketing agencies
        </p>
      </div>
      
      <div className="flex items-center space-x-2">
        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse" />
          Live Data
        </Badge>
        
        <Button variant="outline" size="sm" className="border-border/50">
          <CalendarDays className="h-4 w-4 mr-2" />
          Last 30 days
        </Button>
        
        <Button variant="outline" size="sm" className="border-border/50">
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
        
        <Button variant="default" size="sm" className="bg-gradient-to-r from-primary to-purple-600 hover:opacity-90">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
}