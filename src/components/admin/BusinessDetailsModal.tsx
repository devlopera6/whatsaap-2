import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { BusinessDetails } from './BusinessDetails';

interface BusinessDetailsModalProps {
  businessId: string;
  isOpen: boolean;
  onClose: () => void;
}

export const BusinessDetailsModal = ({
  businessId,
  isOpen,
  onClose
}: BusinessDetailsModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Business Details</DialogTitle>
        </DialogHeader>
        <BusinessDetails businessId={businessId} />
      </DialogContent>
    </Dialog>
  );
};
