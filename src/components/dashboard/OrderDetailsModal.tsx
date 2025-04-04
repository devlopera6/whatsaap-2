import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import {
  Clock,
  Package,
  Truck,
  CreditCard,
  MessageSquare,
  User,
  Phone,
  MapPin,
} from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderDate: string;
  status: "new" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentStatus: "paid" | "pending" | "failed";
  items: OrderItem[];
  total: number;
  notes: string;
}

interface OrderDetailsModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  order?: OrderDetails;
  onStatusChange?: (orderId: string, status: string) => void;
  onAddNote?: (orderId: string, note: string) => void;
}

const defaultOrder: OrderDetails = {
  id: "ord-12345",
  orderNumber: "ORD-12345",
  customerName: "Rahul Sharma",
  customerPhone: "+91 98765 43210",
  customerAddress: "123 Main Street, Bangalore, Karnataka 560001",
  orderDate: "2023-06-15T10:30:00",
  status: "processing",
  paymentStatus: "paid",
  items: [
    { id: "item-1", name: "Veg Pizza", quantity: 2, price: 299 },
    { id: "item-2", name: "Coke", quantity: 1, price: 60 },
    { id: "item-3", name: "Garlic Bread", quantity: 1, price: 149 },
  ],
  total: 807,
  notes: "Customer requested contactless delivery. Leave at the door.",
};

const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  open = true,
  onOpenChange,
  order = defaultOrder,
  onStatusChange,
  onAddNote,
}) => {
  const [status, setStatus] = useState<string>(order.status);
  const [newNote, setNewNote] = useState<string>("");

  const handleStatusChange = (value: string) => {
    setStatus(value);
    if (onStatusChange) {
      onStatusChange(order.id, value);
    }
  };

  const handleAddNote = () => {
    if (newNote.trim() && onAddNote) {
      onAddNote(order.id, newNote);
      setNewNote("");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "new":
        return "secondary";
      case "processing":
        return "default";
      case "shipped":
        return "secondary";
      case "delivered":
        return "default";
      case "cancelled":
        return "destructive";
      default:
        return "default";
    }
  };

  const getPaymentStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "default";
      case "pending":
        return "secondary";
      case "failed":
        return "destructive";
      default:
        return "default";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Order #{order.orderNumber}</span>
            <Badge
              variant={getStatusBadgeVariant(order.status)}
              className="ml-2"
            >
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </DialogTitle>
          <div className="flex items-center text-sm text-gray-500 mt-2">
            <Clock className="h-4 w-4 mr-1" />
            <span>{formatDate(order.orderDate)}</span>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Customer Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Customer Information</h3>
            <div className="space-y-2">
              <div className="flex items-start">
                <User className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                <div>
                  <p className="font-medium">{order.customerName}</p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                <p>{order.customerPhone}</p>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 text-gray-500" />
                <p>{order.customerAddress}</p>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-3">Order Status</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full mt-1">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Payment Status</label>
                  <Badge
                    variant={getPaymentStatusBadgeVariant(order.paymentStatus)}
                  >
                    {order.paymentStatus.charAt(0).toUpperCase() +
                      order.paymentStatus.slice(1)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Order Items</h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Qty
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">
                      {item.quantity}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                      ₹{item.price.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 text-right">
                      ₹{(item.quantity * item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50">
                  <td
                    colSpan={3}
                    className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-right"
                  >
                    Total
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900 text-right">
                    ₹{order.total.toFixed(2)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-6">
          <h3 className="font-medium mb-3">Notes</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-4">
              <p className="text-sm text-gray-700">
                {order.notes || "No notes available."}
              </p>
            </div>
            <div className="space-y-2">
              <Textarea
                placeholder="Add a note about this order..."
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="min-h-[80px]"
              />
              <Button onClick={handleAddNote} disabled={!newNote.trim()}>
                Add Note
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange && onOpenChange(false)}
            >
              Close
            </Button>
            <Button>
              <MessageSquare className="h-4 w-4 mr-2" />
              Message Customer
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
