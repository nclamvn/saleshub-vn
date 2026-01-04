'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, Check, Coins, Handshake, FileText, Clock, Settings } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { useNotificationStore } from '@/stores/notification-store';
import { formatRelativeTime, cn } from '@/lib/utils';
import { NotificationType } from '@/types';

const typeConfig: Record<NotificationType, { icon: typeof Bell; color: string }> = {
  system: { icon: Settings, color: 'bg-gray-100 text-gray-600' },
  reward: { icon: Coins, color: 'bg-yellow-100 text-yellow-600' },
  crosssale: { icon: Handshake, color: 'bg-blue-100 text-blue-600' },
  content: { icon: FileText, color: 'bg-purple-100 text-purple-600' },
  reminder: { icon: Clock, color: 'bg-orange-100 text-orange-600' },
  transaction: { icon: Coins, color: 'bg-green-100 text-green-600' },
};

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, unreadCount } = useNotificationStore();

  return (
    <div>
      <PageHeader
        title="Thông báo"
        description={`${unreadCount} thông báo chưa đọc`}
      >
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={markAllAsRead}>
            <Check className="mr-2 h-4 w-4" />
            Đánh dấu tất cả đã đọc
          </Button>
        )}
      </PageHeader>

      {notifications.length > 0 ? (
        <div className="space-y-3">
          {notifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;

            return (
              <Card
                key={notification.id}
                className={cn(
                  'p-4 transition-colors',
                  !notification.isRead && 'border-l-4 border-l-primary bg-primary/5'
                )}
              >
                <div className="flex gap-4">
                  <div className={cn('rounded-lg p-2', config.color)}>
                    <Icon className="h-5 w-5" />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <Badge variant="default" className="ml-2 shrink-0">
                          Mới
                        </Badge>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        {formatRelativeTime(notification.createdAt)}
                      </p>
                      <div className="flex gap-2">
                        {notification.link && (
                          <Link href={notification.link}>
                            <Button variant="ghost" size="sm">
                              Xem chi tiết
                            </Button>
                          </Link>
                        )}
                        {!notification.isRead && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Đánh dấu đã đọc
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="p-8">
          <EmptyState
            icon={<Bell className="h-12 w-12" />}
            title="Không có thông báo"
            description="Các thông báo mới sẽ xuất hiện ở đây"
          />
        </Card>
      )}
    </div>
  );
}
