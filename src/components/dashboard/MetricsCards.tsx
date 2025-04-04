import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ShoppingBagIcon,
  IndianRupeeIcon,
  ClockIcon,
  PackageIcon,
} from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard = ({
  title = "Metric",
  value = "0",
  description = "No data available",
  icon = <ShoppingBagIcon className="h-5 w-5" />,
  trend,
}: MetricCardProps) => {
  return (
    <Card className="bg-white">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-gray-500">
          {title}
        </CardTitle>
        <div className="rounded-full bg-gray-100 p-2">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {trend && (
            <span
              className={`mr-1 flex items-center text-xs ${trend.isPositive ? "text-green-500" : "text-red-500"}`}
            >
              {trend.isPositive ? (
                <ArrowUpIcon className="h-3 w-3 mr-1" />
              ) : (
                <ArrowDownIcon className="h-3 w-3 mr-1" />
              )}
              {trend.value}%
            </span>
          )}
          <CardDescription className="text-xs text-gray-500">
            {description}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricsCardsProps {
  totalOrders?: {
    value: string;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    description: string;
  };
  totalRevenue?: {
    value: string;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    description: string;
  };
  pendingOrders?: {
    value: string;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    description: string;
  };
  inventoryStatus?: {
    value: string;
    trend?: {
      value: number;
      isPositive: boolean;
    };
    description: string;
  };
}

const MetricsCards = ({
  totalOrders = {
    value: "156",
    trend: { value: 12, isPositive: true },
    description: "vs. previous week",
  },
  totalRevenue = {
    value: "₹24,500",
    trend: { value: 8, isPositive: true },
    description: "vs. previous week",
  },
  pendingOrders = {
    value: "23",
    trend: { value: 5, isPositive: false },
    description: "needs attention",
  },
  inventoryStatus = {
    value: "86%",
    trend: { value: 2, isPositive: false },
    description: "items in stock",
  },
}: MetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
      <MetricCard
        title="Total Orders"
        value={totalOrders.value}
        description={totalOrders.description}
        icon={<ShoppingBagIcon className="h-5 w-5 text-blue-600" />}
        trend={totalOrders.trend}
      />
      <MetricCard
        title="Total Revenue"
        value={totalRevenue.value}
        description={totalRevenue.description}
        icon={<IndianRupeeIcon className="h-5 w-5 text-green-600" />}
        trend={totalRevenue.trend}
      />
      <MetricCard
        title="Pending Orders"
        value={pendingOrders.value}
        description={pendingOrders.description}
        icon={<ClockIcon className="h-5 w-5 text-amber-600" />}
        trend={pendingOrders.trend}
      />
      <MetricCard
        title="Inventory Status"
        value={inventoryStatus.value}
        description={inventoryStatus.description}
        icon={<PackageIcon className="h-5 w-5 text-purple-600" />}
        trend={inventoryStatus.trend}
      />
    </div>
  );
};

export default MetricsCards;
