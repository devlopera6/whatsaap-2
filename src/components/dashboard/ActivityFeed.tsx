import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { formatDistanceToNow } from "date-fns";
import {
  Bell,
  MessageSquare,
  ShoppingBag,
  CreditCard,
  AlertCircle,
} from "lucide-react";

interface ActivityItem {
  id: string;
  type: "order" | "payment" | "message" | "system";
  title: string;
  description: string;
  timestamp: Date;
  status?: "success" | "pending" | "failed";
  customer?: {
    name: string;
    avatar?: string;
  };
}

interface ActivityFeedProps {
  activities?: ActivityItem[];
  maxHeight?: string;
  title?: string;
}

const getActivityIcon = (type: ActivityItem["type"]) => {
  switch (type) {
    case "order":
      return <ShoppingBag className="h-4 w-4" />;
    case "payment":
      return <CreditCard className="h-4 w-4" />;
    case "message":
      return <MessageSquare className="h-4 w-4" />;
    case "system":
      return <Bell className="h-4 w-4" />;
    default:
      return <AlertCircle className="h-4 w-4" />;
  }
};

const getStatusBadge = (status?: ActivityItem["status"]) => {
  if (!status) return null;

  const variants = {
    success: "bg-green-100 text-green-800 hover:bg-green-100",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
    failed: "bg-red-100 text-red-800 hover:bg-red-100",
  };

  return (
    <Badge className={variants[status]} variant="outline">
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const ActivityFeed = ({
  activities = defaultActivities,
  maxHeight = "400px",
  title = "Recent Activity",
}: ActivityFeedProps) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className={`h-[${maxHeight}]`}>
          <div className="space-y-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-4">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                    {getActivityIcon(activity.type)}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{activity.title}</p>
                    {getStatusBadge(activity.status)}
                  </div>
                  <p className="text-sm text-slate-500">
                    {activity.description}
                  </p>
                  <div className="flex items-center space-x-2">
                    {activity.customer && (
                      <>
                        <Avatar className="h-6 w-6">
                          <AvatarImage
                            src={activity.customer.avatar}
                            alt={activity.customer.name}
                          />
                          <AvatarFallback className="text-xs">
                            {activity.customer.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-slate-500">
                          {activity.customer.name}
                        </span>
                      </>
                    )}
                    <span className="text-xs text-slate-400">
                      {formatDistanceToNow(activity.timestamp, {
                        addSuffix: true,
                      })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

// Default mock data
const defaultActivities: ActivityItem[] = [
  {
    id: "1",
    type: "order",
    title: "New order received",
    description: "Order #ORD-2023-4721 for ₹1,299",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    status: "success",
    customer: {
      name: "Rahul Sharma",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    },
  },
  {
    id: "2",
    type: "payment",
    title: "Payment received",
    description: "Payment of ₹899 received for order #ORD-2023-4720",
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    status: "success",
    customer: {
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
    },
  },
  {
    id: "3",
    type: "message",
    title: "Customer inquiry",
    description: "Question about delivery time for order #ORD-2023-4719",
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    customer: {
      name: "Amit Kumar",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
    },
  },
  {
    id: "4",
    type: "order",
    title: "Order status updated",
    description: "Order #ORD-2023-4718 marked as delivered",
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    status: "success",
    customer: {
      name: "Neha Gupta",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
    },
  },
  {
    id: "5",
    type: "payment",
    title: "Payment failed",
    description: "Payment attempt for order #ORD-2023-4717 failed",
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    status: "failed",
    customer: {
      name: "Vikram Singh",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
    },
  },
  {
    id: "6",
    type: "system",
    title: "Inventory alert",
    description:
      'Product "Premium Thali" is running low on stock (3 remaining)',
    timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
  },
  {
    id: "7",
    type: "order",
    title: "Order canceled",
    description: "Order #ORD-2023-4716 has been canceled by customer",
    timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
    status: "failed",
    customer: {
      name: "Ananya Desai",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ananya",
    },
  },
  {
    id: "8",
    type: "message",
    title: "WhatsApp bot notification",
    description: "Bot successfully processed 15 customer inquiries today",
    timestamp: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
  },
];

export default ActivityFeed;
