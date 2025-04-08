import React, { useState } from 'react';
import { Card } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Button } from '../ui/button';
import { DateRangePicker } from './DateRangePicker';
import { DateRange } from 'react-day-picker';
import { addDays, subDays } from 'date-fns';

interface BusinessDetailsProps {
  businessId: string;
}

export const BusinessDetails = ({ businessId }: BusinessDetailsProps) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  // Sample data - replace with actual API calls
  const businessData = {
    name: 'Spice Garden Restaurant',
    email: 'contact@spicegarden.com',
    whatsappNumber: '+91 9876543210',
    industry: 'Restaurant',
    status: 'Active',
    plan: 'Pro',
    createdDate: '2023-05-15',
    stats: {
      totalOrders: 1250,
      monthlyOrders: 150,
      totalRevenue: 125000,
      activeCustomers: 450
    },
    revenueData: [
      { date: '2025-03-01', amount: 12000 },
      { date: '2025-03-15', amount: 15000 },
      { date: '2025-03-30', amount: 18000 },
      { date: '2025-04-01', amount: 16000 },
      { date: '2025-04-06', amount: 21000 }
    ],
    orderData: [
      { date: '2025-03-01', completed: 100, cancelled: 10 },
      { date: '2025-03-15', completed: 120, cancelled: 8 },
      { date: '2025-03-30', completed: 150, cancelled: 12 },
      { date: '2025-04-01', completed: 130, cancelled: 15 },
      { date: '2025-04-06', completed: 180, cancelled: 20 }
    ]
  };

  const handleDateRangeChange = (newDateRange: DateRange | undefined) => {
    setDateRange(newDateRange);
    // Here you would fetch new data based on the date range
  };

  // Filter data based on selected date range
  const filterDataByDateRange = (data: any[]) => {
    if (!dateRange?.from || !dateRange?.to) return data;
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= dateRange.from && itemDate <= dateRange.to;
    });
  };

  return (
    <div className="space-y-6">
      {/* Business Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold">{businessData.name}</h2>
          <p className="text-gray-500">{businessData.industry}</p>
        </div>
        <div className="space-x-2">
          <Button variant="outline">Edit Details</Button>
          <Button variant="destructive">Deactivate Business</Button>
        </div>
      </div>

      {/* Date Range Picker */}
      <div className="flex justify-end">
        <DateRangePicker
          date={dateRange}
          onDateChange={handleDateRangeChange}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-500">Total Orders</p>
          <p className="text-2xl font-bold">{businessData.stats.totalOrders}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Orders (Selected Period)</p>
          <p className="text-2xl font-bold">{businessData.stats.monthlyOrders}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Revenue (Selected Period)</p>
          <p className="text-2xl font-bold">₹{businessData.stats.totalRevenue}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-500">Active Customers</p>
          <p className="text-2xl font-bold">{businessData.stats.activeCustomers}</p>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Card className="p-6">
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Business Information</h3>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{businessData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp Number</p>
                    <p>{businessData.whatsappNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Plan</p>
                    <p>{businessData.plan}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p>{businessData.createdDate}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Revenue Overview</h3>
                <div className="h-[200px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={filterDataByDateRange(businessData.revenueData)}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="date"
                        tickFormatter={(date) => new Date(date).toLocaleDateString()}
                      />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(date) => new Date(date).toLocaleDateString()}
                      />
                      <Line type="monotone" dataKey="amount" stroke="#8884d8" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Order Analytics</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={filterDataByDateRange(businessData.orderData)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date"
                      tickFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <YAxis />
                    <Tooltip 
                      labelFormatter={(date) => new Date(date).toLocaleDateString()}
                    />
                    <Bar dataKey="completed" fill="#8884d8" name="Completed Orders" />
                    <Bar dataKey="cancelled" fill="#ff8042" name="Cancelled Orders" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Customer Management</h3>
              {/* Add customer management content */}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Business Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Business Name</label>
                  <Input defaultValue={businessData.name} className="mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">WhatsApp Number</label>
                  <Input defaultValue={businessData.whatsappNumber} className="mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Industry</label>
                  <select className="mt-1 block w-full border rounded-md p-2">
                    <option>Restaurant</option>
                    <option>Retail</option>
                    <option>Fashion</option>
                    <option>Technology</option>
                    <option>Healthcare</option>
                  </select>
                </div>
                <Button>Save Changes</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
