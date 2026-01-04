import * as React from 'react';
import { cn, getInitials } from '@/lib/utils';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const sizeClasses = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, name, size = 'md', ...props }, ref) => {
    const [imageError, setImageError] = React.useState(false);
    const showFallback = !src || imageError;

    return (
      <div
        ref={ref}
        className={cn(
          'relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300',
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {!showFallback ? (
          <img
            src={src}
            alt={alt || name || 'Avatar'}
            className="h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span>{name ? getInitials(name) : '?'}</span>
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';

export { Avatar };
