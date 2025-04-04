import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  IndianRupee,
  CreditCard,
  Wallet,
  Calendar,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface PaymentSummaryProps {
  totalRevenue?: number;
  pendingAmount?: number;
  successRate?: number;
  recentTransactions?: {
    amount: number;
    status: "success" | "pending" | "failed";
    date: string;
    method: string;
  }[];
  comparisonPeriod?: "daily" | "weekly" | "monthly";
}

const PaymentSummary = ({
  totalRevenue = 124500,
  pendingAmount = 12800,
  successRate = 92,
  recentTransactions = [
    { amount: 1299, status: "success", date: "2023-06-15", method: "UPI" },
    { amount: 2499, status: "success", date: "2023-06-14", method: "Card" },
    { amount: 999, status: "pending", date: "2023-06-14", method: "UPI" },
    { amount: 1599, status: "failed", date: "2023-06-13", method: "Wallet" },
  ],
  comparisonPeriod = "weekly",
}: PaymentSummaryProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-500";
      case "pending":
        return "text-amber-500";
      case "failed":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100";
      case "pending":
        return "bg-amber-100";
      case "failed":
        return "bg-red-100";
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="w-full space-y-4 bg-white">
      <Tabs defaultValue="overview" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Payment Summary</h2>
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Revenue Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {totalRevenue.toLocaleString("en-IN")}
                  </CardTitle>
                  <div className="flex items-center text-green-500 text-sm font-medium">
                    <ArrowUpRight className="h-4 w-4 mr-1" />
                    <span>+12.5%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Compared to last {comparisonPeriod}
                </p>
              </CardContent>
            </Card>

            {/* Pending Amount Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Pending Amount</CardDescription>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl flex items-center">
                    <IndianRupee className="h-5 w-5 mr-1" />
                    {pendingAmount.toLocaleString("en-IN")}
                  </CardTitle>
                  <div className="flex items-center text-amber-500 text-sm font-medium">
                    <ArrowDownRight className="h-4 w-4 mr-1" />
                    <span>-3.2%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  From{" "}
                  {
                    recentTransactions.filter((t) => t.status === "pending")
                      .length
                  }{" "}
                  pending transactions
                </p>
              </CardContent>
            </Card>

            {/* Success Rate Card */}
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Payment Success Rate</CardDescription>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-2xl">{successRate}%</CardTitle>
                  <div className="flex items-center text-green-500 text-sm font-medium">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span>+2.1%</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Progress value={successRate} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  Target: 95%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Payment Methods Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Distribution of payment methods used by customers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-blue-100">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Card Payments</p>
                    <div className="flex items-center justify-between mt-1">
                      <Progress value={35} className="h-2 w-24" />
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-green-100">
                    <IndianRupee className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">UPI Payments</p>
                    <div className="flex items-center justify-between mt-1">
                      <Progress value={55} className="h-2 w-24" />
                      <span className="text-sm font-medium">55%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-purple-100">
                    <Wallet className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium">Wallet/Others</p>
                    <div className="flex items-center justify-between mt-1">
                      <Progress value={10} className="h-2 w-24" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Your most recent payment transactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`p-2 rounded-full ${getStatusBg(transaction.status)}`}
                      >
                        {transaction.method === "UPI" && (
                          <IndianRupee
                            className={`h-5 w-5 ${getStatusColor(transaction.status)}`}
                          />
                        )}
                        {transaction.method === "Card" && (
                          <CreditCard
                            className={`h-5 w-5 ${getStatusColor(transaction.status)}`}
                          />
                        )}
                        {transaction.method === "Wallet" && (
                          <Wallet
                            className={`h-5 w-5 ${getStatusColor(transaction.status)}`}
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {transaction.method} Payment
                        </p>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-3 w-3 text-gray-400" />
                          <p className="text-xs text-gray-500">
                            {new Date(transaction.date).toLocaleDateString(
                              "en-IN",
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium flex items-center">
                        <IndianRupee className="h-4 w-4 mr-1" />
                        {transaction.amount.toLocaleString("en-IN")}
                      </p>
                      <span
                        className={`text-xs font-medium ${getStatusColor(transaction.status)} capitalize`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentSummary;
