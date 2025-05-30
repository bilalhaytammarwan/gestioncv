import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import JobForm from '../forms/JobForm';
import { opportunity } from '../../service/OpportunityService'; // Updated import

interface JobDialogProps {
  isOpen: boolean;
  initialData?: Partial<opportunity>; // Changed Job to opportunity
  onClose: () => void;
  onSubmit: (data: Partial<opportunity>) => void; // Changed Job to opportunity
}

const JobDialog: React.FC<JobDialogProps> = ({ 
  isOpen, 
  initialData, 
  onClose, 
  onSubmit 
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && event.target === dialogRef.current) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (data: Partial<opportunity>) => { // Changed Job to opportunity
    onSubmit(data);
  };

  return (
    <div 
      ref={dialogRef}
      className="fixed inset-0 z-50 overflow-y-auto bg-gray-900/50 flex items-center justify-center p-4"
    >
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>
        
        <div className="max-h-[85vh] overflow-y-auto p-2">
          <JobForm
            initialData={initialData}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDialog;