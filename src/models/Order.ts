export interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  customizations?: Record<string, any>;
}

export interface PaymentDetails {
  method: 'UPI' | 'ONLINE' | 'COD';
  status: 'PENDING' | 'COMPLETED' | 'FAILED';
  transactionId?: string;
  amount: number;
  timestamp: Date;
}

export interface Order {
  id: string;
  businessId: string;
  customerId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'COMPLETED' | 'CANCELLED';
  payment: PaymentDetails;
  deliveryAddress?: string;
  specialInstructions?: string;
  createdAt: Date;
  updatedAt: Date;
  language: string; // Customer's preferred language
  chatHistory?: {
    timestamp: Date;
    message: string;
    sender: 'CUSTOMER' | 'BOT' | 'BUSINESS';
  }[];
}

export interface OrderAnalytics {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  popularProducts: {
    productId: string;
    name: string;
    orderCount: number;
    revenue: number;
  }[];
  paymentMethodStats: {
    method: string;
    count: number;
    totalAmount: number;
  }[];
}