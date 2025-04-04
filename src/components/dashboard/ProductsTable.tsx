import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Edit, Trash2, Plus, Search, ArrowUpDown } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  lastUpdated: string;
}

const ProductsTable = ({
  products = mockProducts,
}: {
  products?: Product[];
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Product>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else {
        return sortDirection === "asc"
          ? (aValue as number) - (bValue as number)
          : (bValue as number) - (aValue as number);
      }
    });

  const getStockBadgeVariant = (status: Product["status"]) => {
    switch (status) {
      case "in-stock":
        return "secondary";
      case "low-stock":
        return "default";
      case "out-of-stock":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Inventory Products</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>A list of your inventory products.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("name")}
            >
              <div className="flex items-center">
                Product Name
                {sortField === "name" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("category")}
            >
              <div className="flex items-center">
                Category
                {sortField === "category" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer"
              onClick={() => handleSort("price")}
            >
              <div className="flex items-center justify-end">
                Price
                {sortField === "price" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead
              className="text-right cursor-pointer"
              onClick={() => handleSort("stock")}
            >
              <div className="flex items-center justify-end">
                Stock
                {sortField === "stock" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead
              className="cursor-pointer"
              onClick={() => handleSort("lastUpdated")}
            >
              <div className="flex items-center">
                Last Updated
                {sortField === "lastUpdated" && (
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                )}
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell className="text-right">
                  ₹{product.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">{product.stock}</TableCell>
                <TableCell>
                  <Badge variant={getStockBadgeVariant(product.status)}>
                    {product.status}
                  </Badge>
                </TableCell>
                <TableCell>{product.lastUpdated}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={7}
                className="text-center py-6 text-muted-foreground"
              >
                No products found. Try a different search term or add a new
                product.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

// Mock data for default display
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Veg Pizza",
    price: 299,
    category: "Food",
    stock: 25,
    status: "in-stock",
    lastUpdated: "2023-06-15",
  },
  {
    id: "2",
    name: "Chicken Biryani",
    price: 349,
    category: "Food",
    stock: 12,
    status: "low-stock",
    lastUpdated: "2023-06-14",
  },
  {
    id: "3",
    name: "Coca Cola",
    price: 60,
    category: "Beverages",
    stock: 50,
    status: "in-stock",
    lastUpdated: "2023-06-10",
  },
  {
    id: "4",
    name: "Chocolate Cake",
    price: 499,
    category: "Desserts",
    stock: 0,
    status: "out-of-stock",
    lastUpdated: "2023-06-12",
  },
  {
    id: "5",
    name: "Paneer Tikka",
    price: 249,
    category: "Starters",
    stock: 8,
    status: "low-stock",
    lastUpdated: "2023-06-13",
  },
  {
    id: "6",
    name: "Mineral Water",
    price: 20,
    category: "Beverages",
    stock: 100,
    status: "in-stock",
    lastUpdated: "2023-06-15",
  },
  {
    id: "7",
    name: "Chicken Noodles",
    price: 199,
    category: "Food",
    stock: 0,
    status: "out-of-stock",
    lastUpdated: "2023-06-11",
  },
];

export default ProductsTable;
