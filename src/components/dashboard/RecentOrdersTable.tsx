import React from "react";
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Eye, MessageCircle, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

interface Order {
  id: string;
  customer: {
    name: string;
    phone: string;
    avatar?: string;
  };
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: OrderStatus;
  paymentStatus: "paid" | "pending" | "failed";
  date: Date;
}

interface RecentOrdersTableProps {
  orders?: Order[];
  onViewOrder?: (orderId: string) => void;
  onMessageCustomer?: (phone: string) => void;
}

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "processing":
      return "bg-blue-100 text-blue-800 hover:bg-blue-100";
    case "completed":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "cancelled":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const getPaymentStatusColor = (status: "paid" | "pending" | "failed") => {
  switch (status) {
    case "paid":
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case "pending":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case "failed":
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
};

const mockOrders: Order[] = [
  {
    id: "ORD-001",
    customer: {
      name: "Rahul Sharma",
      phone: "+91 9876543210",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
    },
    items: [
      { name: "Veg Pizza", quantity: 2, price: 299 },
      { name: "Coke", quantity: 1, price: 60 },
    ],
    total: 658,
    status: "pending",
    paymentStatus: "pending",
    date: new Date(2023, 5, 15, 14, 30),
  },
  {
    id: "ORD-002",
    customer: {
      name: "Priya Patel",
      phone: "+91 8765432109",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
    },
    items: [
      { name: "Chicken Biryani", quantity: 1, price: 250 },
      { name: "Raita", quantity: 1, price: 40 },
    ],
    total: 290,
    status: "processing",
    paymentStatus: "paid",
    date: new Date(2023, 5, 15, 13, 45),
  },
  {
    id: "ORD-003",
    customer: {
      name: "Amit Kumar",
      phone: "+91 7654321098",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
    },
    items: [
      { name: "Masala Dosa", quantity: 2, price: 120 },
      { name: "Filter Coffee", quantity: 2, price: 40 },
    ],
    total: 320,
    status: "completed",
    paymentStatus: "paid",
    date: new Date(2023, 5, 15, 12, 15),
  },
  {
    id: "ORD-004",
    customer: {
      name: "Neha Singh",
      phone: "+91 6543210987",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Neha",
    },
    items: [
      { name: "Paneer Butter Masala", quantity: 1, price: 220 },
      { name: "Butter Naan", quantity: 2, price: 30 },
      { name: "Sweet Lassi", quantity: 1, price: 60 },
    ],
    total: 340,
    status: "cancelled",
    paymentStatus: "failed",
    date: new Date(2023, 5, 15, 11, 30),
  },
  {
    id: "ORD-005",
    customer: {
      name: "Vikram Reddy",
      phone: "+91 5432109876",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vikram",
    },
    items: [{ name: "Veg Thali", quantity: 3, price: 150 }],
    total: 450,
    status: "pending",
    paymentStatus: "pending",
    date: new Date(2023, 5, 15, 10, 45),
  },
];

const RecentOrdersTable: React.FC<RecentOrdersTableProps> = ({
  orders = mockOrders,
  onViewOrder = () => {},
  onMessageCustomer = () => {},
}) => {
  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {order.customer.avatar && (
                        <img
                          src={order.customer.avatar}
                          alt={order.customer.name}
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                      <div>
                        <div className="font-medium">{order.customer.name}</div>
                        <div className="text-xs text-gray-500">
                          {order.customer.phone}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-[200px] truncate">
                      {order.items.map((item, i) => (
                        <span key={i}>
                          {item.quantity}x {item.name}
                          {i < order.items.length - 1 ? ", " : ""}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>₹{order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge
                      className={getStatusColor(order.status)}
                      variant="outline"
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={getPaymentStatusColor(order.paymentStatus)}
                      variant="outline"
                    >
                      {order.paymentStatus.charAt(0).toUpperCase() +
                        order.paymentStatus.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{format(order.date, "MMM dd, h:mm a")}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onViewOrder(order.id)}
                        title="View Order"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onMessageCustomer(order.customer.phone)}
                        title="Message Customer"
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => onViewOrder(order.id)}
                          >
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() =>
                              onMessageCustomer(order.customer.phone)
                            }
                          >
                            Message Customer
                          </DropdownMenuItem>
                          <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        {orders.length === 0 && (
          <div className="py-24 text-center text-gray-500">
            No recent orders found
          </div>
        )}
        {orders.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Button variant="outline" className="text-sm">
              View All Orders
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentOrdersTable;
