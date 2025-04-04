import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Save,
  MessageSquare,
  Languages,
  Bot,
  Zap,
  Clock,
  RefreshCw,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  welcomeMessage: z.string().min(10, {
    message: "Welcome message must be at least 10 characters.",
  }),
  orderConfirmationTemplate: z.string().min(10, {
    message: "Order confirmation template must be at least 10 characters.",
  }),
  paymentReminderTemplate: z.string().min(10, {
    message: "Payment reminder template must be at least 10 characters.",
  }),
  outOfStockTemplate: z.string().min(10, {
    message: "Out of stock template must be at least 10 characters.",
  }),
  defaultLanguage: z.string(),
  autoReplyEnabled: z.boolean(),
  orderDetectionSensitivity: z.string(),
  responseDelay: z.string(),
  autoFollowUpEnabled: z.boolean(),
  followUpInterval: z.string(),
});

const WhatsAppBotConfig = ({ config = defaultConfig }) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("messages");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      welcomeMessage: config.welcomeMessage,
      orderConfirmationTemplate: config.orderConfirmationTemplate,
      paymentReminderTemplate: config.paymentReminderTemplate,
      outOfStockTemplate: config.outOfStockTemplate,
      defaultLanguage: config.defaultLanguage,
      autoReplyEnabled: config.autoReplyEnabled,
      orderDetectionSensitivity: config.orderDetectionSensitivity,
      responseDelay: config.responseDelay,
      autoFollowUpEnabled: config.autoFollowUpEnabled,
      followUpInterval: config.followUpInterval,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real app, this would save the configuration to the backend
    console.log(values);
    toast({
      title: "Configuration saved",
      description: "Your WhatsApp bot configuration has been updated.",
    });
  }

  return (
    <div className="w-full bg-white p-6 rounded-lg">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">WhatsApp Bot Configuration</h1>
        <p className="text-muted-foreground">
          Configure your WhatsApp bot's behavior and message templates
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs
            defaultValue="messages"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Message Templates
              </TabsTrigger>
              <TabsTrigger value="language">
                <Languages className="mr-2 h-4 w-4" />
                Language Settings
              </TabsTrigger>
              <TabsTrigger value="ai">
                <Bot className="mr-2 h-4 w-4" />
                AI Configuration
              </TabsTrigger>
              <TabsTrigger value="automation">
                <Zap className="mr-2 h-4 w-4" />
                Automation
              </TabsTrigger>
            </TabsList>

            <TabsContent value="messages" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Message Templates</CardTitle>
                  <CardDescription>
                    Customize the messages your WhatsApp bot sends to customers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="welcomeMessage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Welcome Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Hello! Welcome to our store. How can I help you today?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          This message is sent when a customer messages you for
                          the first time.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="orderConfirmationTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Confirmation Template</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Thank you for your order! Your order #{{order_id}} has been confirmed. Total: ₹{{amount}}."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use &#123;&#123; order_id &#125;&#125;, &#123;&#123;
                          amount &#125;&#125;, &#123;&#123; items &#125;&#125;
                          as placeholders.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="paymentReminderTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Payment Reminder Template</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Reminder: Your order #{{order_id}} is waiting for payment. Click here to pay: {{payment_link}}"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use &#123;&#123; order_id &#125;&#125;, &#123;&#123;
                          payment_link &#125;&#125;, &#123;&#123; amount
                          &#125;&#125; as placeholders.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="outOfStockTemplate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Out of Stock Template</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Sorry, {{item_name}} is currently out of stock. Would you like to try {{alternative_item}} instead?"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Use &#123;&#123; item_name &#125;&#125;, &#123;&#123;
                          alternative_item &#125;&#125; as placeholders.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Language Settings</CardTitle>
                  <CardDescription>
                    Configure language preferences for your WhatsApp bot
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="defaultLanguage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Default Language</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a language" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="hi">Hindi</SelectItem>
                            <SelectItem value="ta">Tamil</SelectItem>
                            <SelectItem value="te">Telugu</SelectItem>
                            <SelectItem value="mr">Marathi</SelectItem>
                            <SelectItem value="bn">Bengali</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The bot will use this language if it cannot detect the
                          customer's language.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="p-4 border rounded-md bg-muted/50">
                    <h3 className="font-medium mb-2">Language Detection</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The bot automatically detects and responds in the
                      customer's language when possible. Supported languages:
                      English, Hindi, Tamil, Telugu, Marathi, Bengali.
                    </p>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm" className="gap-2">
                        <RefreshCw className="h-4 w-4" />
                        Test Language Detection
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ai" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>AI Configuration</CardTitle>
                  <CardDescription>
                    Configure the AI order detection and natural language
                    processing settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="orderDetectionSensitivity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order Detection Sensitivity</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select sensitivity level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high">
                              High (Detect most potential orders)
                            </SelectItem>
                            <SelectItem value="medium">
                              Medium (Balanced detection)
                            </SelectItem>
                            <SelectItem value="low">
                              Low (Only detect clear orders)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Higher sensitivity may detect more orders but with
                          more false positives.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="p-4 border rounded-md bg-muted/50">
                    <h3 className="font-medium mb-2">AI Learning Status</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      The AI model improves as it processes more orders. Current
                      learning status:
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <span className="text-sm font-medium">
                        Active and learning
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Orders processed: 247 | Accuracy rate: 94%
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div>
                      <h3 className="font-medium">Test AI Order Detection</h3>
                      <p className="text-sm text-muted-foreground">
                        Enter a sample message to test how the AI detects orders
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Test Detection
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Automation Settings</CardTitle>
                  <CardDescription>
                    Configure automated responses and follow-ups
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="autoReplyEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Auto-Reply
                          </FormLabel>
                          <FormDescription>
                            Automatically respond to customer messages
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="responseDelay"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Response Delay</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select delay time" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="instant">Instant</SelectItem>
                            <SelectItem value="5s">5 seconds</SelectItem>
                            <SelectItem value="10s">10 seconds</SelectItem>
                            <SelectItem value="30s">30 seconds</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Add a slight delay to make responses feel more natural
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="autoFollowUpEnabled"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">
                            Auto Follow-Up
                          </FormLabel>
                          <FormDescription>
                            Automatically follow up on abandoned orders
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="followUpInterval"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Follow-Up Interval</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select follow-up interval" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1h">1 hour</SelectItem>
                            <SelectItem value="3h">3 hours</SelectItem>
                            <SelectItem value="6h">6 hours</SelectItem>
                            <SelectItem value="12h">12 hours</SelectItem>
                            <SelectItem value="24h">24 hours</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Time to wait before sending a follow-up message for
                          abandoned orders
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="p-4 border rounded-md bg-muted/50 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Business Hours</h3>
                      <p className="text-sm text-muted-foreground">
                        Configure when the bot should be active
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Clock className="h-4 w-4" />
                      Set Hours
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end">
            <Button type="submit" className="gap-2">
              <Save className="h-4 w-4" />
              Save Configuration
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

// Default configuration values
const defaultConfig = {
  welcomeMessage: "Hello! Welcome to our store. How can I help you today?",
  orderConfirmationTemplate:
    "Thank you for your order! Your order #{{order_id}} has been confirmed. Total: ₹{{amount}}.",
  paymentReminderTemplate:
    "Reminder: Your order #{{order_id}} is waiting for payment. Click here to pay: {{payment_link}}.",
  outOfStockTemplate:
    "Sorry, {{item_name}} is currently out of stock. Would you like to try {{alternative_item}} instead?",
  defaultLanguage: "en",
  autoReplyEnabled: true,
  orderDetectionSensitivity: "medium",
  responseDelay: "5s",
  autoFollowUpEnabled: true,
  followUpInterval: "6h",
};

export default WhatsAppBotConfig;
