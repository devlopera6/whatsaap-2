import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Save, Upload } from "lucide-react";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  businessName: z.string().min(2, {
    message: "Business name must be at least 2 characters.",
  }),
  ownerName: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "State must be at least 2 characters.",
  }),
  pincode: z.string().min(6, {
    message: "Pincode must be at least 6 characters.",
  }),
  businessType: z.string({
    required_error: "Please select a business type.",
  }),
  description: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(500, {
      message: "Description must not exceed 500 characters.",
    }),
  logo: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  businessName: "Tasty Bites",
  ownerName: "Rahul Sharma",
  email: "rahul@tastybites.com",
  phone: "9876543210",
  address: "123 Food Street, Koramangala",
  city: "Bangalore",
  state: "Karnataka",
  pincode: "560034",
  businessType: "restaurant",
  description:
    "We serve delicious homemade food with authentic flavors. Our specialty is North Indian cuisine with a modern twist.",
  logo: "https://api.dicebear.com/7.x/avataaars/svg?seed=TastyBites",
};

interface BusinessProfileFormProps {
  onSubmit?: (data: FormValues) => void;
  initialData?: Partial<FormValues>;
}

const BusinessProfileForm = ({
  onSubmit = () => {},
  initialData = defaultValues,
}: BusinessProfileFormProps) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  function handleSubmit(data: FormValues) {
    // In a real implementation, this would send data to the server
    console.log(data);
    onSubmit(data);
  }

  return (
    <Card className="w-full bg-white">
      <CardHeader>
        <CardTitle>Business Profile</CardTitle>
        <CardDescription>
          Update your business information and branding details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your business name"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      This will be displayed to your customers
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter owner's name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter business phone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter business address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter state" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter pincode" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="businessType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="grocery">Grocery Store</SelectItem>
                      <SelectItem value="bakery">Bakery</SelectItem>
                      <SelectItem value="clothing">Clothing Store</SelectItem>
                      <SelectItem value="electronics">
                        Electronics Store
                      </SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    This helps us customize your experience
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe your business"
                      className="min-h-[120px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be displayed on your business profile
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Logo</FormLabel>
                  <div className="flex items-center gap-4">
                    {field.value && (
                      <div className="h-20 w-20 rounded-md overflow-hidden border">
                        <img
                          src={field.value}
                          alt="Business Logo"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div>
                      <input
                        type="file"
                        id="logo-upload"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            // In a real app, this would upload the file to a server
                            // For now, we'll just create a local URL
                            const url = URL.createObjectURL(file);
                            field.onChange(url);
                          }
                        }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        className="flex gap-2"
                        onClick={() => {
                          document.getElementById("logo-upload")?.click();
                        }}
                      >
                        <Upload size={16} />
                        Upload Logo
                      </Button>
                    </div>
                  </div>
                  <FormDescription>
                    Upload a square image (JPG, PNG) of at least 300x300px
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <CardFooter className="px-0 pt-6 flex justify-end">
              <Button type="submit" className="flex gap-2">
                <Save size={16} />
                Save Changes
              </Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default BusinessProfileForm;
