import React from 'react';
import { Card } from '../ui/card';
import { 
  Users, 
  UserCheck, 
  DollarSign, 
  TrendingUp 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatCard = ({ title, value, icon, trend }: StatCardProps) => (
  <Card className="p-6">
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
        {trend && (
          <p className={trend.isPositive ? 'text-green-600' : 'text-red-600'}>
            {trend.isPositive ? '+' : '-'}{trend.value}%
          </p>
        )}
      </div>
      <div className="p-3 bg-gray-100 rounded-full">
        {icon}
      </div>
    </div>
  </Card>
);

export const BusinessStats = () => {
  // This would be fetched from your API
  const stats = {
    totalBusinesses: 120,
    activeBusinesses: 98,
    mrr: 25000,
    growth: 12.5
  };

  return (
    <>
      <StatCard
        title="Total Businesses"
        value={stats.totalBusinesses}
        icon={<Users className="h-6 w-6 text-blue-600" />}
      />
      <StatCard
        title="Active Businesses"
        value={stats.activeBusinesses}
        icon={<UserCheck className="h-6 w-6 text-green-600" />}
        trend={{ value: 5, isPositive: true }}
      />
      <StatCard
        title="Monthly Revenue"
        value={`$${stats.mrr.toLocaleString()}`}
        icon={<DollarSign className="h-6 w-6 text-purple-600" />}
      />
      <StatCard
        title="MoM Growth"
        value={`${stats.growth}%`}
        icon={<TrendingUp className="h-6 w-6 text-orange-600" />}
        trend={{ value: stats.growth, isPositive: true }}
      />
    </>
  );
};
