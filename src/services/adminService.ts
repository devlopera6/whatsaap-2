import { Business, BusinessAnalytics } from '../models/Business';
import { Transaction } from '../models/Transaction';

const API_BASE_URL = '/api/admin';

export const adminService = {
  // Business Management
  async getBusinesses(filters?: {
    status?: string;
    plan?: string;
    searchQuery?: string;
  }): Promise<Business[]> {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/businesses?${queryParams}`);
    return response.json();
  },

  async getBusinessDetails(id: string): Promise<Business> {
    const response = await fetch(`${API_BASE_URL}/businesses/${id}`);
    return response.json();
  },

  async updateBusinessStatus(id: string, status: string): Promise<Business> {
    const response = await fetch(`${API_BASE_URL}/businesses/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return response.json();
  },

  // Analytics
  async getDashboardStats(): Promise<{
    totalBusinesses: number;
    activeBusinesses: number;
    totalRevenue: number;
    mrr: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/stats/dashboard`);
    return response.json();
  },

  async getRevenueAnalytics(period: 'daily' | 'monthly' | 'yearly'): Promise<{
    data: { date: string; amount: number }[];
    total: number;
    growth: number;
  }> {
    const response = await fetch(`${API_BASE_URL}/stats/revenue?period=${period}`);
    return response.json();
  },

  async getBusinessAnalytics(id: string): Promise<BusinessAnalytics> {
    const response = await fetch(`${API_BASE_URL}/businesses/${id}/analytics`);
    return response.json();
  },

  // Transactions
  async getTransactions(filters?: {
    startDate?: string;
    endDate?: string;
    status?: string;
  }): Promise<Transaction[]> {
    const queryParams = new URLSearchParams(filters);
    const response = await fetch(`${API_BASE_URL}/transactions?${queryParams}`);
    return response.json();
  },

  // Subscription Management
  async updateSubscription(businessId: string, plan: string): Promise<Business> {
    const response = await fetch(`${API_BASE_URL}/businesses/${businessId}/subscription`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan }),
    });
    return response.json();
  },

  // System Health
  async getSystemHealth(): Promise<{
    apiStatus: string;
    databaseStatus: string;
    whatsappStatus: string;
    paymentGatewayStatus: string;
    lastChecked: Date;
  }> {
    const response = await fetch(`${API_BASE_URL}/system/health`);
    return response.json();
  },

  async getLogs(type: 'error' | 'payment' | 'system'): Promise<{
    timestamp: Date;
    type: string;
    message: string;
    details: any;
  }[]> {
    const response = await fetch(`${API_BASE_URL}/system/logs?type=${type}`);
    return response.json();
  },
};
