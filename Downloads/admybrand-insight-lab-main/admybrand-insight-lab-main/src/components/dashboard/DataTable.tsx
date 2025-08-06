import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Download, Filter } from "lucide-react";
import { tableData } from "@/data/mockData";

// Enhanced table data with more realistic campaign data
const campaigns = [
  {
    id: "1",
    name: "Summer Sale 2024",
    channel: "Google Ads",
    status: "Active",
    budget: 5000,
    spent: 3240,
    conversions: 156,
    ctr: 3.2,
    cpa: 20.77,
    date: "2024-06-01"
  },
  {
    id: "2",
    name: "Brand Awareness Q3",
    channel: "Facebook",
    status: "Active",
    budget: 3000,
    spent: 2800,
    conversions: 89,
    ctr: 2.8,
    cpa: 31.46,
    date: "2024-06-02"
  },
  {
    id: "3",
    name: "Product Launch",
    channel: "Instagram",
    status: "Paused",
    budget: 8000,
    spent: 4500,
    conversions: 203,
    ctr: 4.1,
    cpa: 22.17,
    date: "2024-06-03"
  },
  {
    id: "4",
    name: "Holiday Campaign",
    channel: "LinkedIn",
    status: "Draft",
    budget: 2500,
    spent: 0,
    conversions: 0,
    ctr: 0,
    cpa: 0,
    date: "2024-06-04"
  },
  {
    id: "5",
    name: "Email Newsletter",
    channel: "Email",
    status: "Active",
    budget: 1000,
    spent: 850,
    conversions: 124,
    ctr: 5.7,
    cpa: 6.85,
    date: "2024-06-05"
  },
  {
    id: "6",
    name: "YouTube Brand Campaign",
    channel: "YouTube",
    status: "Active",
    budget: 4000,
    spent: 3200,
    conversions: 98,
    ctr: 2.4,
    cpa: 32.65,
    date: "2024-06-06"
  },
  {
    id: "7",
    name: "Twitter Engagement",
    channel: "Twitter",
    status: "Active",
    budget: 1500,
    spent: 1200,
    conversions: 45,
    ctr: 1.8,
    cpa: 26.67,
    date: "2024-06-07"
  },
  {
    id: "8",
    name: "TikTok Viral Campaign",
    channel: "TikTok",
    status: "Active",
    budget: 6000,
    spent: 4800,
    conversions: 234,
    ctr: 5.2,
    cpa: 20.51,
    date: "2024-06-08"
  }
];

type SortField = 'name' | 'budget' | 'spent' | 'conversions' | 'ctr' | 'cpa' | 'channel' | 'status';
type SortDirection = 'asc' | 'desc' | null;

export function DataTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [channelFilter, setChannelFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? null : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
    
    if (sortDirection === 'desc' && sortField === field) {
      setSortField(null);
    } else if (sortDirection !== 'desc' || sortField !== field) {
      setSortField(field);
    }
  };

  const filteredCampaigns = campaigns
    .filter(campaign => {
      const matchesSearch = 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.channel.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
      const matchesChannel = channelFilter === "all" || campaign.channel === channelFilter;
      
      return matchesSearch && matchesStatus && matchesChannel;
    })
    .sort((a, b) => {
      if (!sortField || !sortDirection) return 0;
      
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const totalPages = Math.ceil(filteredCampaigns.length / itemsPerPage);
  const paginatedCampaigns = filteredCampaigns.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Campaign Name,Channel,Status,Budget,Spent,Conversions,CTR,CPA\n"
      + filteredCampaigns.map(campaign => 
        `${campaign.name},${campaign.channel},${campaign.status},${campaign.budget},${campaign.spent},${campaign.conversions},${campaign.ctr},${campaign.cpa}`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "campaign_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4" />;
    if (sortDirection === 'asc') return <ArrowUp className="w-4 h-4" />;
    if (sortDirection === 'desc') return <ArrowDown className="w-4 h-4" />;
    return <ArrowUpDown className="w-4 h-4" />;
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      'Active': 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
      'Paused': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      'Draft': 'bg-gray-500/10 text-gray-500 border-gray-500/20'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.Draft}>
        {status}
      </Badge>
    );
  };

  return (
    <Card className="col-span-4 border-border/50 bg-card/50 backdrop-blur-sm shadow-card hover:shadow-elevated transition-all duration-300">
      <CardHeader>
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <CardTitle className="text-foreground">Campaign Performance</CardTitle>
            <CardDescription className="text-muted-foreground">
              Track and manage your marketing campaigns with advanced filtering
            </CardDescription>
          </div>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-y-0 md:space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full md:w-48 bg-background/50 border-border/50"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-32 bg-background/50 border-border/50">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-full md:w-32 bg-background/50 border-border/50">
                <SelectValue placeholder="Channel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Channels</SelectItem>
                <SelectItem value="Google Ads">Google Ads</SelectItem>
                <SelectItem value="Facebook">Facebook</SelectItem>
                <SelectItem value="Instagram">Instagram</SelectItem>
                <SelectItem value="LinkedIn">LinkedIn</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="YouTube">YouTube</SelectItem>
                <SelectItem value="Twitter">Twitter</SelectItem>
                <SelectItem value="TikTok">TikTok</SelectItem>
              </SelectContent>
            </Select>
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
        <div className="rounded-md border border-border/50 overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    Campaign Name
                    {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('budget')}
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    Budget
                    {getSortIcon('budget')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('spent')}
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    Spent
                    {getSortIcon('spent')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('conversions')}
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    Conversions
                    {getSortIcon('conversions')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('ctr')}
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    CTR %
                    {getSortIcon('ctr')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('cpa')}
                    className="h-auto p-0 font-semibold text-left justify-start hover:bg-transparent"
                  >
                    CPA
                    {getSortIcon('cpa')}
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCampaigns.map((campaign) => (
                <TableRow key={campaign.id} className="hover:bg-muted/20 transition-colors">
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.channel}</TableCell>
                  <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                  <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                  <TableCell>${campaign.spent.toLocaleString()}</TableCell>
                  <TableCell>{campaign.conversions}</TableCell>
                  <TableCell>{campaign.ctr.toFixed(1)}%</TableCell>
                  <TableCell>${campaign.cpa.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCampaigns.length)} of {filteredCampaigns.length} campaigns
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="hover:bg-muted/50"
              >
                Previous
              </Button>
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0 hover:bg-muted/50"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="hover:bg-muted/50"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}