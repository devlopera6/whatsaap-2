import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { ArrowUpRight, CheckCircle, Clock, Crown } from "lucide-react";

interface UsageMetric {
  label: string;
  current: number;
  limit: number;
  unit: string;
}

interface CurrentPlanCardProps {
  planName?: string;
  planPrice?: string;
  billingCycle?: "monthly" | "yearly";
  nextBillingDate?: string;
  usageMetrics?: UsageMetric[];
  isActive?: boolean;
}

const CurrentPlanCard = ({
  planName = "Pro Plan",
  planPrice = "₹999",
  billingCycle = "monthly",
  nextBillingDate = "May 15, 2023",
  usageMetrics = [
    { label: "Orders Processed", current: 450, limit: 500, unit: "orders" },
    {
      label: "WhatsApp Messages",
      current: 1200,
      limit: 2000,
      unit: "messages",
    },
    { label: "Storage Used", current: 2.4, limit: 5, unit: "GB" },
  ],
  isActive = true,
}: CurrentPlanCardProps) => {
  return (
    <Card className="w-full bg-white shadow-md">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold flex items-center gap-2">
              {planName} <Crown className="h-5 w-5 text-yellow-500" />
            </CardTitle>
            <CardDescription className="mt-1">
              Your current subscription plan
            </CardDescription>
          </div>
          <Badge
            variant={isActive ? "default" : "outline"}
            className={
              isActive
                ? "bg-green-100 text-green-800 hover:bg-green-100"
                : "text-red-800 bg-red-100 hover:bg-red-100"
            }
          >
            {isActive ? (
              <span className="flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" />
                Active
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                Expired
              </span>
            )}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <span className="text-3xl font-bold">{planPrice}</span>
            <span className="text-gray-500 ml-1">/{billingCycle}</span>
          </div>
          <div className="text-sm text-gray-500 flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            Next billing: {nextBillingDate}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-sm text-gray-700">Usage Metrics</h3>
          {usageMetrics.map((metric, index) => {
            const percentage = (metric.current / metric.limit) * 100;
            const isNearLimit = percentage > 80;

            return (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{metric.label}</span>
                  <span
                    className={isNearLimit ? "text-amber-600 font-medium" : ""}
                  >
                    {metric.current} / {metric.limit} {metric.unit}
                  </span>
                </div>
                <Progress
                  value={percentage}
                  className={`h-2 ${isNearLimit ? "bg-gray-100" : "bg-gray-100"}`}
                  indicatorClassName={
                    isNearLimit ? "bg-amber-500" : "bg-blue-500"
                  }
                />
              </div>
            );
          })}
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
          <h3 className="font-medium mb-2">Plan Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Unlimited WhatsApp Order Processing
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Multi-language Support
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Advanced Analytics Dashboard
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              Priority Customer Support
            </li>
          </ul>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between pt-2">
        <Button variant="outline">View Billing History</Button>
        <Button className="gap-1">
          Upgrade Plan <ArrowUpRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CurrentPlanCard;
