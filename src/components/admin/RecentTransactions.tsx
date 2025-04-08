import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

export const RecentTransactions = () => {
  // This would be fetched from your API
  const transactions = [
    {
      id: '1',
      businessName: 'Tech Store',
      amount: 499,
      status: 'succeeded',
      paymentMethod: 'stripe',
      date: '2025-04-06T06:48:00Z'
    },
    // Add more sample data as needed
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'succeeded':
        return 'bg-green-100 text-green-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'refunded':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Recent Transactions</h3>
        <button className="text-sm text-blue-600">View all</button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Business</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell className="font-medium">
                {transaction.businessName}
              </TableCell>
              <TableCell>
                ${transaction.amount}
                <span className="ml-1 text-xs text-gray-500">
                  ({transaction.paymentMethod})
                </span>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  getStatusColor(transaction.status)
                }`}>
                  {transaction.status}
                </span>
              </TableCell>
              <TableCell>
                {new Date(transaction.date).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
