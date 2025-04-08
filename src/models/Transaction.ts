export interface Transaction {
  id: string;
  businessId: string;
  amount: number;
  currency: string;
  status: 'succeeded' | 'failed' | 'refunded';
  paymentMethod: 'stripe' | 'razorpay';
  paymentId: string;
  description: string;
  createdAt: Date;
  metadata?: Record<string, any>;
}

export interface RevenueMetrics {
  totalRevenue: number;
  mrr: number;
  dailyRevenue: { date: string; amount: number }[];
  monthlyRevenue: { month: string; amount: number }[];
  topBusinesses: {
    businessId: string;
    businessName: string;
    totalSpent: number;
  }[];
}
