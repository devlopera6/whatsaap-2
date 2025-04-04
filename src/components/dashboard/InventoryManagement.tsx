import React, { useState } from "react";
import ProductsTable from "./ProductsTable";
import ProductFormModal from "./ProductFormModal";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Package,
  BarChart2,
  AlertTriangle,
  TrendingUp,
  Plus,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
  lastUpdated: string;
}

const InventoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([
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
  ]);

  const handleAddProduct = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: any) => {
    // Here you would typically make an API call to save the product
    console.log("Saving product:", productData);

    // For demo purposes, we'll just update the local state
    if (selectedProduct) {
      // Update existing product
      setProducts(
        products.map((p) =>
          p.id === selectedProduct.id ? { ...p, ...productData } : p,
        ),
      );
    } else {
      // Add new product with a generated ID
      const newProduct = {
        id: `${Date.now()}`,
        ...productData,
        price: Number(productData.price),
        stock: Number(productData.stock),
        status:
          Number(productData.stock) > 0
            ? Number(productData.stock) < 10
              ? "low-stock"
              : "in-stock"
            : "out-of-stock",
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setProducts([...products, newProduct]);
    }

    setIsModalOpen(false);
  };

  // Calculate inventory statistics
  const totalProducts = products.length;
  const lowStockProducts = products.filter(
    (p) => p.status === "low-stock",
  ).length;
  const outOfStockProducts = products.filter(
    (p) => p.status === "out-of-stock",
  ).length;
  const totalInventoryValue = products.reduce(
    (sum, product) => sum + product.price * product.stock,
    0,
  );

  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Inventory Management
          </h1>
          <p className="text-muted-foreground">
            Manage your products and track inventory levels
          </p>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="mr-2 h-4 w-4" /> Add New Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Products in inventory
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">
              Products running low
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{outOfStockProducts}</div>
            <p className="text-xs text-muted-foreground">Products to restock</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Value
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ₹{totalInventoryValue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total value of inventory
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-white">
          <TabsTrigger value="all">All Products</TabsTrigger>
          <TabsTrigger value="low-stock">Low Stock</TabsTrigger>
          <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
          <TabsTrigger value="analytics">Inventory Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <ProductsTable products={products} onEdit={handleEditProduct} />
        </TabsContent>
        <TabsContent value="low-stock" className="mt-4">
          <ProductsTable
            products={products.filter((p) => p.status === "low-stock")}
            onEdit={handleEditProduct}
          />
        </TabsContent>
        <TabsContent value="out-of-stock" className="mt-4">
          <ProductsTable
            products={products.filter((p) => p.status === "out-of-stock")}
            onEdit={handleEditProduct}
          />
        </TabsContent>
        <TabsContent value="analytics" className="mt-4">
          <Card className="bg-white p-6">
            <CardHeader>
              <CardTitle>Inventory Analytics</CardTitle>
              <CardDescription>
                View detailed analytics of your inventory
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md">
                <p className="text-muted-foreground">
                  Inventory charts and analytics will be displayed here
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Product Form Modal */}
      <ProductFormModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        product={
          selectedProduct
            ? {
                name: selectedProduct.name,
                description: "", // Assuming description is not in the Product interface
                price: selectedProduct.price.toString(),
                stock: selectedProduct.stock.toString(),
                category: selectedProduct.category.toLowerCase(),
                isActive: selectedProduct.status !== "out-of-stock",
                variants: [],
              }
            : undefined
        }
        onSave={handleSaveProduct}
      />
    </div>
  );
};

export default InventoryManagement;
