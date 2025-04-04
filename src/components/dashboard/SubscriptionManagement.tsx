import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import CurrentPlanCard from "./CurrentPlanCard";
import PlanOptions from "./PlanOptions";
import BillingHistory from "./BillingHistory";
import { toast } from "../ui/use-toast";

interface SubscriptionManagementProps {
  currentPlan?: string;
}

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({
  currentPlan = "Pro",
}) => {
  const [activePlan, setActivePlan] = useState(currentPlan);
  const [activeTab, setActiveTab] = useState("current-plan");

  const handleUpgrade = (plan: string) => {
    // In a real implementation, this would trigger a payment flow
    setActivePlan(plan);
    toast({
      title: "Plan upgrade initiated",
      description: `You are upgrading to the ${plan} plan. Your new features will be available shortly.`,
      variant: "default",
    });
  };

  const handleDowngrade = (plan: string) => {
    // In a real implementation, this would schedule a downgrade
    setActivePlan(plan);
    toast({
      title: "Plan downgrade scheduled",
      description: `Your subscription will be changed to the ${plan} plan at the end of your current billing cycle.`,
      variant: "default",
    });
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          Subscription Management
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your subscription plan, billing, and payment information.
        </p>
      </div>

      <Tabs
        defaultValue="current-plan"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="current-plan">Current Plan</TabsTrigger>
          <TabsTrigger value="plan-options">Plan Options</TabsTrigger>
          <TabsTrigger value="billing-history">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="current-plan" className="mt-0">
          <CurrentPlanCard
            planName={`${activePlan} Plan`}
            planPrice={
              activePlan === "Basic"
                ? "₹499"
                : activePlan === "Pro"
                  ? "₹999"
                  : "₹1999"
            }
            billingCycle="monthly"
            nextBillingDate="May 15, 2023"
            usageMetrics={[
              {
                label: "Orders Processed",
                current: 450,
                limit: 500,
                unit: "orders",
              },
              {
                label: "WhatsApp Messages",
                current: 1200,
                limit: 2000,
                unit: "messages",
              },
              { label: "Storage Used", current: 2.4, limit: 5, unit: "GB" },
            ]}
            isActive={true}
          />
        </TabsContent>

        <TabsContent value="plan-options" className="mt-0">
          <PlanOptions
            currentPlan={activePlan}
            onUpgrade={handleUpgrade}
            onDowngrade={handleDowngrade}
          />
        </TabsContent>

        <TabsContent value="billing-history" className="mt-0">
          <BillingHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SubscriptionManagement;
