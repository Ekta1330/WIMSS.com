"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { salesData } from "@/lib/data";
import { SalesData } from "@/lib/types";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  CartesianGrid, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { monthlySalesData } from "@/lib/data";

// Form schema for new sales
const formSchema = z.object({
  date: z.string().min(1, {
    message: "Date is required.",
  }),
  salesman: z.string().min(2, {
    message: "Salesman name must be at least 2 characters.",
  }),
  product: z.string().min(2, {
    message: "Product name must be at least 2 characters.",
  }),
  quantity: z.string().min(1, {
    message: "Quantity is required.",
  }),
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
});

// Mock data for the pie chart
const salesByProductData = [
  { name: "Premium Plan", value: 45 },
  { name: "Basic Plan", value: 30 },
  { name: "Enterprise Plan", value: 25 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];

export default function SalesPage() {
  const [sales, setSales] = useState<SalesData[]>(salesData);
  const [openDialog, setOpenDialog] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
      salesman: "",
      product: "",
      quantity: "",
      amount: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newSale: SalesData = {
      id: String(sales.length + 1),
      date: values.date,
      salesman: values.salesman,
      product: values.product,
      quantity: parseInt(values.quantity),
      amount: parseFloat(values.amount),
    };
    
    setSales([newSale, ...sales]);
    setOpenDialog(false);
    form.reset();
  };

  // Calculate total sales amount
  const totalSalesAmount = sales.reduce((total, sale) => total + sale.amount, 0);
  
  // Calculate total sales count
  const totalSalesCount = sales.length;
  
  // Calculate average sale value
  const averageSaleValue = totalSalesAmount / totalSalesCount;

  return (
    <div>
      <PageHeader
        title="Sales"
        subtitle="Track and manage sales performance"
        actions={
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>New Sale</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Record New Sale</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="salesman"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Salesman</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter salesman name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="product"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter product name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter quantity" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            placeholder="Enter amount" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex justify-end gap-3">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setOpenDialog(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Create Sale</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalSalesAmount.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              From {totalSalesCount} transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Sale Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageSaleValue.toLocaleString(undefined, {maximumFractionDigits: 2})}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Per transaction
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23.5%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-green-500">↑ 2.1%</span> From previous period
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>
              Monthly sales performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
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
                  <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="hsl(var(--chart-1))"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Sales by Product</CardTitle>
            <CardDescription>
              Distribution of sales by product
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByProductData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {salesByProductData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      borderColor: "hsl(var(--border))",
                      borderRadius: "var(--radius)" 
                    }}
                    labelStyle={{ color: "hsl(var(--card-foreground))" }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>
            View recent sales transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-medium">Date</th>
                <th className="text-left py-3 px-4 font-medium">Salesman</th>
                <th className="text-left py-3 px-4 font-medium">Product</th>
                <th className="text-left py-3 px-4 font-medium">Quantity</th>
                <th className="text-right py-3 px-4 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} className="border-b hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">{sale.date}</td>
                  <td className="py-3 px-4">{sale.salesman}</td>
                  <td className="py-3 px-4">{sale.product}</td>
                  <td className="py-3 px-4">{sale.quantity}</td>
                  <td className="py-3 px-4 text-right">${sale.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}