import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export const RevenueOverview = () => {
  // This would be fetched from your API
  const revenueData = [
    { date: '2025-03-01', stripe: 4000, razorpay: 2400 },
    { date: '2025-03-02', stripe: 3000, razorpay: 1398 },
    { date: '2025-03-03', stripe: 2000, razorpay: 9800 },
    { date: '2025-03-04', stripe: 2780, razorpay: 3908 },
    { date: '2025-03-05', stripe: 1890, razorpay: 4800 },
    { date: '2025-03-06', stripe: 2390, razorpay: 3800 },
    { date: '2025-03-07', stripe: 3490, razorpay: 4300 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>
        <select className="border rounded p-1">
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => new Date(date).toLocaleDateString()}
            />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="stripe" 
              stroke="#8884d8" 
              name="Stripe"
            />
            <Line 
              type="monotone" 
              dataKey="razorpay" 
              stroke="#82ca9d" 
              name="Razorpay"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600">Total Revenue (Stripe)</p>
          <p className="text-2xl font-bold">$24,500</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600">Total Revenue (Razorpay)</p>
          <p className="text-2xl font-bold">₹15,75,000</p>
        </div>
      </div>
    </div>
  );
};
