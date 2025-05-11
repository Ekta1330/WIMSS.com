"use client";

import { PageHeader } from "@/components/layout/page-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from "recharts";
import { 
  DownloadCloud, 
  RefreshCw,
  Calendar,
  FileText,
  BarChart3,
  PieChart as PieChartIcon,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { monthlySalesData, revenueVsCostData } from "@/lib/data";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

// Colors for charts
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

// Mock data for pie chart
const salesDistributionData = [
  { name: "Premium Plan", value: 45 },
  { name: "Basic Plan", value: 30 },
  { name: "Enterprise Plan", value: 25 },
];

// Custom data for bar chart
const quarterlyData = [
  { quarter: "Q1", revenue: 15000, cost: 9000, profit: 6000 },
  { quarter: "Q2", revenue: 18000, cost: 10000, profit: 8000 },
  { quarter: "Q3", revenue: 21000, cost: 11500, profit: 9500 },
  { quarter: "Q4", revenue: 24000, cost: 12500, profit: 11500 },
];

export default function ReportsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("");
  
  const handleDownload = (reportType: string) => {
    setIsLoading(true);
    
    // Simulate download delay
    setTimeout(() => {
      setIsLoading(false);
      setDialogTitle(`${reportType} Download`);
      setDialogOpen(true);
    }, 1500);
  };

  return (
    <div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <p>Your report has been downloaded successfully!</p>
        </DialogContent>
      </Dialog>

      <PageHeader
        title="Reports"
        subtitle="Comprehensive business performance reports"
      />
      
      <Tabs defaultValue="overview" className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <TabsList>
            <TabsTrigger value="overview" className="gap-1">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="sales" className="gap-1">
              <TrendingUp className="h-4 w-4" />
              <span>Sales</span>
            </TabsTrigger>
            <TabsTrigger value="products" className="gap-1">
              <PieChartIcon className="h-4 w-4" />
              <span>Products</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="gap-1">
              <FileText className="h-4 w-4" />
              <span>Financial</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-1" />
              <span>Date Range</span>
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-1" />
              <span>Refresh</span>
            </Button>
          </div>
        </div>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Sales</CardTitle>
                <CardDescription>
                  Sales performance throughout the year
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlySalesData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)" 
                        }}
                        labelStyle={{ color: "hsl(var(--card-foreground))" }}
                      />
                      <Legend />
                      <Bar
                        dataKey="sales"
                        fill="hsl(var(--chart-1))"
                        name="Sales"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    className="gap-1"
                    onClick={() => handleDownload('Monthly Sales')}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <DownloadCloud className="h-4 w-4" />
                    )}
                    <span>Download Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Cost</CardTitle>
                <CardDescription>
                  Comparing revenue and cost over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={revenueVsCostData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)" 
                        }}
                        labelStyle={{ color: "hsl(var(--card-foreground))" }}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="hsl(var(--chart-1))"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                        name="Revenue"
                      />
                      <Line
                        type="monotone"
                        dataKey="cost"
                        stroke="hsl(var(--chart-2))"
                        strokeWidth={2}
                        name="Cost"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    className="gap-1"
                    onClick={() => handleDownload('Revenue vs Cost')}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <DownloadCloud className="h-4 w-4" />
                    )}
                    <span>Download Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Quarterly Performance</CardTitle>
                <CardDescription>
                  Revenue, cost, and profit by quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={quarterlyData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                      <XAxis dataKey="quarter" />
                      <YAxis />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)" 
                        }}
                        labelStyle={{ color: "hsl(var(--card-foreground))" }}
                      />
                      <Legend />
                      <Bar
                        dataKey="revenue"
                        fill="hsl(var(--chart-1))"
                        name="Revenue"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="cost"
                        fill="hsl(var(--chart-2))"
                        name="Cost"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="profit"
                        fill="hsl(var(--chart-3))"
                        name="Profit"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    className="gap-1"
                    onClick={() => handleDownload('Quarterly Performance')}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <DownloadCloud className="h-4 w-4" />
                    )}
                    <span>Download Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Sales Distribution</CardTitle>
                <CardDescription>
                  Distribution of sales by product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={salesDistributionData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        innerRadius={40}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {salesDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: "hsl(var(--card))", 
                          borderColor: "hsl(var(--border))",
                          borderRadius: "var(--radius)" 
                        }}
                        formatter={(value: number) => [`${value}%`, "Percentage"]}
                        labelStyle={{ color: "hsl(var(--card-foreground))" }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button 
                    className="gap-1"
                    onClick={() => handleDownload('Sales Distribution')}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <RefreshCw className="h-4 w-4 animate-spin" />
                    ) : (
                      <DownloadCloud className="h-4 w-4" />
                    )}
                    <span>Download Report</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <div className="text-center py-20 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">Sales Report</h3>
            <p className="text-muted-foreground mb-6">Detailed sales data and performance metrics</p>
            <Button 
              className="gap-1"
              onClick={() => handleDownload('Comprehensive Sales')}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <DownloadCloud className="h-4 w-4" />
              )}
              <span>Download Complete Report</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="text-center py-20 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">Product Report</h3>
            <p className="text-muted-foreground mb-6">Detailed product performance and inventory analysis</p>
            <Button 
              className="gap-1"
              onClick={() => handleDownload('Product Performance')}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <DownloadCloud className="h-4 w-4" />
              )}
              <span>Download Complete Report</span>
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="financial">
          <div className="text-center py-20 bg-muted rounded-lg">
            <h3 className="text-xl font-medium mb-2">Financial Report</h3>
            <p className="text-muted-foreground mb-6">Comprehensive financial statements and analysis</p>
            <Button 
              className="gap-1"
              onClick={() => handleDownload('Financial Statements')}
              disabled={isLoading}
            >
              {isLoading ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <DownloadCloud className="h-4 w-4" />
              )}
              <span>Download Complete Report</span>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
      
      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
          <CardDescription>
            Download comprehensive reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="bg-card/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Sales Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Complete overview of sales performance
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload('Sales Summary')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <DownloadCloud className="h-4 w-4 mr-1" />
                  )}
                  <span>Download</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Financial Statement</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Profit & loss, balance sheet, cash flow
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload('Financial Statement')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <DownloadCloud className="h-4 w-4 mr-1" />
                  )}
                  <span>Download</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Inventory Report</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Current stock levels and valuation
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload('Inventory Report')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <DownloadCloud className="h-4 w-4 mr-1" />
                  )}
                  <span>Download</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Customer Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Customer behavior and purchase patterns
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload('Customer Analytics')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <DownloadCloud className="h-4 w-4 mr-1" />
                  )}
                  <span>Download</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Salesperson Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Sales performance by salesperson
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload('Salesperson Performance')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <DownloadCloud className="h-4 w-4 mr-1" />
                  )}
                  <span>Download</span>
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50 hover:bg-card/70 transition-colors cursor-pointer">
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Tax Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Tax collected and paid for reporting
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => handleDownload('Tax Summary')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                  ) : (
                    <DownloadCloud className="h-4 w-4 mr-1" />
                  )}
                  <span>Download</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}