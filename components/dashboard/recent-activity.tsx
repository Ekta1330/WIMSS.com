import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { recentActivities } from "@/lib/data";
import { CheckCircle, FileText, Package, ShoppingCart, UserPlus } from "lucide-react";

export function RecentActivity() {
  // Map of icon names to components
  const iconMap: Record<string, React.ReactNode> = {
    ShoppingCart: <ShoppingCart className="h-5 w-5" />,
    Package: <Package className="h-5 w-5" />,
    FileText: <FileText className="h-5 w-5" />,
    CheckCircle: <CheckCircle className="h-5 w-5" />,
    UserPlus: <UserPlus className="h-5 w-5" />,
  };

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-2">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-0">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 px-6 py-3 border-b last:border-b-0 hover:bg-muted/50 transition-colors"
            >
              <div className="mt-1 h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                {iconMap[activity.icon] || <FileText className="h-5 w-5" />}
              </div>
              <div>
                <p className="font-medium">{activity.action}</p>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <span>{activity.user}</span>
                  <span>•</span>
                  <span>{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}