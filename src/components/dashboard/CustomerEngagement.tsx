import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Users, BarChart3, Send } from "lucide-react";
import AnalyticsTab from "./AnalyticsTab";
import CustomersList from "./CustomersList";
import MessageComposer from "./MessageComposer";
import MessagesTab from "./MessagesTab";

interface CustomerEngagementProps {
  activeTab?: string;
}

const CustomerEngagement = ({
  activeTab = "customers",
}: CustomerEngagementProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);
  const [selectedCustomers, setSelectedCustomers] = useState<
    {
      id: string;
      name: string;
      phone: string;
      avatar?: string;
    }[]
  >([]);

  // Set the active tab when the prop changes
  useEffect(() => {
    setCurrentTab(activeTab);
  }, [activeTab]);

  // Mock function for handling message sending
  const handleSendMessage = (message: {
    content: string;
    recipients: string[];
    scheduledTime?: Date;
    isTemplate: boolean;
  }) => {
    console.log("Message sent:", message);
    // In a real implementation, this would call an API to send the message
  };

  // Mock analytics data
  const engagementStats = {
    totalMessages: 156,
    responseRate: 78,
    averageResponseTime: "2.5 hours",
    activeCustomers: 42,
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Customer Engagement
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your customer relationships and communications
          </p>
        </div>
        <div className="flex space-x-2">
          <Button onClick={() => setCurrentTab("messaging")}>
            <MessageSquare className="mr-2 h-4 w-4" />
            New Message
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">
                Total Messages
              </p>
              <h3 className="text-3xl font-bold mt-1">
                {engagementStats.totalMessages}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">Response Rate</p>
              <h3 className="text-3xl font-bold mt-1">
                {engagementStats.responseRate}%
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">
                Avg. Response Time
              </p>
              <h3 className="text-3xl font-bold mt-1">
                {engagementStats.averageResponseTime}
              </h3>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-500">
                Active Customers
              </p>
              <h3 className="text-3xl font-bold mt-1">
                {engagementStats.activeCustomers}
              </h3>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="customers" className="flex items-center">
            <Users className="mr-2 h-4 w-4" />
            Customers
          </TabsTrigger>
          <TabsTrigger value="messaging" className="flex items-center">
            <Send className="mr-2 h-4 w-4" />
            Messaging
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center">
            <BarChart3 className="mr-2 h-4 w-4" />
            Engagement Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="customers">
          <CustomersList />
        </TabsContent>

        <TabsContent value="messaging">
          <MessagesTab
            selectedCustomers={
              selectedCustomers.length > 0 ? selectedCustomers : undefined
            }
          />
        </TabsContent>

        <TabsContent value="analytics">
          <AnalyticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomerEngagement;
