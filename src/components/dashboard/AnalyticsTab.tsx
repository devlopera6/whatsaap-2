import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  LineChart,
  PieChart,
  Download,
  Calendar,
} from "lucide-react";

const AnalyticsTab = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer Engagement Analytics</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            Last 30 Days
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview">
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="messages">Message Analytics</TabsTrigger>
          <TabsTrigger value="customers">Customer Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Message Volume
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center">
                    <BarChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">
                      Message volume chart will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">
                      Response time chart will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Customer Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">
                      Customer engagement chart will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base font-medium">
                  Message Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                    <p className="text-slate-500 text-sm">
                      Message categories chart will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Message Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center bg-slate-50 rounded-md">
                <div className="text-center">
                  <BarChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700">
                    Detailed Message Analytics
                  </h3>
                  <p className="text-slate-500 mt-2 max-w-md">
                    Detailed message analytics will be displayed here, including
                    message volume by time, response rates, and message types.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customer Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center bg-slate-50 rounded-md">
                <div className="text-center">
                  <PieChart className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-700">
                    Customer Insights Dashboard
                  </h3>
                  <p className="text-slate-500 mt-2 max-w-md">
                    Detailed customer insights will be displayed here, including
                    customer activity patterns, engagement levels, and customer
                    segmentation.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsTab;
