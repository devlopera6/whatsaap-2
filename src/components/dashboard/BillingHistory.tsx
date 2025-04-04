import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DateRange } from "react-day-picker";
import DatePickerWithRange from "../ui/date-picker-with-range";
import { Download, FileText, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface BillingHistoryProps {
  invoices?: Invoice[];
}

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: "paid" | "pending" | "failed";
  planName: string;
  invoiceNumber: string;
}

const BillingHistory: React.FC<BillingHistoryProps> = ({
  invoices = [
    {
      id: "1",
      date: new Date(2023, 9, 15),
      amount: 999,
      status: "paid",
      planName: "Pro Plan",
      invoiceNumber: "INV-2023-001",
    },
    {
      id: "2",
      date: new Date(2023, 8, 15),
      amount: 999,
      status: "paid",
      planName: "Pro Plan",
      invoiceNumber: "INV-2023-002",
    },
    {
      id: "3",
      date: new Date(2023, 7, 15),
      amount: 499,
      status: "paid",
      planName: "Basic Plan",
      invoiceNumber: "INV-2023-003",
    },
    {
      id: "4",
      date: new Date(2023, 6, 15),
      amount: 499,
      status: "paid",
      planName: "Basic Plan",
      invoiceNumber: "INV-2023-004",
    },
    {
      id: "5",
      date: new Date(2023, 5, 15),
      amount: 499,
      status: "paid",
      planName: "Basic Plan",
      invoiceNumber: "INV-2023-005",
    },
  ],
}) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [filterPlan, setFilterPlan] = useState<string>("all");

  const filteredInvoices = invoices.filter((invoice) => {
    // Filter by plan
    if (filterPlan !== "all" && invoice.planName !== filterPlan) {
      return false;
    }

    // Filter by date range
    if (dateRange?.from && dateRange?.to) {
      const invoiceDate = new Date(invoice.date);
      return invoiceDate >= dateRange.from && invoiceDate <= dateRange.to;
    }

    return true;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleDownloadInvoice = (invoiceId: string) => {
    // In a real implementation, this would trigger a download of the invoice PDF
    console.log(`Downloading invoice ${invoiceId}`);
  };

  return (
    <Card className="w-full bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Billing History</CardTitle>
        <CardDescription>View and download your past invoices</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex-1">
              <DatePickerWithRange
                className="w-full"
                selected={dateRange}
                onSelect={setDateRange}
              />
            </div>
            <div className="w-full md:w-64">
              <Select value={filterPlan} onValueChange={setFilterPlan}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Plans</SelectItem>
                  <SelectItem value="Basic Plan">Basic Plan</SelectItem>
                  <SelectItem value="Pro Plan">Pro Plan</SelectItem>
                  <SelectItem value="Enterprise Plan">
                    Enterprise Plan
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length > 0 ? (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">
                        {invoice.invoiceNumber}
                      </TableCell>
                      <TableCell>{formatDate(invoice.date)}</TableCell>
                      <TableCell>{invoice.planName}</TableCell>
                      <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                        >
                          {invoice.status.charAt(0).toUpperCase() +
                            invoice.status.slice(1)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewInvoice(invoice)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[600px]">
                              <DialogHeader>
                                <DialogTitle>
                                  Invoice {invoice.invoiceNumber}
                                </DialogTitle>
                              </DialogHeader>
                              <div className="p-6 space-y-6">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <h3 className="text-lg font-bold">
                                      WhatsApp Order Manager
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                      123 Business Street
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Mumbai, India 400001
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <h4 className="text-lg font-bold">
                                      INVOICE
                                    </h4>
                                    <p className="text-sm text-gray-500">
                                      #{invoice.invoiceNumber}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                      Date: {formatDate(invoice.date)}
                                    </p>
                                  </div>
                                </div>

                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-2">Bill To:</h4>
                                  <p className="text-sm">Business Name</p>
                                  <p className="text-sm text-gray-500">
                                    business@example.com
                                  </p>
                                </div>

                                <div className="border rounded-md overflow-hidden">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Description</TableHead>
                                        <TableHead className="text-right">
                                          Amount
                                        </TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      <TableRow>
                                        <TableCell>
                                          <div>
                                            <p className="font-medium">
                                              {invoice.planName} Subscription
                                            </p>
                                            <p className="text-sm text-gray-500">
                                              Monthly billing period
                                            </p>
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                          {formatCurrency(invoice.amount)}
                                        </TableCell>
                                      </TableRow>
                                    </TableBody>
                                  </Table>
                                </div>

                                <div className="flex justify-between border-t pt-4">
                                  <div className="text-sm">
                                    <p>
                                      Payment Status:{" "}
                                      <span
                                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                                      >
                                        {invoice.status
                                          .charAt(0)
                                          .toUpperCase() +
                                          invoice.status.slice(1)}
                                      </span>
                                    </p>
                                    <p className="mt-1">
                                      Payment Method: Credit Card
                                    </p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-sm text-gray-500">
                                      Subtotal
                                    </p>
                                    <p className="text-lg font-bold">
                                      {formatCurrency(invoice.amount)}
                                    </p>
                                  </div>
                                </div>

                                <div className="text-center text-sm text-gray-500 border-t pt-4">
                                  <p>Thank you for your business!</p>
                                  <p>
                                    For questions regarding this invoice, please
                                    contact support@whatsappordermanager.com
                                  </p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDownloadInvoice(invoice.id)}
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-6 text-gray-500"
                    >
                      <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                      No invoices found for the selected filters
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingHistory;
