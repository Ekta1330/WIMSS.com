import { DashboardStats, Invoice, Notification, OrderData, SalesData, StockItem } from "./types";

// Mock dashboard stats
export const dashboardStats: DashboardStats = {
  totalProducts: 1245,
  totalSales: 48560,
  monthlyProfit: 12450,
  yearlyRevenue: 156000,
};

// Mock sales data
export const salesData: SalesData[] = [
  { id: '1', date: '2025-04-01', amount: 1200, salesman: 'John Doe', product: 'Premium Plan', quantity: 3 },
  { id: '2', date: '2025-04-02', amount: 800, salesman: 'Jane Smith', product: 'Basic Plan', quantity: 5 },
  { id: '3', date: '2025-04-03', amount: 2100, salesman: 'Robert Johnson', product: 'Enterprise Plan', quantity: 2 },
  { id: '4', date: '2025-04-04', amount: 950, salesman: 'Sarah Williams', product: 'Premium Plan', quantity: 2 },
  { id: '5', date: '2025-04-05', amount: 600, salesman: 'Michael Brown', product: 'Basic Plan', quantity: 4 },
];

// Mock monthly sales data for charts
export const monthlySalesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
  { name: 'Jul', sales: 7000 },
  { name: 'Aug', sales: 6500 },
  { name: 'Sep', sales: 8000 },
  { name: 'Oct', sales: 7500 },
  { name: 'Nov', sales: 9000 },
  { name: 'Dec', sales: 8500 },
];

// Mock revenue vs cost data for charts
export const revenueVsCostData = [
  { name: 'Jan', revenue: 4000, cost: 2400 },
  { name: 'Feb', revenue: 3000, cost: 1398 },
  { name: 'Mar', revenue: 5000, cost: 3400 },
  { name: 'Apr', revenue: 4500, cost: 2800 },
  { name: 'May', revenue: 6000, cost: 3200 },
  { name: 'Jun', revenue: 5500, cost: 3000 },
  { name: 'Jul', revenue: 7000, cost: 3800 },
  { name: 'Aug', revenue: 6500, cost: 3500 },
  { name: 'Sep', revenue: 8000, cost: 4200 },
  { name: 'Oct', revenue: 7500, cost: 4000 },
  { name: 'Nov', revenue: 9000, cost: 4800 },
  { name: 'Dec', revenue: 8500, cost: 4500 },
];

// Mock orders data
export const ordersData: OrderData[] = [
  {
    id: '1',
    date: '2025-04-01',
    customer: 'Acme Corp',
    status: 'completed',
    amount: 2800,
    items: [
      { product: 'Premium Plan', quantity: 2, price: 800 },
      { product: 'Enterprise Plan', quantity: 1, price: 1200 },
    ],
  },
  {
    id: '2',
    date: '2025-04-02',
    customer: 'Globex Inc',
    status: 'processing',
    amount: 1500,
    items: [
      { product: 'Basic Plan', quantity: 3, price: 500 },
    ],
  },
  {
    id: '3',
    date: '2025-04-03',
    customer: 'Stark Industries',
    status: 'pending',
    amount: 3600,
    items: [
      { product: 'Enterprise Plan', quantity: 3, price: 1200 },
    ],
  },
  {
    id: '4',
    date: '2025-04-04',
    customer: 'Wayne Enterprises',
    status: 'completed',
    amount: 1600,
    items: [
      { product: 'Premium Plan', quantity: 2, price: 800 },
    ],
  },
  {
    id: '5',
    date: '2025-04-05',
    customer: 'Oscorp',
    status: 'cancelled',
    amount: 2000,
    items: [
      { product: 'Premium Plan', quantity: 1, price: 800 },
      { product: 'Basic Plan', quantity: 2, price: 600 },
    ],
  },
];

