import * as React from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'flex min-h-[100px] w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500',
            error && 'border-danger focus:border-danger focus:ring-danger/20',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
