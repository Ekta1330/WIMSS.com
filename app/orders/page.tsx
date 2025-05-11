"use client";

import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/layout/page-header";
import { ordersData } from "@/lib/data";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
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
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useState } from "react";
import { OrderData } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, MoreHorizontal, PlusCircle, Trash } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

const formSchema = z.object({
  customer: z.string().min(2, {
    message: "Customer name must be at least 2 characters.",
  }),
  status: z.enum(["pending", "processing", "completed", "cancelled"]),
  items: z.string().min(2, {
    message: "Please add at least one item.",
  }),
  amount: z.string().min(1, {
    message: "Amount is required.",
  }),
});

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderData[]>(ordersData);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      status: "pending",
      items: "",
      amount: "",
    },
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newOrder: OrderData = {
      id: String(orders.length + 1),
      date: new Date().toISOString().split('T')[0],
      customer: values.customer,
      status: values.status as 'pending' | 'processing' | 'completed' | 'cancelled',
      amount: parseFloat(values.amount),
      items: values.items.split(',').map(item => {
        const [product, quantity, price] = item.trim().split(':');
        return {
          product: product || 'Unknown Product',
          quantity: parseInt(quantity || '1'),
          price: parseFloat(price || '0'),
        };
      }),
    };
    
    setOrders([newOrder, ...orders]);
    setOpenDialog(false);
    form.reset();
  };
  
  const handleDelete = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };
  
  const handleView = (order: OrderData) => {
    setSelectedOrder(order);
    setOpenViewDialog(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'processing':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Processing</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div>
      <PageHeader
        title="Orders"
        subtitle="Manage all customer orders"
        actions={
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-1">
                <PlusCircle className="h-4 w-4" />
                <span>New Order</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="customer"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter customer name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select order status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="processing">Processing</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Items</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Format: Product Name:Quantity:Price, Product Name:Quantity:Price"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <CardDescription className="text-xs mt-1">
                          Example: Premium Plan:2:800, Basic Plan:1:200
                        </CardDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter total amount" {...field} />
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
                    <Button type="submit">Create Order</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        }
      />
      
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            View and manage all customer orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">#{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{getStatusBadge(order.status)}</TableCell>
                  <TableCell>${order.amount.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem 
                          onClick={() => handleView(order)}
                          className="cursor-pointer"
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          <span>View</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(order.id)}
                          className="cursor-pointer text-destructive focus:text-destructive"
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={openViewDialog} onOpenChange={setOpenViewDialog}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Order ID</p>
                  <p className="text-sm">#{selectedOrder.id}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">{selectedOrder.date}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Customer</p>
                  <p className="text-sm">{selectedOrder.customer}</p>
                </div>
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="text-sm">{getStatusBadge(selectedOrder.status)}</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">Items</p>
                <div className="border rounded-md divide-y">
                  {selectedOrder.items.map((item, index) => (
                    <div key={index} className="p-2 flex items-center justify-between text-sm">
                      <div>
                        <span className="font-medium">{item.product}</span>
                        <span className="text-muted-foreground"> × {item.quantity}</span>
                      </div>
                      <div>${item.price.toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="border-t pt-4 flex justify-between">
                <p className="text-sm font-medium">Total Amount</p>
                <p className="text-lg font-bold">${selectedOrder.amount.toLocaleString()}</p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}