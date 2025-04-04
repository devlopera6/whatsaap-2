import React, { useState } from "react";
import {
  Search,
  Calendar as CalendarIcon,
  Filter,
  X,
  ChevronDown,
} from "lucide-react";
import { format } from "date-fns";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";

interface OrderFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  search: string;
  dateRange: {
    from: Date | undefined;
    to: Date | undefined;
  };
  status: string;
  customer: string;
}

const OrderFilters = ({ onFilterChange = () => {} }: OrderFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    dateRange: {
      from: undefined,
      to: undefined,
    },
    status: "all",
    customer: "all",
  });

  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    const newFilters = { ...filters, search: searchValue };
    setFilters(newFilters);
    onFilterChange(newFilters);

    // Add or remove search from active filters based on whether it has a value
    if (searchValue && !activeFilters.includes("search")) {
      setActiveFilters([...activeFilters, "search"]);
    } else if (!searchValue && activeFilters.includes("search")) {
      setActiveFilters(activeFilters.filter((f) => f !== "search"));
    }
  };

  const handleDateChange = (range: {
    from: Date | undefined;
    to: Date | undefined;
  }) => {
    const newFilters = { ...filters, dateRange: range };
    setFilters(newFilters);
    onFilterChange(newFilters);

    if (range.from && !activeFilters.includes("date")) {
      setActiveFilters([...activeFilters, "date"]);
    } else if (!range.from && activeFilters.includes("date")) {
      setActiveFilters(activeFilters.filter((f) => f !== "date"));
    }
  };

  const handleStatusChange = (value: string) => {
    const newFilters = { ...filters, status: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    if (value && value !== "all" && !activeFilters.includes("status")) {
      setActiveFilters([...activeFilters, "status"]);
    } else if (
      (value === "all" || !value) &&
      activeFilters.includes("status")
    ) {
      setActiveFilters(activeFilters.filter((f) => f !== "status"));
    }
  };

  const handleCustomerChange = (value: string) => {
    const newFilters = { ...filters, customer: value };
    setFilters(newFilters);
    onFilterChange(newFilters);

    if (value && value !== "all" && !activeFilters.includes("customer")) {
      setActiveFilters([...activeFilters, "customer"]);
    } else if (
      (value === "all" || !value) &&
      activeFilters.includes("customer")
    ) {
      setActiveFilters(activeFilters.filter((f) => f !== "customer"));
    }
  };

  const clearFilter = (filterName: string) => {
    let newFilters = { ...filters };

    switch (filterName) {
      case "search":
        newFilters.search = "";
        break;
      case "date":
        newFilters.dateRange = { from: undefined, to: undefined };
        break;
      case "status":
        newFilters.status = "all";
        break;
      case "customer":
        newFilters.customer = "all";
        break;
      default:
        break;
    }

    setFilters(newFilters);
    onFilterChange(newFilters);
    setActiveFilters(activeFilters.filter((f) => f !== filterName));
  };

  const clearAllFilters = () => {
    const newFilters = {
      search: "",
      dateRange: {
        from: undefined,
        to: undefined,
      },
      status: "all",
      customer: "all",
    };

    setFilters(newFilters);
    onFilterChange(newFilters);
    setActiveFilters([]);
  };

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search orders by ID, product, or customer..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10 w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Date Range Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <span>Date Range</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                selected={{
                  from: filters.dateRange.from,
                  to: filters.dateRange.to,
                }}
                onSelect={handleDateChange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          {/* Status Filter */}
          <Select value={filters.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Order Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="processing">Processing</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>

          {/* Customer Filter */}
          <Select value={filters.customer} onValueChange={handleCustomerChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Customer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Customers</SelectItem>
              <SelectItem value="new">New Customers</SelectItem>
              <SelectItem value="returning">Returning Customers</SelectItem>
              <SelectItem value="vip">VIP Customers</SelectItem>
            </SelectContent>
          </Select>

          {activeFilters.length > 0 && (
            <Button
              variant="ghost"
              onClick={clearAllFilters}
              className="text-red-500 hover:text-red-700"
            >
              Clear All
            </Button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {activeFilters.length > 0 && (
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm text-gray-500">Active Filters:</span>
          <div className="flex flex-wrap gap-2">
            {activeFilters.includes("search") && filters.search && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>Search: {filters.search}</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter("search")}
                />
              </Badge>
            )}

            {activeFilters.includes("date") && filters.dateRange.from && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>
                  {format(filters.dateRange.from, "MMM dd, yyyy")}
                  {filters.dateRange.to &&
                    ` - ${format(filters.dateRange.to, "MMM dd, yyyy")}`}
                </span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter("date")}
                />
              </Badge>
            )}

            {activeFilters.includes("status") && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>Status: {filters.status}</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter("status")}
                />
              </Badge>
            )}

            {activeFilters.includes("customer") && (
              <Badge variant="outline" className="flex items-center gap-1">
                <span>Customer: {filters.customer}</span>
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => clearFilter("customer")}
                />
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderFilters;
