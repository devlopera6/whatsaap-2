import React, { useState } from "react";
import { format } from "date-fns";
import {
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  TruckIcon,
  Package,
  Download,
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
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    avatar?: string;
  };
  products: {
    name: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed";
  date: Date;
}

interface OrdersTableProps {
  orders?: Order[];
  onViewOrder?: (orderId: string) => void;
  onEditOrder?: (orderId: string) => void;
  onDeleteOrder?: (orderId: string) => void;
  onUpdateStatus?: (orderId: string, status: Order["status"]) => void;
}

const getStatusBadgeVariant = (status: Order["status"]) => {
  switch (status) {
    case "new":
      return "secondary";
    case "processing":
      return "default";
    case "shipped":
      return "default";
    case "delivered":
      return "secondary";
    case "cancelled":
      return "destructive";
    default:
      return "default";
  }
};

const getPaymentStatusBadgeVariant = (status: Order["paymentStatus"]) => {
  switch (status) {
    case "paid":
      return "secondary";
    case "pending":
      return "default";
    case "failed":
      return "destructive";
    default:
      return "default";
  }
};

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "new":
      return <Package className="mr-1 h-3 w-3" />;
    case "processing":
      return <CheckCircle className="mr-1 h-3 w-3" />;
    case "shipped":
      return <TruckIcon className="mr-1 h-3 w-3" />;
    case "delivered":
      return <CheckCircle className="mr-1 h-3 w-3" />;
    case "cancelled":
      return <XCircle className="mr-1 h-3 w-3" />;
    default:
      return null;
  }
};

const OrdersTable: React.FC<OrdersTableProps> = ({
  orders = defaultOrders,
  onViewOrder = () => {},
  onEditOrder = () => {},
  onDeleteOrder = () => {},
  onUpdateStatus = () => {},
}) => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId],
    );
  };

  const handleExportOrders = () => {
    // Create CSV content
    const headers = [
      "Order ID",
      "Customer",
      "Products",
      "Total",
      "Status",
      "Payment",
      "Date",
    ];

    const rows = orders.map((order) => [
      order.orderNumber,
      order.customer.name,
      order.products.map((p) => `${p.quantity}x ${p.name}`).join(", "),
      `₹${order.total.toFixed(2)}`,
      order.status,
      order.paymentStatus,
      format(order.date, "MMM dd, yyyy"),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create a blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "orders.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full bg-white rounded-md shadow">
      <div className="p-4 flex justify-between items-center border-b">
        <h3 className="text-lg font-medium">Orders</h3>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleExportOrders}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">Bulk Actions</Button>
        </div>
      </div>
      <Table>
        <TableCaption>A list of your recent orders.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300"
                onChange={() => {
                  if (selectedOrders.length === orders.length) {
                    setSelectedOrders([]);
                  } else {
                    setSelectedOrders(orders.map((order) => order.id));
                  }
                }}
                checked={
                  selectedOrders.length === orders.length && orders.length > 0
                }
              />
            </TableHead>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Products</TableHead>
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
              <TableCell>
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={selectedOrders.includes(order.id)}
                  onChange={() => toggleOrderSelection(order.id)}
                />
              </TableCell>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-gray-100 overflow-hidden">
                    {order.customer.avatar ? (
                      <img
                        src={order.customer.avatar}
                        alt={order.customer.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${order.customer.name}`}
                        alt={order.customer.name}
                        className="h-full w-full object-cover"
                      />
                    )}
                  </div>
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
                  {order.products.map((product, index) => (
                    <span key={index}>
                      {product.quantity}x {product.name}
                      {index < order.products.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>₹{order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={getStatusBadgeVariant(order.status)}
                  className="flex items-center w-fit"
                >
                  {getStatusIcon(order.status)}
                  <span className="capitalize">{order.status}</span>
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant={getPaymentStatusBadgeVariant(order.paymentStatus)}
                >
                  <span className="capitalize">{order.paymentStatus}</span>
                </Badge>
              </TableCell>
              <TableCell>{format(order.date, "MMM dd, yyyy")}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onViewOrder(order.id)}>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditOrder(order.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit order
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(order.id, "processing")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Processing
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(order.id, "shipped")}
                    >
                      <TruckIcon className="mr-2 h-4 w-4" />
                      Mark as Shipped
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onUpdateStatus(order.id, "delivered")}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark as Delivered
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onDeleteOrder(order.id)}
                      className="text-red-600 focus:text-red-600"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing <span className="font-medium">{orders.length}</span> of{" "}
          <span className="font-medium">{orders.length}</span> orders
        </div>
        <div className="flex gap-1">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

// Default mock data
const defaultOrders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
    },
    products: [
      { name: "Veg Pizza", quantity: 2, price: 299 },
      { name: "Coke", quantity: 1, price: 60 },
    ],
    total: 658,
    status: "new",
    paymentStatus: "paid",
    date: new Date("2023-06-15"),
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: {
      name: "Priya Patel",
      phone: "+91 87654 32109",
    },
    products: [
      { name: "Paneer Butter Masala", quantity: 1, price: 250 },
      { name: "Butter Naan", quantity: 2, price: 40 },
    ],
    total: 330,
    status: "processing",
    paymentStatus: "paid",
    date: new Date("2023-06-14"),
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: {
      name: "Amit Kumar",
      phone: "+91 76543 21098",
    },
    products: [{ name: "Chicken Biryani", quantity: 1, price: 350 }],
    total: 350,
    status: "shipped",
    paymentStatus: "paid",
    date: new Date("2023-06-13"),
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customer: {
      name: "Sneha Gupta",
      phone: "+91 65432 10987",
    },
    products: [
      { name: "Masala Dosa", quantity: 2, price: 120 },
      { name: "Filter Coffee", quantity: 2, price: 60 },
    ],
    total: 360,
    status: "delivered",
    paymentStatus: "paid",
    date: new Date("2023-06-12"),
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customer: {
      name: "Vikram Singh",
      phone: "+91 54321 09876",
    },
    products: [
      { name: "Butter Chicken", quantity: 1, price: 320 },
      { name: "Garlic Naan", quantity: 2, price: 50 },
      { name: "Gulab Jamun", quantity: 2, price: 60 },
    ],
    total: 480,
    status: "cancelled",
    paymentStatus: "failed",
    date: new Date("2023-06-11"),
  },
];

export default OrdersTable;