// Mock stock items
export const stockItems: StockItem[] = [
  {
    id: '1',
    name: 'Basic Plan Subscription Cards',
    category: 'Subscriptions',
    quantity: 150,
    price: 200,
    status: 'in-stock',
    lastUpdated: '2025-04-01',
  },
  {
    id: '2',
    name: 'Premium Plan Subscription Cards',
    category: 'Subscriptions',
    quantity: 85,
    price: 400,
    status: 'in-stock',
    lastUpdated: '2025-04-02',
  },
  {
    id: '3',
    name: 'Enterprise Plan Subscription Cards',
    category: 'Subscriptions',
    quantity: 20,
    price: 800,
    status: 'low-stock',
    lastUpdated: '2025-04-03',
  },
  {
    id: '4',
    name: 'Branded Merchandise - T-shirts',
    category: 'Merchandise',
    quantity: 200,
    price: 25,
    status: 'in-stock',
    lastUpdated: '2025-04-01',
  },
  {
    id: '5',
    name: 'Branded Merchandise - Mugs',
    category: 'Merchandise',
    quantity: 0,
    price: 15,
    status: 'out-of-stock',
    lastUpdated: '2025-04-05',
  },
];

// Mock invoices
export const invoices: Invoice[] = [
  {
    id: '1',
    invoiceNumber: 'INV-2025-001',
    date: '2025-04-01',
    dueDate: '2025-05-01',
    customer: {
      name: 'Acme Corp',
      email: 'billing@acmecorp.com',
      address: '123 Main St, New York, NY 10001',
    },
    items: [
      {
        description: 'Premium Plan Annual Subscription',
        quantity: 2,
        unitPrice: 800,
        total: 1600,
      },
      {
        description: 'Enterprise Plan Annual Subscription',
        quantity: 1,
        unitPrice: 1200,
        total: 1200,
      },
    ],
    subtotal: 2800,
    tax: 224,
    total: 3024,
    status: 'paid',
  },
  {
    id: '2',
    invoiceNumber: 'INV-2025-002',
    date: '2025-04-02',
    dueDate: '2025-05-02',
    customer: {
      name: 'Globex Inc',
      email: 'accounts@globexinc.com',
      address: '456 Park Ave, Boston, MA 02108',
    },
    items: [
      {
        description: 'Basic Plan Annual Subscription',
        quantity: 3,
        unitPrice: 500,
        total: 1500,
      },
    ],
    subtotal: 1500,
    tax: 120,
    total: 1620,
    status: 'unpaid',
  },
  {
    id: '3',
    invoiceNumber: 'INV-2025-003',
    date: '2025-03-01',
    dueDate: '2025-04-01',
    customer: {
      name: 'Stark Industries',
      email: 'finance@stark.com',
      address: '789 Broadway, San Francisco, CA 94105',
    },
    items: [
      {
        description: 'Enterprise Plan Annual Subscription',
        quantity: 3,
        unitPrice: 1200,
        total: 3600,
      },
    ],
    subtotal: 3600,
    tax: 288,
    total: 3888,
    status: 'overdue',
  },
];

// Mock notifications
export const notifications: Notification[] = [
  {
    id: '1',
    title: 'New Order',
    message: 'Acme Corp placed a new order worth $3024',
    date: '2025-04-05T10:30:00',
    read: false,
    type: 'info',
  },
  {
    id: '2',
    title: 'Low Stock Alert',
    message: 'Enterprise Plan Subscription Cards are running low',
    date: '2025-04-04T15:45:00',
    read: false,
    type: 'warning',
  },
  {
    id: '3',
    title: 'Payment Received',
    message: 'Received payment of $3024 from Acme Corp',
    date: '2025-04-03T09:15:00',
    read: true,
    type: 'success',
  },
  {
    id: '4',
    title: 'Invoice Overdue',
    message: 'Invoice #INV-2025-003 for Stark Industries is overdue',
    date: '2025-04-02T14:20:00',
    read: true,
    type: 'error',
  },
];

// Mock recent activity data
export const recentActivities = [
  {
    id: '1',
    action: 'Created a new order',
    user: 'John Doe',
    time: '2 hours ago',
    icon: 'ShoppingCart',
  },
  {
    id: '2',
    action: 'Updated stock levels',
    user: 'Jane Smith',
    time: '4 hours ago',
    icon: 'Package',
  },
  {
    id: '3',
    action: 'Generated invoice #INV-2025-003',
    user: 'Robert Johnson',
    time: '6 hours ago',
    icon: 'FileText',
  },
  {
    id: '4',
    action: 'Completed order processing',
    user: 'Sarah Williams',
    time: '12 hours ago',
    icon: 'CheckCircle',
  },
  {
    id: '5',
    action: 'Added new salesman account',
    user: 'Admin',
    time: '1 day ago',
    icon: 'UserPlus',
  },
];