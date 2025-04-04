import React, { useState } from "react";
import { format } from "date-fns";
import {
  Download,
  ChevronDown,
  Search,
  Filter,
  ArrowUpDown,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Transaction {
  id: string;
  orderId: string;
  customer: string;
  amount: number;
  status: "successful" | "pending" | "failed";
  date: Date;
  paymentMethod: string;
}

interface TransactionsTableProps {
  transactions?: Transaction[];
  onViewDetails?: (transactionId: string) => void;
  onDownloadInvoice?: (transactionId: string) => void;
}

const TransactionsTable = ({
  transactions = [
    {
      id: "txn-001",
      orderId: "ORD-001",
      customer: "Rahul Sharma",
      amount: 1250.0,
      status: "successful",
      date: new Date(2023, 5, 15, 14, 30),
      paymentMethod: "UPI",
    },
    {
      id: "txn-002",
      orderId: "ORD-002",
      customer: "Priya Patel",
      amount: 850.5,
      status: "successful",
      date: new Date(2023, 5, 15, 10, 15),
      paymentMethod: "Credit Card",
    },
    {
      id: "txn-003",
      orderId: "ORD-003",
      customer: "Amit Kumar",
      amount: 2100.0,
      status: "pending",
      date: new Date(2023, 5, 14, 18, 45),
      paymentMethod: "UPI",
    },
    {
      id: "txn-004",
      orderId: "ORD-004",
      customer: "Sneha Gupta",
      amount: 1500.0,
      status: "failed",
      date: new Date(2023, 5, 14, 16, 20),
      paymentMethod: "Debit Card",
    },
    {
      id: "txn-005",
      orderId: "ORD-005",
      customer: "Vikram Singh",
      amount: 3200.0,
      status: "successful",
      date: new Date(2023, 5, 14, 12, 10),
      paymentMethod: "Net Banking",
    },
    {
      id: "txn-006",
      orderId: "ORD-006",
      customer: "Neha Verma",
      amount: 950.0,
      status: "successful",
      date: new Date(2023, 5, 13, 20, 30),
      paymentMethod: "UPI",
    },
    {
      id: "txn-007",
      orderId: "ORD-007",
      customer: "Rajesh Khanna",
      amount: 1800.0,
      status: "pending",
      date: new Date(2023, 5, 13, 15, 45),
      paymentMethod: "Credit Card",
    },
  ],
  onViewDetails = () => {},
  onDownloadInvoice = () => {},
}: TransactionsTableProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Filter transactions based on search term and status filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.orderId.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter
      ? transaction.status === statusFilter
      : true;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "successful":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Transaction History
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search by customer or order ID"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-full"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {statusFilter ? `Status: ${statusFilter}` : "Filter by Status"}
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setStatusFilter(null)}>
                All Statuses
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("successful")}>
                Successful
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                Pending
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter("failed")}>
                Failed
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Transaction ID</TableHead>
              <TableHead className="w-[100px]">Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Amount
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <div className="flex items-center">
                  Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.id}
                  </TableCell>
                  <TableCell>{transaction.orderId}</TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>₹{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={getStatusBadgeColor(transaction.status)}
                    >
                      {transaction.status.charAt(0).toUpperCase() +
                        transaction.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(transaction.date, "dd MMM yyyy, HH:mm")}
                  </TableCell>
                  <TableCell>{transaction.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewDetails(transaction.id)}
                      >
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-1"
                        onClick={() => onDownloadInvoice(transaction.id)}
                      >
                        <Download className="h-3 w-3" />
                        Invoice
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={8}
                  className="text-center py-6 text-gray-500"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default TransactionsTable;
