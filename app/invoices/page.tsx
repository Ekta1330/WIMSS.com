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
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { Invoice } from "@/lib/types";
import { invoices } from "@/lib/data";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Printer, Send } from "lucide-react";

// Form schema for invoice
const invoiceSchema = z.object({
  customer: z.object({
    name: z.string().min(2, {
      message: "Customer name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    address: z.string().min(5, {
      message: "Please enter a valid address.",
    }),
  }),
  invoiceDate: z.string().min(1, {
    message: "Invoice date is required.",
  }),
  dueDate: z.string().min(1, {
    message: "Due date is required.",
  }),
  items: z.string().min(2, {
    message: "Please add at least one item.",
  }),
  status: z.enum(["paid", "unpaid", "overdue"]),
});

export default function InvoicesPage() {
  const [allInvoices, setAllInvoices] = useState<Invoice[]>(invoices);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [openPdfPreview, setOpenPdfPreview] = useState(false);
  
  const form = useForm<z.infer<typeof invoiceSchema>>({
    resolver: zodResolver(invoiceSchema),
    defaultValues: {
      customer: {
        name: "",
        email: "",
        address: "",
      },
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      items: "",
      status: "unpaid",
    },
  });
  
  const onSubmit = (values: z.infer<typeof invoiceSchema>) => {
    // Parse items from string
    const parsedItems = values.items.split('\n').map(line => {
      const [description, quantityStr, priceStr] = line.split(',').map(s => s.trim());
      const quantity = parseInt(quantityStr) || 1;
      const unitPrice = parseFloat(priceStr) || 0;
      return {
        description: description || 'Unknown Item',
        quantity,
        unitPrice,
        total: quantity * unitPrice,
      };
    });
    
    // Calculate totals
    const subtotal = parsedItems.reduce((sum, item) => sum + item.total, 0);
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + tax;
    
    const newInvoice: Invoice = {
      id: String(allInvoices.length + 1),
      invoiceNumber: `INV-2025-${String(allInvoices.length + 1).padStart(3, '0')}`,
      date: values.invoiceDate,
      dueDate: values.dueDate,
      customer: values.customer,
      items: parsedItems,
      subtotal,
      tax,
      total,
      status: values.status,
    };
    
    setAllInvoices([newInvoice, ...allInvoices]);
    setOpenDialog(false);
    form.reset();
    
    // Open the invoice preview
    setSelectedInvoice(newInvoice);
    setOpenPdfPreview(true);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Paid</Badge>;
      case 'unpaid':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Unpaid</Badge>;
      case 'overdue':
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">Overdue</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  return (
    <div>
      <PageHeader
        title="Invoices"
        subtitle="Create and manage customer invoices"
        actions={
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Create Invoice</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Create New Invoice</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="customer.name"
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
                      name="customer.email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Customer Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter customer email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="customer.address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Customer Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter customer address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="invoiceDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Invoice Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Due Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
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
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="unpaid">Unpaid</SelectItem>
                              <SelectItem value="overdue">Overdue</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="items"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Invoice Items</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Format: Description, Quantity, Unit Price"
                            className="min-h-24"
                            {...field} 
                          />
                        </FormControl>
                        <CardDescription className="text-xs mt-1">
                          One item per line. Example: Premium Plan Annual Subscription, 2, 800
                        </CardDescription>
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
                    <Button type="submit">Create Invoice</Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        }
      />
      
      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>
            View and manage customer invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice #</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allInvoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell className="font-medium">{invoice.invoiceNumber}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>{invoice.customer.name}</TableCell>
                  <TableCell>${invoice.total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>
                  <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedInvoice(invoice);
                        setOpenPdfPreview(true);
                      }}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Dialog open={openPdfPreview} onOpenChange={setOpenPdfPreview}>
        <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="p-4 border rounded-lg bg-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">INVOICE</h1>
                  <p className="text-gray-600">#{selectedInvoice.invoiceNumber}</p>
                </div>
                <div className="text-right">
                  <h2 className="text-xl font-bold text-gray-800">BizDash Inc.</h2>
                  <p className="text-gray-600">123 Business Street</p>
                  <p className="text-gray-600">San Francisco, CA 94107</p>
                  <p className="text-gray-600">accounting@bizdash.com</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-gray-600 font-medium mb-2">Bill To:</h3>
                  <p className="font-bold">{selectedInvoice.customer.name}</p>
                  <p>{selectedInvoice.customer.email}</p>
                  <p className="whitespace-pre-line">{selectedInvoice.customer.address}</p>
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-gray-600 font-medium mb-1">Invoice Date:</h3>
                      <p>{selectedInvoice.date}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 font-medium mb-1">Due Date:</h3>
                      <p>{selectedInvoice.dueDate}</p>
                    </div>
                    <div>
                      <h3 className="text-gray-600 font-medium mb-1">Status:</h3>
                      <p>{getStatusBadge(selectedInvoice.status)}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left py-2 px-4">Description</th>
                    <th className="text-center py-2 px-4">Quantity</th>
                    <th className="text-right py-2 px-4">Unit Price</th>
                    <th className="text-right py-2 px-4">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-2 px-4">{item.description}</td>
                      <td className="py-2 px-4 text-center">{item.quantity}</td>
                      <td className="py-2 px-4 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="py-2 px-4 text-right">${item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              <div className="flex justify-end mb-8">
                <div className="w-64">
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-medium">Subtotal:</span>
                    <span>${selectedInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-200 py-2">
                    <span className="font-medium">Tax (8%):</span>
                    <span>${selectedInvoice.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2 font-bold">
                    <span>Total:</span>
                    <span>${selectedInvoice.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-300 pt-4 text-gray-600">
                <p className="mb-2 font-medium">Payment Terms:</p>
                <p>Payment due within 30 days. Please make checks payable to BizDash Inc.</p>
                <p>For questions concerning this invoice, please contact accounting@bizdash.com</p>
              </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" className="gap-1">
              <Printer className="h-4 w-4" />
              <span>Print</span>
            </Button>
            <Button variant="outline" className="gap-1">
              <Send className="h-4 w-4" />
              <span>Email</span>
            </Button>
            <Button className="gap-1">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}