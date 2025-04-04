import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DatePickerWithRange from "@/components/ui/date-picker-with-range";
import { addDays, format } from "date-fns";
import {
  Calendar as CalendarIcon,
  Download,
  FileText,
  Filter,
  Loader2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface DateRange {
  from: Date;
  to?: Date;
}

interface ReportGeneratorProps {
  className?: string;
  onGenerateReport?: (reportData: ReportData) => void;
}

export interface ReportData {
  reportType: string;
  dateRange: DateRange;
  reportFormat: string;
  reportName: string;
}

const ReportGenerator = ({
  className = "",
  onGenerateReport,
}: ReportGeneratorProps) => {
  const { toast } = useToast();
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2023, 0, 20),
    to: addDays(new Date(2023, 0, 20), 30),
  });

  const [reportType, setReportType] = useState<string>("payment");
  const [reportFormat, setReportFormat] = useState<string>("pdf");
  const [reportName, setReportName] = useState<string>(
    `${reportType}_report_${format(new Date(), "yyyy-MM-dd")}`,
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  const handleGenerateReport = () => {
    if (!date?.from) {
      toast({
        title: "Date range required",
        description: "Please select a date range for your report",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);

    // Prepare report data
    const reportData: ReportData = {
      reportType,
      dateRange: date,
      reportFormat,
      reportName,
    };

    // If callback is provided, use it
    if (onGenerateReport) {
      onGenerateReport(reportData);
      // Let the parent component handle the state
    } else {
      // Default behavior - simulate report generation
      setTimeout(() => {
        setIsGenerating(false);
        toast({
          title: "Report generated",
          description: `Your ${reportType} report has been generated in ${reportFormat.toUpperCase()} format.`,
        });
      }, 2000);
    }
  };

  // Update report name when type changes
  React.useEffect(() => {
    setReportName(`${reportType}_report_${format(new Date(), "yyyy-MM-dd")}`);
  }, [reportType]);

  return (
    <Card className={cn("w-full bg-white", className)}>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          Generate Reports
        </CardTitle>
        <CardDescription>
          Create and download payment and order reports
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="report-type">Report Type</Label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger id="report-type">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="payment">Payment Report</SelectItem>
                <SelectItem value="order">Order Report</SelectItem>
                <SelectItem value="inventory">Inventory Report</SelectItem>
                <SelectItem value="customer">Customer Report</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date-range">Date Range</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date-range"
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <DatePickerWithRange
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-format">Format</Label>
            <Select value={reportFormat} onValueChange={setReportFormat}>
              <SelectTrigger id="report-format">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="report-name">Report Name</Label>
            <Input
              id="report-name"
              placeholder="Enter report name"
              value={reportName}
              onChange={(e) => setReportName(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <Label>Additional Filters</Label>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Payment Status
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Payment Method
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Customer
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Filter className="h-4 w-4" />
              Amount Range
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <FileText className="mr-2 h-4 w-4" />
          Last report generated: {format(new Date(), "MMM dd, yyyy")}
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Preview</Button>
          <Button onClick={handleGenerateReport} disabled={isGenerating}>
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Generate Report
              </>
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ReportGenerator;
