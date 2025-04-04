import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Upload, Plus, Minus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters" }),
  description: z.string().optional(),
  price: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Price must be a valid number",
  }),
  stock: z.string().refine((val) => !isNaN(Number(val)), {
    message: "Stock must be a valid number",
  }),
  category: z.string().min(1, { message: "Please select a category" }),
  isActive: z.boolean().default(true),
  variants: z
    .array(
      z.object({
        name: z.string(),
        price: z.string(),
      }),
    )
    .optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  product?: ProductFormValues;
  onSave?: (data: ProductFormValues) => void;
}

const defaultProduct: ProductFormValues = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  isActive: true,
  variants: [],
};

const ProductFormModal = ({
  open = true,
  onOpenChange = () => {},
  product = defaultProduct,
  onSave = () => {},
}: ProductFormModalProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [variants, setVariants] = useState(product.variants || []);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: product,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", price: "" }]);
  };

  const removeVariant = (index: number) => {
    const newVariants = [...variants];
    newVariants.splice(index, 1);
    setVariants(newVariants);
  };

  const updateVariant = (
    index: number,
    field: "name" | "price",
    value: string,
  ) => {
    const newVariants = [...variants];
    newVariants[index][field] = value;
    setVariants(newVariants);
  };

  const onSubmit = (data: ProductFormValues) => {
    // Include variants in the form data
    const formData = {
      ...data,
      variants: variants,
    };
    onSave(formData);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle>
            {product.name ? "Edit Product" : "Add New Product"}
          </DialogTitle>
          <DialogDescription>
            {product.name
              ? "Update the details of your existing product."
              : "Fill in the details to add a new product to your inventory."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* Product Image Upload */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden relative">
                  {imagePreview ? (
                    <>
                      <img
                        src={imagePreview}
                        alt="Product preview"
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute top-1 right-1 bg-white rounded-full p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400" />
                      <span className="mt-1 block text-xs text-gray-500">
                        Upload Image
                      </span>
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-xs text-gray-500 mt-2">
                  Recommended: 500x500px
                </span>
              </div>

              {/* Product Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Description */}
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price and Stock */}
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (₹)</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock Quantity</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="0" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="food">Food</SelectItem>
                        <SelectItem value="beverages">Beverages</SelectItem>
                        <SelectItem value="grocery">Grocery</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Product Status */}
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Product Availability
                      </FormLabel>
                      <FormDescription>
                        Toggle to make this product available for ordering
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Product Variants */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-medium">
                    Product Variants (Optional)
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addVariant}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add Variant
                  </Button>
                </div>

                {variants.map((variant, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      placeholder="Variant name (e.g. Size, Color)"
                      value={variant.name}
                      onChange={(e) =>
                        updateVariant(index, "name", e.target.value)
                      }
                      className="flex-1"
                    />
                    <Input
                      placeholder="Price (₹)"
                      value={variant.price}
                      onChange={(e) =>
                        updateVariant(index, "price", e.target.value)
                      }
                      className="w-24"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => removeVariant(index)}
                    >
                      <Minus className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {product.name ? "Update Product" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormModal;
