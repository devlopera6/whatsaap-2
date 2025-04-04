import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import BusinessProfileForm from "./BusinessProfileForm";
import WhatsAppBotConfig from "./WhatsAppBotConfig";
import { Settings as SettingsIcon, User, Bot } from "lucide-react";

interface SettingsProps {
  activeTab?: string;
}

const Settings = ({ activeTab = "profile" }: SettingsProps) => {
  const [currentTab, setCurrentTab] = useState(activeTab);

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your business profile and WhatsApp bot configuration
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid w-full md:w-auto grid-cols-2 mb-8">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Business Profile
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            WhatsApp Bot
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Business Profile Settings
              </CardTitle>
              <CardDescription>
                Update your business information and branding details
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BusinessProfileForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="whatsapp" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-5 w-5" />
                WhatsApp Bot Configuration
              </CardTitle>
              <CardDescription>
                Configure your WhatsApp bot's behavior and message templates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <WhatsAppBotConfig />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
