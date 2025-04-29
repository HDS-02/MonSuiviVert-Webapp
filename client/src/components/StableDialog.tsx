import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * StableDialog - Un composant de dialogue robuste pour remplacer Dialog de shadcn/ui
 * Ce composant est spécialement conçu pour fonctionner de façon fiable avec un contenu complexe
 */
interface StableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
  showCloseButton?: boolean;
}

function StableDialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  maxWidth = "max-w-2xl",
  showCloseButton = true,
}: StableDialogProps) {
  const [isVisible, setIsVisible] = useState(open);

  // Synchroniser l'état d'ouverture externe avec l'état interne
  useEffect(() => {
    if (open) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = '';
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!isVisible && !open) {
    return null;
  }

  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-200",
        open ? "opacity-100" : "opacity-0"
      )}
      aria-modal="true"
      role="dialog"
      onClick={() => onOpenChange(false)}
    >
      <div 
        className={cn(
          "bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full transition-all transform duration-200 overflow-hidden my-auto",
          maxWidth,
          open ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className
        )}
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-4 border-b">
            <div>
              {title && (
                <h2 className="text-xl font-semibold">{title}</h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>
              )}
            </div>
            {showCloseButton && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full" 
                onClick={() => onOpenChange(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        )}
        
        <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
}

export { StableDialog };
