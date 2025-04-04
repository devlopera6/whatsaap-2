import React, { useState } from "react";
import OrderFilters from "./OrderFilters";
import OrdersTable from "./OrdersTable";
import OrderDetailsModal from "./OrderDetailsModal";

interface OrderManagementProps {
  className?: string;
}

const OrderManagement: React.FC<OrderManagementProps> = ({
  className = "",
}) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleFilterChange = (filters: any) => {
    console.log("Filters changed:", filters);
    // Implement filter logic here
  };

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setIsDetailsModalOpen(true);
    console.log("View order:", orderId);
  };

  const handleEditOrder = (orderId: string) => {
    console.log("Edit order:", orderId);
    // Implement edit logic here
  };

  const handleDeleteOrder = (orderId: string) => {
    console.log("Delete order:", orderId);
    // Implement delete logic here
  };

  const handleUpdateStatus = (orderId: string, status: string) => {
    console.log("Update status:", orderId, status);
    // Implement status update logic here
  };

  const handleAddNote = (orderId: string, note: string) => {
    console.log("Add note to order:", orderId, note);
  };

  return (
    <div className={`w-full h-full bg-gray-50 p-6 ${className}`}>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
        <p className="text-gray-500 mt-1">
          View, filter, and manage all customer orders in one place
        </p>
      </div>

      <div className="space-y-6">
        {/* Filters Section */}
        <OrderFilters onFilterChange={handleFilterChange} />

        {/* Orders Table */}
        <OrdersTable
          onViewOrder={handleViewOrder}
          onEditOrder={handleEditOrder}
          onDeleteOrder={handleDeleteOrder}
          onUpdateStatus={handleUpdateStatus}
        />

        {/* Order Details Modal */}
        <OrderDetailsModal
          open={isDetailsModalOpen}
          onOpenChange={setIsDetailsModalOpen}
          onStatusChange={handleUpdateStatus}
          onAddNote={handleAddNote}
        />
      </div>
    </div>
  );
};

export default OrderManagement;
