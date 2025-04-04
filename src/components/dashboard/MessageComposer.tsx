import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  Image,
  Smile,
  PlusCircle,
  Users,
  ChevronDown,
  Clock,
  Save,
  X,
} from "lucide-react";

interface MessageComposerProps {
  selectedCustomers?: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  }[];
  templates?: {
    id: string;
    name: string;
    content: string;
    type: "promotional" | "transactional" | "update";
  }[];
  onSendMessage?: (message: {
    content: string;
    recipients: string[];
    scheduledTime?: Date;
    isTemplate: boolean;
  }) => void;
}

const MessageComposer = ({
  selectedCustomers = [
    {
      id: "1",
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    {
      id: "2",
      name: "Priya Patel",
      phone: "+91 87654 32109",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    {
      id: "3",
      name: "Amit Kumar",
      phone: "+91 76543 21098",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    },
  ],
  templates = [
    {
      id: "t1",
      name: "Order Confirmation",
      content:
        "Thank you for your order! Your order #{{order_id}} has been confirmed and will be processed shortly.",
      type: "transactional",
    },
    {
      id: "t2",
      name: "Delivery Update",
      content:
        "Your order #{{order_id}} is out for delivery and will arrive shortly. Track your order here: {{tracking_link}}",
      type: "update",
    },
    {
      id: "t3",
      name: "Special Offer",
      content:
        "Exclusive offer for you! Get 20% off on your next order with code: SPECIAL20. Valid until {{valid_date}}.",
      type: "promotional",
    },
    {
      id: "t4",
      name: "Payment Reminder",
      content:
        "Gentle reminder: Your payment for order #{{order_id}} is pending. Please complete the payment using this link: {{payment_link}}",
      type: "transactional",
    },
  ],
  onSendMessage = () => {},
}: MessageComposerProps) => {
  const [messageText, setMessageText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduledTime, setScheduledTime] = useState("");
  const [showRecipientSelector, setShowRecipientSelector] = useState(false);
  const [activeTab, setActiveTab] = useState("compose");

  const handleTemplateSelect = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setMessageText(template.content);
      setSelectedTemplate(templateId);
    }
  };

  const handleRecipientToggle = (customerId: string) => {
    setSelectedRecipients((prev) =>
      prev.includes(customerId)
        ? prev.filter((id) => id !== customerId)
        : [...prev, customerId],
    );
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    onSendMessage({
      content: messageText,
      recipients:
        selectedRecipients.length > 0
          ? selectedRecipients
          : selectedCustomers.map((c) => c.id),
      scheduledTime: isScheduled ? new Date(scheduledTime) : undefined,
      isTemplate: selectedTemplate !== "",
    });

    // Reset form
    setMessageText("");
    setSelectedTemplate("");
    setSelectedRecipients([]);
    setIsScheduled(false);
    setScheduledTime("");
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-semibold flex items-center">
          <Send className="mr-2 h-5 w-5" />
          Message Composer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="compose">Compose Message</TabsTrigger>
            <TabsTrigger value="templates">Message Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="compose" className="space-y-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setShowRecipientSelector(!showRecipientSelector)
                    }
                    className="flex items-center"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Recipients
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                  <Badge variant="outline" className="text-sm">
                    {selectedRecipients.length > 0
                      ? `${selectedRecipients.length} selected`
                      : "All customers"}
                  </Badge>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="schedule"
                    checked={isScheduled}
                    onCheckedChange={setIsScheduled}
                  />
                  <Label htmlFor="schedule">Schedule</Label>
                  {isScheduled && (
                    <Input
                      type="datetime-local"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="w-auto"
                    />
                  )}
                </div>
              </div>

              {showRecipientSelector && (
                <Card className="border rounded-md p-2">
                  <ScrollArea className="h-48 w-full">
                    <div className="space-y-2 p-2">
                      {selectedCustomers.map((customer) => (
                        <div
                          key={customer.id}
                          className={`flex items-center justify-between p-2 rounded-md ${selectedRecipients.includes(customer.id) ? "bg-slate-100" : ""}`}
                          onClick={() => handleRecipientToggle(customer.id)}
                        >
                          <div className="flex items-center space-x-3">
                            <Avatar className="h-8 w-8">
                              <img src={customer.avatar} alt={customer.name} />
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {customer.name}
                              </p>
                              <p className="text-xs text-slate-500">
                                {customer.phone}
                              </p>
                            </div>
                          </div>
                          <Switch
                            checked={selectedRecipients.includes(customer.id)}
                            onCheckedChange={() =>
                              handleRecipientToggle(customer.id)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              )}

              <div>
                <Label htmlFor="message">Message</Label>
                <div className="mt-1 relative">
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                  <div className="absolute bottom-2 right-2 flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Image className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Smile className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-xs text-slate-500">
                    {messageText.length} characters
                  </div>
                  <div>
                    <Select
                      value={selectedTemplate}
                      onValueChange={handleTemplateSelect}
                    >
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Use template" />
                      </SelectTrigger>
                      <SelectContent>
                        {templates.map((template) => (
                          <SelectItem key={template.id} value={template.id}>
                            {template.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Saved Templates</h3>
              <Button size="sm">
                <PlusCircle className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </div>

            <ScrollArea className="h-64 w-full">
              <div className="space-y-3">
                {templates.map((template) => (
                  <Card key={template.id} className="p-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{template.name}</h4>
                        <Badge variant="outline" className="mt-1">
                          {template.type}
                        </Badge>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setMessageText(template.content);
                            setActiveTab("compose");
                          }}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <Separator className="my-2" />
                    <p className="text-sm text-slate-600">{template.content}</p>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="flex items-center text-sm text-slate-500">
          {isScheduled ? (
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              Scheduled for: {new Date(scheduledTime).toLocaleString()}
            </div>
          ) : (
            <div>Message will be sent immediately</div>
          )}
        </div>
        <Button
          onClick={handleSendMessage}
          disabled={!messageText.trim()}
          className="flex items-center"
        >
          <Send className="h-4 w-4 mr-2" />
          {isScheduled ? "Schedule Message" : "Send Message"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MessageComposer;
