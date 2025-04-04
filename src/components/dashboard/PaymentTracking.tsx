import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import PaymentSummary from "./PaymentSummary";
import TransactionsTable from "./TransactionsTable";
import ReportGenerator, { ReportData } from "./ReportGenerator";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

interface PaymentTrackingProps {
  totalRevenue?: number;
  pendingAmount?: number;
  successRate?: number;
  recentTransactions?: {
    amount: number;
    status: "success" | "pending" | "failed";
    date: string;
    method: string;
  }[];
  transactions?: {
    id: string;
    orderId: string;
    customer: string;
    amount: number;
    status: "successful" | "pending" | "failed";
    date: Date;
    paymentMethod: string;
  }[];
}

const PaymentTracking = ({
  totalRevenue = 124500,
  pendingAmount = 12800,
  successRate = 92,
  recentTransactions = [
    { amount: 1299, status: "success", date: "2023-06-15", method: "UPI" },
    { amount: 2499, status: "success", date: "2023-06-14", method: "Card" },
    { amount: 999, status: "pending", date: "2023-06-14", method: "UPI" },
    { amount: 1599, status: "failed", date: "2023-06-13", method: "Wallet" },
  ],
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
  ],
}: PaymentTrackingProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("summary");
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);

  const handleViewTransactionDetails = (transactionId: string) => {
    console.log(`Viewing transaction details for: ${transactionId}`);
    // Implementation for viewing transaction details would go here
  };

  const handleDownloadInvoice = (transactionId: string) => {
    console.log(`Downloading invoice for transaction: ${transactionId}`);
    // Implementation for downloading invoice would go here
  };

  const handleGenerateReport = (reportData: ReportData) => {
    setIsGeneratingReport(true);

    // Simulate API call to generate report
    setTimeout(() => {
      setIsGeneratingReport(false);

      // Create and download the file based on the format
      const fileData = generateReportData(reportData);
      downloadReport(fileData, reportData.reportName, reportData.reportFormat);

      toast({
        title: "Report generated successfully",
        description: `Your ${reportData.reportType} report has been downloaded.`,
      });
    }, 2000);
  };

  // Generate mock report data based on report type and format
  const generateReportData = (reportData: ReportData): string => {
    const { reportType, dateRange, reportFormat } = reportData;

    // Format dates for display
    const fromDate = format(dateRange.from, "yyyy-MM-dd");
    const toDate = dateRange.to ? format(dateRange.to, "yyyy-MM-dd") : fromDate;

    // Filter transactions based on date range
    const filteredTransactions = transactions.filter((transaction) => {
      const txDate = transaction.date;
      return (
        txDate >= dateRange.from && (!dateRange.to || txDate <= dateRange.to)
      );
    });

    // Generate different formats
    if (reportFormat === "csv") {
      // Generate CSV
      let csv = "ID,Order ID,Customer,Amount,Status,Date,Payment Method\n";
      filteredTransactions.forEach((tx) => {
        csv += `${tx.id},${tx.orderId},${tx.customer},${tx.amount},${tx.status},${format(tx.date, "yyyy-MM-dd")},${tx.paymentMethod}\n`;
      });
      return csv;
    } else if (reportFormat === "excel") {
      // For demo, we'll just return CSV data that would be converted to Excel
      let csv = "ID,Order ID,Customer,Amount,Status,Date,Payment Method\n";
      filteredTransactions.forEach((tx) => {
        csv += `${tx.id},${tx.orderId},${tx.customer},${tx.amount},${tx.status},${format(tx.date, "yyyy-MM-dd")},${tx.paymentMethod}\n`;
      });
      return csv;
    } else {
      // For PDF, return a JSON string that would be converted to PDF
      return JSON.stringify(
        {
          title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
          dateRange: `${fromDate} to ${toDate}`,
          transactions: filteredTransactions,
          summary: {
            totalAmount: filteredTransactions.reduce(
              (sum, tx) => sum + tx.amount,
              0,
            ),
            count: filteredTransactions.length,
            successfulCount: filteredTransactions.filter(
              (tx) => tx.status === "successful",
            ).length,
            pendingCount: filteredTransactions.filter(
              (tx) => tx.status === "pending",
            ).length,
            failedCount: filteredTransactions.filter(
              (tx) => tx.status === "failed",
            ).length,
          },
        },
        null,
        2,
      );
    }
  };

  // Download the generated report
  const downloadReport = (data: string, fileName: string, format: string) => {
    const blob = new Blob([data], {
      type:
        format === "pdf"
          ? "application/pdf"
          : format === "excel"
            ? "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            : "text/csv",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full h-full p-6 bg-gray-50">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payment Tracking</h1>
        <p className="text-gray-500">
          Monitor and manage all your payment transactions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-6">
          <PaymentSummary
            totalRevenue={totalRevenue}
            pendingAmount={pendingAmount}
            successRate={successRate}
            recentTransactions={recentTransactions}
          />
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardContent className="p-0">
              <TransactionsTable
                transactions={transactions}
                onViewDetails={handleViewTransactionDetails}
                onDownloadInvoice={handleDownloadInvoice}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <ReportGenerator onGenerateReport={handleGenerateReport} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentTracking;
