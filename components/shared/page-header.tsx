import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  action?: React.ReactNode;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
  children,
}: PageHeaderProps) {
  return (
    <div className="mb-6">
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2 flex items-center gap-1 text-sm text-gray-500">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="hover:text-gray-900 dark:hover:text-white"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-gray-900 dark:text-white">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}

      {/* Title & Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>

        {action && (
          <div className="flex shrink-0 gap-2">
            {action}
          </div>
        )}

        {children}
      </div>
    </div>
  );
}
