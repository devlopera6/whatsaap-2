import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { 
  Search,
  Copy,
  MoreVertical,
  Eye,
  Power,
  RefreshCw,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { BusinessDetailsModal } from './BusinessDetailsModal';

interface Business {
  id: string;
  name: string;
  email: string;
  whatsappNumber: string;
  industry: string;
  status: 'Active' | 'Inactive';
  apiKey: string;
  createdDate: string;
}

export const BusinessList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [selectedIndustry, setSelectedIndustry] = useState('All Industries');
  const [selectedBusinessId, setSelectedBusinessId] = useState<string | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Sample data - replace with actual API call
  const businesses: Business[] = [
    {
      id: '1',
      name: 'Spice Garden Restaurant',
      email: 'contact@spicegarden.com',
      whatsappNumber: '+91 9876543210',
      industry: 'Restaurant',
      status: 'Active',
      apiKey: '••••••••••••',
      createdDate: '2023-05-15'
    },
    {
      id: '2',
      name: 'Metro Groceries',
      email: 'info@metrogroceries.com',
      whatsappNumber: '+91 8765432109',
      industry: 'Retail',
      status: 'Active',
      apiKey: '••••••••••••',
      createdDate: '2023-06-22'
    },
    {
      id: '3',
      name: 'Fashion Hub',
      email: 'support@fashionhub.com',
      whatsappNumber: '+91 7654321098',
      industry: 'Fashion',
      status: 'Inactive',
      apiKey: '••••••••••••',
      createdDate: '2023-07-10'
    },
    {
      id: '4',
      name: 'Tech Solutions',
      email: 'help@techsolutions.com',
      whatsappNumber: '+91 6543210987',
      industry: 'Technology',
      status: 'Active',
      apiKey: '••••••••••••',
      createdDate: '2023-08-05'
    },
    {
      id: '5',
      name: 'Wellness Clinic',
      email: 'care@wellnessclinic.com',
      whatsappNumber: '+91 5432109876',
      industry: 'Healthcare',
      status: 'Inactive',
      apiKey: '••••••••••••',
      createdDate: '2023-09-18'
    }
  ];

  const industries = ['All Industries', 'Restaurant', 'Retail', 'Fashion', 'Technology', 'Healthcare'];
  const statuses = ['All Statuses', 'Active', 'Inactive'];

  const handleViewDetails = (businessId: string) => {
    setSelectedBusinessId(businessId);
    setIsDetailsModalOpen(true);
  };

  const handleCopyApiKey = (apiKey: string) => {
    navigator.clipboard.writeText(apiKey);
    // Add toast notification here
  };

  const filteredBusinesses = businesses.filter(business => {
    const matchesSearch = 
      business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.whatsappNumber.includes(searchQuery);
    
    const matchesStatus = selectedStatus === 'All Statuses' || business.status === selectedStatus;
    const matchesIndustry = selectedIndustry === 'All Industries' || business.industry === selectedIndustry;

    return matchesSearch && matchesStatus && matchesIndustry;
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Businesses</h2>
        <p className="text-sm text-gray-500">
          Manage all businesses registered on the platform
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search businesses..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <select
          className="border rounded-md p-2"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          className="border rounded-md p-2"
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
        >
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>WhatsApp Number</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBusinesses.map((business) => (
              <TableRow key={business.id}>
                <TableCell className="font-medium">{business.name}</TableCell>
                <TableCell>{business.email}</TableCell>
                <TableCell>{business.whatsappNumber}</TableCell>
                <TableCell>{business.industry}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    business.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {business.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{business.apiKey}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopyApiKey(business.apiKey)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>{business.createdDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(business.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Power className="mr-2 h-4 w-4" />
                        {business.status === 'Active' ? 'Deactivate' : 'Activate'}
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Reset API Key
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Business
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <span className="px-4 py-2 border rounded-md">1</span>
          <Button variant="outline">
            Next
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Showing {filteredBusinesses.length} of {businesses.length} businesses
        </div>
      </div>

      {selectedBusinessId && (
        <BusinessDetailsModal
          businessId={selectedBusinessId}
          isOpen={isDetailsModalOpen}
          onClose={() => {
            setIsDetailsModalOpen(false);
            setSelectedBusinessId(null);
          }}
        />
      )}
    </div>
  );
};
