import { PageHeader } from "@/components/layout/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { SalesChart } from "@/components/charts/sales-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Package, TrendingUp, Users, DollarSign } from "lucide-react";
import { dashboardStats } from "@/lib/data";

export default function Dashboard() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, get a quick overview of your business"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Products"
          value={dashboardStats.totalProducts}
          icon={Package}
          description="Total products in inventory"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Total Sales"
          value={dashboardStats.totalSales}
          icon={DollarSign}
          description="Revenue from all sales"
          trend={{ value: 8, isPositive: true }}
        />
        <StatCard
          title="Monthly Profit"
          value={dashboardStats.monthlyProfit}
          icon={TrendingUp}
          description="Net profit this month"
          trend={{ value: 5, isPositive: true }}
        />
        <StatCard
          title="Customer Count"
          value="254"
          icon={Users}
          description="Active customers"
          trend={{ value: 3, isPositive: true }}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-8">
        <RevenueChart />
        <SalesChart />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <RecentActivity />
      </div>
    </div>
  );
}