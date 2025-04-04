import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Search, Filter, MessageSquare, Plus, Clock, Star } from "lucide-react";
import MessageComposer from "./MessageComposer";

interface MessagesTabProps {
  selectedCustomers?: {
    id: string;
    name: string;
    phone: string;
    avatar?: string;
  }[];
}

const MessagesTab = ({ selectedCustomers }: MessagesTabProps) => {
  const [activeTab, setActiveTab] = useState("inbox");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock conversation data
  const conversations = [
    {
      id: "1",
      customer: {
        id: "c1",
        name: "Rahul Sharma",
        phone: "+91 98765 43210",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
      },
      lastMessage: {
        text: "I'd like to place an order for 2 veg pizzas and a coke.",
        time: "10:30 AM",
        isRead: false,
        isFromCustomer: true,
      },
      unreadCount: 2,
    },
    {
      id: "2",
      customer: {
        id: "c2",
        name: "Priya Patel",
        phone: "+91 87654 32109",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
      },
      lastMessage: {
        text: "Thank you for the quick delivery!",
        time: "Yesterday",
        isRead: true,
        isFromCustomer: true,
      },
      unreadCount: 0,
    },
    {
      id: "3",
      customer: {
        id: "c3",
        name: "Amit Kumar",
        phone: "+91 76543 21098",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
      },
      lastMessage: {
        text: "Your order has been confirmed and will be delivered in 30 minutes.",
        time: "Yesterday",
        isRead: true,
        isFromCustomer: false,
      },
      unreadCount: 0,
    },
  ];

  // Filter conversations based on search term
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.customer.phone.includes(searchTerm) ||
      conv.lastMessage.text.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Handle sending a message
  const handleSendMessage = (message: {
    content: string;
    recipients: string[];
    scheduledTime?: Date;
    isTemplate: boolean;
  }) => {
    console.log("Message sent:", message);
    // In a real implementation, this would call an API to send the message
  };

  return (
    <div className="w-full h-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Messages</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Conversations List */}
        <div className="lg:col-span-1 border rounded-md overflow-hidden">
          <div className="p-3 border-b bg-muted/30">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="inbox" className="text-xs">
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="text-xs">
                  Scheduled
                </TabsTrigger>
                <TabsTrigger value="starred" className="text-xs">
                  Starred
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <ScrollArea className="h-[calc(100vh-300px)]">
            <div className="p-0">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center p-3 hover:bg-gray-50 cursor-pointer ${conversation.unreadCount > 0 ? "bg-blue-50" : ""}`}
                  >
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src={conversation.customer.avatar} />
                      <AvatarFallback>
                        {conversation.customer.name
                          .substring(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium text-sm truncate">
                          {conversation.customer.name}
                        </h4>
                        <span className="text-xs text-gray-500">
                          {conversation.lastMessage.time}
                        </span>
                      </div>
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-gray-600 truncate max-w-[180px]">
                          {conversation.lastMessage.isFromCustomer
                            ? ""
                            : "You: "}
                          {conversation.lastMessage.text}
                        </p>
                        {conversation.unreadCount > 0 && (
                          <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                            {conversation.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-gray-500">
                  No conversations found
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Message Composer */}
        <div className="lg:col-span-2">
          <TabsContent value="inbox" className="m-0">
            <Card>
              <CardContent className="p-0">
                <div className="border-b p-4 flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul" />
                      <AvatarFallback>RS</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Rahul Sharma</h4>
                      <p className="text-xs text-gray-500">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                      <Star className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Clock className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <MessageComposer onSendMessage={handleSendMessage} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="scheduled" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <Clock className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">
                    Scheduled Messages
                  </h3>
                  <p className="text-gray-500 text-center mt-2 max-w-md">
                    You can schedule messages to be sent at a specific time.
                    Your scheduled messages will appear here.
                  </p>
                  <Button className="mt-4">
                    <Plus className="h-4 w-4 mr-2" />
                    Schedule a Message
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="starred" className="m-0">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-12">
                  <Star className="h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">
                    Starred Conversations
                  </h3>
                  <p className="text-gray-500 text-center mt-2 max-w-md">
                    Star important conversations to find them quickly. Your
                    starred conversations will appear here.
                  </p>
                  <Button variant="outline" className="mt-4">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    View All Conversations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </div>
    </div>
  );
};

export default MessagesTab;
