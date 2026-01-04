import React from 'react';
import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: number;
    label?: string;
  };
  className?: string;
}

export function StatsCard({
  title,
  value,
  icon,
  change,
  className,
}: StatsCardProps) {
  const isPositive = change && change.value >= 0;

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <div
              className={cn(
                'mt-2 flex items-center gap-1 text-sm',
                isPositive ? 'text-success' : 'text-danger'
              )}
            >
              {isPositive ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>
                {isPositive ? '+' : ''}
                {change.value}%
              </span>
              {change.label && (
                <span className="text-gray-500">{change.label}</span>
              )}
            </div>
          )}
        </div>
        <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
      </div>
    </Card>
  );
}
