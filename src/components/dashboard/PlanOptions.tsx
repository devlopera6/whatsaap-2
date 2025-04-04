import React from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface PlanFeature {
  name: string;
  included: boolean;
}

interface PlanProps {
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  popular?: boolean;
  current?: boolean;
  orderLimit: string;
}

interface PlanOptionsProps {
  currentPlan?: string;
  onUpgrade?: (plan: string) => void;
  onDowngrade?: (plan: string) => void;
}

const plans: PlanProps[] = [
  {
    name: "Basic",
    price: "₹499",
    description: "Perfect for small businesses just getting started",
    orderLimit: "100 orders/month",
    features: [
      { name: "WhatsApp Order Bot", included: true },
      { name: "Basic Order Management", included: true },
      { name: "Payment Processing", included: true },
      { name: "Customer Database", included: true },
      { name: "Email Support", included: true },
      { name: "Multi-language Support", included: false },
      { name: "Advanced Analytics", included: false },
      { name: "Custom Branding", included: false },
      { name: "API Access", included: false },
    ],
  },
  {
    name: "Pro",
    price: "₹999",
    description: "Ideal for growing businesses with higher order volume",
    orderLimit: "Unlimited orders",
    popular: true,
    features: [
      { name: "WhatsApp Order Bot", included: true },
      { name: "Advanced Order Management", included: true },
      { name: "Payment Processing", included: true },
      { name: "Customer Database", included: true },
      { name: "Priority Support", included: true },
      { name: "Multi-language Support", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "Custom Branding", included: true },
      { name: "API Access", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "₹1999",
    description: "For established businesses needing complete customization",
    orderLimit: "Unlimited orders",
    features: [
      { name: "WhatsApp Order Bot", included: true },
      { name: "Advanced Order Management", included: true },
      { name: "Payment Processing", included: true },
      { name: "Customer Database", included: true },
      { name: "Dedicated Support", included: true },
      { name: "Multi-language Support", included: true },
      { name: "Advanced Analytics", included: true },
      { name: "Custom Branding", included: true },
      { name: "API Access", included: true },
    ],
  },
];

const PlanCard = ({
  plan,
  currentPlan,
  onUpgrade,
  onDowngrade,
}: {
  plan: PlanProps;
  currentPlan?: string;
  onUpgrade?: (plan: string) => void;
  onDowngrade?: (plan: string) => void;
}) => {
  const isCurrent = currentPlan === plan.name;
  const isUpgrade =
    currentPlan &&
    plans.findIndex((p) => p.name === plan.name) >
      plans.findIndex((p) => p.name === currentPlan);
  const isDowngrade =
    currentPlan &&
    plans.findIndex((p) => p.name === plan.name) <
      plans.findIndex((p) => p.name === currentPlan);

  return (
    <Card
      className={`w-full h-full flex flex-col ${plan.popular ? "border-primary shadow-lg" : "border-border"} bg-card`}
    >
      <CardHeader className="pb-2">
        {plan.popular && (
          <Badge className="w-fit mb-2 bg-primary">Most Popular</Badge>
        )}
        <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{plan.price}</span>
          <span className="text-sm text-muted-foreground ml-2">/month</span>
        </div>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div className="font-medium text-sm">{plan.orderLimit}</div>
          <ul className="space-y-2">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                {feature.included ? (
                  <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                ) : (
                  <X className="h-5 w-5 text-muted-foreground shrink-0 mr-2" />
                )}
                <span
                  className={
                    feature.included
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }
                >
                  {feature.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        {isCurrent ? (
          <Button disabled className="w-full">
            Current Plan
          </Button>
        ) : isUpgrade ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">
                Upgrade <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upgrade to {plan.name} Plan</DialogTitle>
                <DialogDescription>
                  You are about to upgrade from {currentPlan} to {plan.name}{" "}
                  plan. Your billing will be adjusted immediately.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <h4 className="font-medium mb-2">You will get:</h4>
                <ul className="space-y-2">
                  {plan.features
                    .filter(
                      (f) =>
                        f.included &&
                        !plans
                          .find((p) => p.name === currentPlan)
                          ?.features.find(
                            (cf) => cf.name === f.name && cf.included,
                          ),
                    )
                    .map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {}}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => onUpgrade?.(plan.name)}
                  className="w-full sm:w-auto"
                >
                  Confirm Upgrade
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : isDowngrade ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                Downgrade
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Downgrade to {plan.name} Plan</DialogTitle>
                <DialogDescription>
                  You are about to downgrade from {currentPlan} to {plan.name}{" "}
                  plan. Changes will take effect at the end of your current
                  billing cycle.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <h4 className="font-medium mb-2 text-destructive">
                  You will lose:
                </h4>
                <ul className="space-y-2">
                  {plans
                    .find((p) => p.name === currentPlan)
                    ?.features.filter(
                      (f) =>
                        f.included &&
                        !plan.features.find(
                          (pf) => pf.name === f.name && pf.included,
                        ),
                    )
                    .map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <X className="h-5 w-5 text-destructive shrink-0 mr-2" />
                        <span>{feature.name}</span>
                      </li>
                    ))}
                </ul>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => {}}
                  className="w-full sm:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => onDowngrade?.(plan.name)}
                  className="w-full sm:w-auto"
                >
                  Confirm Downgrade
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ) : (
          <Button variant="outline" className="w-full">
            Select Plan
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

const PlanOptions: React.FC<PlanOptionsProps> = ({
  currentPlan = "Basic",
  onUpgrade = () => {},
  onDowngrade = () => {},
}) => {
  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Choose the Right Plan</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Select the plan that best fits your business needs. Upgrade anytime as
          your business grows.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <PlanCard
              plan={plan}
              currentPlan={currentPlan}
              onUpgrade={onUpgrade}
              onDowngrade={onDowngrade}
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">Need a custom solution?</h3>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Contact our sales team for a tailored plan that meets your specific
          business requirements.
        </p>
        <Button size="lg">Contact Sales</Button>
      </div>
    </div>
  );
};

export default PlanOptions;
