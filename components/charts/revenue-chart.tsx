"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { revenueVsCostData } from "@/lib/data";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const timeRanges = ["1W", "1M", "3M", "6M", "1Y", "All"];

export function RevenueChart() {
  const [activeRange, setActiveRange] = useState("1Y");
  
  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-3">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Revenue vs Cost</CardTitle>
          <CardDescription>
            Comparing revenue and cost over time
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-muted p-1 text-muted-foreground">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
                activeRange === range
                  ? "bg-background text-foreground shadow-sm"
                  : "hover:bg-background/50"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </CardHeader>
      <CardContent className="pb-4">
        <div className="h-[300px] mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={revenueVsCostData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)" 
                }}
                labelStyle={{ color: "hsl(var(--card-foreground))" }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="cost"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorCost)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}