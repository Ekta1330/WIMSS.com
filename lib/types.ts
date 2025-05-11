export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'salesman';
  avatar?: string;
}

export interface SalesData {
  id: string;
  date: string;
  amount: number;
  salesman: string;
  product: string;
  quantity: number;
}

export interface OrderData {
  id: string;
  date: string;
  customer: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  amount: number;
  items: {
    product: string;
    quantity: number;
    price: number;
  }[];
}

export interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  price: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock';
  lastUpdated: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customer: {
    name: string;
    email: string;
    address: string;
  };
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  tax: number;
  total: number;
  status: 'paid' | 'unpaid' | 'overdue';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
}

export interface DashboardStats {
  totalProducts: number;
  totalSales: number;
  monthlyProfit: number;
  yearlyRevenue: number;
}