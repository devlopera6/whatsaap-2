import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  Filter,
  MessageSquare,
  Phone,
  Mail,
  User,
  ShoppingBag,
  Calendar,
  MoreVertical,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CustomerOrder {
  id: string;
  date: string;
  status: "completed" | "processing" | "cancelled";
  amount: number;
  items: string[];
}

interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
  joinedDate: string;
  orders: CustomerOrder[];
}

const defaultCustomers: Customer[] = [
  {
    id: "1",
    name: "Rahul Sharma",
    phone: "+91 98765 43210",
    email: "rahul.sharma@example.com",
    totalOrders: 12,
    totalSpent: 8750,
    lastOrderDate: "2023-06-15",
    joinedDate: "2022-11-03",
    orders: [
      {
        id: "ORD-001",
        date: "2023-06-15",
        status: "completed",
        amount: 1250,
        items: ["Butter Chicken", "Naan", "Raita"],
      },
      {
        id: "ORD-002",
        date: "2023-05-22",
        status: "completed",
        amount: 950,
        items: ["Paneer Tikka", "Roti"],
      },
    ],
  },
  {
    id: "2",
    name: "Priya Patel",
    phone: "+91 87654 32109",
    email: "priya.patel@example.com",
    totalOrders: 8,
    totalSpent: 5600,
    lastOrderDate: "2023-06-10",
    joinedDate: "2023-01-15",
    orders: [
      {
        id: "ORD-003",
        date: "2023-06-10",
        status: "completed",
        amount: 850,
        items: ["Masala Dosa", "Filter Coffee"],
      },
    ],
  },
  {
    id: "3",
    name: "Amit Kumar",
    phone: "+91 76543 21098",
    email: "amit.kumar@example.com",
    totalOrders: 5,
    totalSpent: 3200,
    lastOrderDate: "2023-06-05",
    joinedDate: "2023-03-22",
    orders: [
      {
        id: "ORD-004",
        date: "2023-06-05",
        status: "processing",
        amount: 750,
        items: ["Veg Biryani", "Raita"],
      },
    ],
  },
  {
    id: "4",
    name: "Sneha Gupta",
    phone: "+91 65432 10987",
    email: "sneha.gupta@example.com",
    totalOrders: 15,
    totalSpent: 12500,
    lastOrderDate: "2023-06-18",
    joinedDate: "2022-08-10",
    orders: [
      {
        id: "ORD-005",
        date: "2023-06-18",
        status: "completed",
        amount: 1500,
        items: ["Chicken Biryani", "Kebabs", "Raita"],
      },
    ],
  },
  {
    id: "5",
    name: "Vikram Singh",
    phone: "+91 54321 09876",
    email: "vikram.singh@example.com",
    totalOrders: 3,
    totalSpent: 2100,
    lastOrderDate: "2023-05-30",
    joinedDate: "2023-04-05",
    orders: [
      {
        id: "ORD-006",
        date: "2023-05-30",
        status: "cancelled",
        amount: 650,
        items: ["Chole Bhature"],
      },
    ],
  },
];

const CustomersList = () => {
  const [customers, setCustomers] = useState<Customer[]>(defaultCustomers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  );
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const openCustomerDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDetailOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-IN", options);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Customers</h2>
        <div className="flex space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-64"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[600px] w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <TableRow
                      key={customer.id}
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => openCustomerDetail(customer)}
                    >
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${customer.id}`}
                            />
                            <AvatarFallback>
                              {customer.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{customer.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col space-y-1">
                          <div className="flex items-center text-sm text-gray-500">
                            <Phone className="mr-2 h-3 w-3" />
                            {customer.phone}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Mail className="mr-2 h-3 w-3" />
                            {customer.email}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>
                        {formatCurrency(customer.totalSpent)}
                      </TableCell>
                      <TableCell>
                        {formatDate(customer.lastOrderDate)}
                      </TableCell>
                      <TableCell>{formatDate(customer.joinedDate)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <ShoppingBag className="mr-2 h-4 w-4" />
                              View Orders
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-10 text-gray-500"
                    >
                      No customers found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Customer Detail Dialog */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl">
          {selectedCustomer && (
            <>
              <DialogHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedCustomer.id}`}
                    />
                    <AvatarFallback>
                      {selectedCustomer.name.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <DialogTitle className="text-xl">
                      {selectedCustomer.name}
                    </DialogTitle>
                    <DialogDescription className="flex items-center space-x-4 mt-1">
                      <span className="flex items-center">
                        <Phone className="mr-1 h-3 w-3" />
                        {selectedCustomer.phone}
                      </span>
                      <span className="flex items-center">
                        <Mail className="mr-1 h-3 w-3" />
                        {selectedCustomer.email}
                      </span>
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <div className="grid grid-cols-3 gap-4 mb-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">
                        Total Orders
                      </p>
                      <h3 className="text-3xl font-bold mt-1">
                        {selectedCustomer.totalOrders}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">
                        Total Spent
                      </p>
                      <h3 className="text-3xl font-bold mt-1">
                        {formatCurrency(selectedCustomer.totalSpent)}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">
                        Customer Since
                      </p>
                      <h3 className="text-xl font-bold mt-1">
                        {formatDate(selectedCustomer.joinedDate)}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Tabs defaultValue="orders">
                <TabsList className="mb-4">
                  <TabsTrigger value="orders">Order History</TabsTrigger>
                  <TabsTrigger value="details">Customer Details</TabsTrigger>
                </TabsList>
                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Items</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedCustomer.orders.length > 0 ? (
                            selectedCustomer.orders.map((order) => (
                              <TableRow key={order.id}>
                                <TableCell className="font-medium">
                                  {order.id}
                                </TableCell>
                                <TableCell>{formatDate(order.date)}</TableCell>
                                <TableCell>
                                  <div className="flex flex-wrap gap-1">
                                    {order.items.map((item, index) => (
                                      <Badge key={index} variant="outline">
                                        {item}
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {formatCurrency(order.amount)}
                                </TableCell>
                                <TableCell>
                                  <Badge
                                    className={getStatusColor(order.status)}
                                  >
                                    {order.status.charAt(0).toUpperCase() +
                                      order.status.slice(1)}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell
                                colSpan={5}
                                className="text-center py-6 text-gray-500"
                              >
                                No order history available.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Full Name
                            </h4>
                            <p className="mt-1">{selectedCustomer.name}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Email Address
                            </h4>
                            <p className="mt-1">{selectedCustomer.email}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Phone Number
                            </h4>
                            <p className="mt-1">{selectedCustomer.phone}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-500">
                              Joined Date
                            </h4>
                            <p className="mt-1">
                              {formatDate(selectedCustomer.joinedDate)}
                            </p>
                          </div>
                        </div>
                        <Separator />
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">
                            Actions
                          </h4>
                          <div className="flex space-x-2">
                            <Button size="sm">
                              <MessageSquare className="mr-2 h-4 w-4" />
                              Send Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="mr-2 h-4 w-4" />
                              View Activity
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomersList;
