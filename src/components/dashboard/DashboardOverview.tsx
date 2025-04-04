import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ArrowRight, BarChart2, Calendar, Users } from "lucide-react";
import MetricsCards from "./MetricsCards";
import RecentOrdersTable from "./RecentOrdersTable";
import ActivityFeed from "./ActivityFeed";

interface DashboardOverviewProps {
  userName?: string;
  businessName?: string;
  onViewAllOrders?: () => void;
  onViewAllCustomers?: () => void;
  onViewReports?: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  userName = "Rahul",
  businessName = "Spice Junction",
  onViewAllOrders = () => {},
  onViewAllCustomers = () => {},
  onViewReports = () => {},
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Welcome back, {userName}!
          </h1>
          <p className="text-gray-500">
            Here's what's happening with {businessName} today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>June 15, 2023</span>
          </Button>
          <Button variant="default" className="flex items-center gap-2">
            <BarChart2 className="h-4 w-4" />
            <span>View Reports</span>
          </Button>
        </div>
      </div>

      {/* Metrics Cards */}
      <MetricsCards />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders and Activity Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="recent">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="recent">Recent Orders</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              <Button
                variant="ghost"
                className="text-sm flex items-center gap-1"
                onClick={onViewAllOrders}
              >
                View All
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <TabsContent value="recent" className="m-0">
              <RecentOrdersTable />
            </TabsContent>
            <TabsContent value="pending" className="m-0">
              <RecentOrdersTable
                orders={[
                  {
                    id: "ORD-001",
                    customer: {
                      name: "Rahul Sharma",
                      phone: "+91 9876543210",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
                    },
                    items: [
                      { name: "Veg Pizza", quantity: 2, price: 299 },
                      { name: "Coke", quantity: 1, price: 60 },
                    ],
                    total: 658,
                    status: "pending",
                    paymentStatus: "pending",
                    date: new Date(2023, 5, 15, 14, 30),
                  },
                  {
                    id: "ORD-005",
                    customer: {
                      name: "Vikram Reddy",
                      phone: "+91 5432109876",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
                    },
                    items: [{ name: "Veg Thali", quantity: 3, price: 150 }],
                    total: 450,
                    status: "pending",
                    paymentStatus: "pending",
                    date: new Date(2023, 5, 15, 10, 45),
                  },
                ]}
              />
            </TabsContent>
            <TabsContent value="completed" className="m-0">
              <RecentOrdersTable
                orders={[
                  {
                    id: "ORD-003",
                    customer: {
                      name: "Amit Kumar",
                      phone: "+91 7654321098",
                      avatar:
                        "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
                    },
                    items: [
                      { name: "Masala Dosa", quantity: 2, price: 120 },
                      { name: "Filter Coffee", quantity: 2, price: 40 },
                    ],
                    total: 320,
                    status: "completed",
                    paymentStatus: "paid",
                    date: new Date(2023, 5, 15, 12, 15),
                  },
                ]}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Activity Feed */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Button
              variant="ghost"
              className="text-sm flex items-center gap-1"
              onClick={onViewReports}
            >
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <ActivityFeed maxHeight="600px" />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">
              Customer Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">
                You have 12 new customer messages to respond to.
              </p>
              <Button
                variant="outline"
                className="w-full mt-2 flex items-center justify-center gap-2"
                onClick={onViewAllCustomers}
              >
                <Users className="h-4 w-4" />
                <span>Manage Customers</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">
              Inventory Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gray-500">
                3 products are running low on stock and need attention.
              </p>
              <Button variant="outline" className="w-full mt-2">
                Update Inventory
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-md font-medium">
              WhatsApp Bot Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <p className="text-sm text-gray-500">
                  Bot is active and responding to customers
                </p>
              </div>
              <p className="text-sm text-gray-500">
                Processed 45 messages today with 98% accuracy.
              </p>
              <Button variant="outline" className="w-full mt-2">
                Configure Bot
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
