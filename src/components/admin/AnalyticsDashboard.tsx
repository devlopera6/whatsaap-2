import React, { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import {
  LineChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { adminService } from '../../services/adminService';
import { DateRangePicker } from './DateRangePicker';
import { DateRange } from 'react-day-picker';
import { addDays, subDays } from 'date-fns';

export const AnalyticsDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subDays(new Date(), 30),
    to: new Date(),
  });
  const [revenueData, setRevenueData] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stats, revenue] = await Promise.all([
          adminService.getDashboardStats(),
          adminService.getRevenueAnalytics('daily')
        ]);
        setDashboardStats(stats);
        setRevenueData(revenue);
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dateRange]);

  const filterDataByDateRange = (data: any[]) => {
    if (!dateRange?.from || !dateRange?.to || !data) return data;
    return data.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= dateRange.from && itemDate <= dateRange.to;
    });
  };

  if (isLoading) {
    return <div>Loading analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header with Date Range */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <DateRangePicker
          date={dateRange}
          onDateChange={(newDateRange) => setDateRange(newDateRange)}
        />
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Businesses</h3>
          <p className="text-2xl font-bold mt-2">{dashboardStats?.totalBusinesses}</p>
          <p className="text-sm text-gray-500 mt-1">In selected period</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Active Businesses</h3>
          <p className="text-2xl font-bold mt-2">{dashboardStats?.activeBusinesses}</p>
          <p className="text-sm text-gray-500 mt-1">Currently active</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
          <p className="text-2xl font-bold mt-2">₹{dashboardStats?.totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-500 mt-1">In selected period</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-gray-500">Monthly Recurring Revenue</h3>
          <p className="text-2xl font-bold mt-2">₹{dashboardStats?.mrr.toLocaleString()}/mo</p>
          <p className="text-sm text-gray-500 mt-1">Current MRR</p>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Revenue Overview</h3>
          <p className="text-sm text-gray-500">Daily revenue for the selected period</p>
        </div>

        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filterDataByDateRange(revenueData?.data)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip 
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                name="Revenue"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-500">Total Revenue (Period)</p>
            <p className="text-xl font-bold">₹{revenueData?.total.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-500">Growth vs Previous Period</p>
            <p className={`text-xl font-bold ${
              revenueData?.growth >= 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              {revenueData?.growth >= 0 ? '+' : ''}{revenueData?.growth}%
            </p>
          </div>
        </div>
      </Card>

      {/* Business Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Plan Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { plan: 'Basic', count: 45 },
                { plan: 'Pro', count: 30 },
                { plan: 'Enterprise', count: 15 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="plan" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-6">Industry Distribution</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { industry: 'Restaurant', count: 35 },
                { industry: 'Retail', count: 25 },
                { industry: 'Services', count: 20 },
                { industry: 'Others', count: 10 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="industry" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
