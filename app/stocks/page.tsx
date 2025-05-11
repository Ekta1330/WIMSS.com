"use client";

import { PageHeader } from "@/components/layout/page-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { stockItems } from "@/lib/data";
import { useState } from "react";
import { StockItem } from "@/lib/types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend 
} from "recharts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

// Prepare data for the pie chart
const prepareChartData = (items: StockItem[]) => {
  const categoryData = items.reduce<Record<string, number>>((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = 0;
    }
    acc[item.category] += item.quantity;
    return acc;
  }, {});
  
  return Object.entries(categoryData).map(([name, value]) => ({ name, value }));
};

export default function StocksPage() {
  const [items, setItems] = useState<StockItem[]>(stockItems);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredItems = items.filter((item) => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const chartData = prepareChartData(items);
  
  // Calculate total stock
  const totalStock = items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Get low stock items
  const lowStockItems = items.filter(item => item.status === 'low-stock').length;
  
  // Get out of stock items
  const outOfStockItems = items.filter(item => item.status === 'out-of-stock').length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">In Stock</Badge>;
      case 'low-stock':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Low Stock</Badge>;
      case 'out-of-stock':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <PageHeader
        title="Stock Management"
        subtitle="Monitor and manage your inventory"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStock.toLocaleString()} units</div>
            <p className="text-xs text-muted-foreground mt-1">
              Across {items.length} products
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockItems}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Need attention soon
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockItems}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Require immediate reordering
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
              <div>
                <CardTitle>Inventory Items</CardTitle>
                <CardDescription>
                  Current stock levels and status
                </CardDescription>
              </div>
              <div className="w-full md:w-64">
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{getStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastUpdated}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Stock by Category</CardTitle>
            <CardDescription>
              Distribution of inventory by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)" 
                    }}
                    formatter={(value: number) => [`${value} units`, "Quantity"]}
                    labelStyle={{ color: "hsl(var(--card-foreground))" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Items</CardTitle>
            <CardDescription>
              Items that need attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            {items.filter(item => item.status === 'low-stock' || item.status === 'out-of-stock').length > 0 ? (
              <div className="space-y-4">
                {items
                  .filter(item => item.status === 'low-stock' || item.status === 'out-of-stock')
                  .map(item => (
                    <div 
                      key={item.id} 
                      className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                    >
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium">
                          {item.quantity} units
                        </span>
                        {getStatusBadge(item.status)}
                      </div>
                    </div>
                  ))}
                <Button className="w-full mt-4">Order More Stock</Button>
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No low stock items at the moment
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Recently Updated</CardTitle>
            <CardDescription>
              Items with recent stock changes
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...items]
                .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime())
                .slice(0, 5)
                .map(item => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        Updated on {item.lastUpdated}
                      </p>
                    </div>
                    <div className="text-sm font-medium">
                      {item.quantity} units
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}