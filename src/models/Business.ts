export interface Business {
  id: string;
  name: string;
  email: string;
  whatsappNumber: string;
  industry: string;
  status: 'active' | 'inactive' | 'suspended';
  plan: 'basic' | 'pro' | 'enterprise';
  signupDate: Date;
  apiKey: string;
  gupshupApiKey?: string;
  lastActive: Date;
  subscription: {
    id: string;
    status: string;
    currentPeriodEnd: Date;
    plan: string;
    amount: number;
    currency: string;
  };
  stats: {
    totalOrders: number;
    monthlyOrders: number;
    totalRevenue: number;
    activeCustomers: number;
  };
  settings: {
    autoReply: boolean;
    languagePreference: string[];
    businessHours: {
      start: string;
      end: string;
      timezone: string;
    };
    paymentMethods: ('razorpay' | 'paytm' | 'stripe')[];
  };
}

export interface BusinessAnalytics {
  totalMessages: number;
  activeCustomers: number;
  responseRate: number;
  averageResponseTime: number;
  orderSuccess: number;
  orderCancellation: number;
  revenue: {
    daily: { date: string; amount: number }[];
    monthly: { month: string; amount: number }[];
    yearly: { year: string; amount: number }[];
  };
  customerGrowth: {
    date: string;
    newCustomers: number;
    totalCustomers: number;
  }[];
  messageAnalytics: {
    date: string;
    sent: number;
    received: number;
    automated: number;
  }[];
}
