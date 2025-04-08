import React from 'react';
import { Card } from '../ui/card';
import { BusinessStats } from './BusinessStats';
import { RevenueOverview } from './RevenueOverview';
import { RecentTransactions } from './RecentTransactions';
import { BusinessList } from './BusinessList';

export const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BusinessStats />
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <RevenueOverview />
        </Card>
        <Card className="p-6">
          <RecentTransactions />
        </Card>
      </div>

      {/* Business List */}
      <Card className="p-6">
        <BusinessList />
      </Card>
    </div>
  );
};
