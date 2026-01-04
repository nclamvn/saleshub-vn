'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Handshake, ArrowRight, Check, X, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { useAuthStore } from '@/stores/auth-store';
import { crossSales as allCrossSales } from '@/data/cross-sales';
import { formatRelativeTime, formatNumber } from '@/lib/utils';
import { CrossSale } from '@/types';

const statusConfig = {
  pending: { label: 'Chờ duyệt', variant: 'warning' as const, icon: Clock },
  accepted: { label: 'Đã chấp nhận', variant: 'info' as const, icon: Check },
  rejected: { label: 'Từ chối', variant: 'danger' as const, icon: X },
  completed: { label: 'Hoàn thành', variant: 'success' as const, icon: Check },
};

export default function CrossSalePage() {
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = React.useState('received');

  // Filter cross-sales
  const received = allCrossSales.filter((cs) => cs.toUserId === user?.id);
  const sent = allCrossSales.filter((cs) => cs.fromUserId === user?.id);

  const pendingReceived = received.filter((cs) => cs.status === 'pending');

  const CrossSaleCard = ({ cs, type }: { cs: CrossSale; type: 'sent' | 'received' }) => {
    const config = statusConfig[cs.status];
    const StatusIcon = config.icon;

    return (
      <Card className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar name={type === 'sent' ? cs.toUserName : cs.fromUserName} />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {type === 'sent' ? cs.toUserName : cs.fromUserName}
              </p>
              <p className="text-sm text-gray-500">
                {type === 'sent' ? 'Người nhận' : 'Người gửi'}
              </p>
            </div>
          </div>
          <Badge variant={config.variant} className="gap-1">
            <StatusIcon className="h-3 w-3" />
            {config.label}
          </Badge>
        </div>

        <div className="mt-4 rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
          <p className="text-sm text-gray-500">Lead</p>
          <p className="font-medium text-gray-900 dark:text-white">{cs.leadName}</p>
        </div>

        {cs.message && (
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            &ldquo;{cs.message}&rdquo;
          </p>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
          <div>
            <p className="text-sm text-gray-500">Hoa hồng</p>
            <p className="font-semibold text-primary">
              {Math.round(cs.commissionRate * 100)}%
              {cs.coinAmount && ` (${cs.coinAmount} coin)`}
            </p>
          </div>
          <p className="text-xs text-gray-400">{formatRelativeTime(cs.createdAt)}</p>
        </div>

        {cs.status === 'pending' && type === 'received' && (
          <div className="mt-4 flex gap-2">
            <Button variant="success" size="sm" className="flex-1 gap-1">
              <Check className="h-4 w-4" />
              Chấp nhận
            </Button>
            <Button variant="outline" size="sm" className="flex-1 gap-1">
              <X className="h-4 w-4" />
              Từ chối
            </Button>
          </div>
        )}
      </Card>
    );
  };

  return (
    <div>
      <PageHeader
        title="Cross-sale"
        description="Hợp tác với đồng nghiệp để close deal"
        action={
          <Button onClick={() => {}}>
            <Plus className="mr-2 h-4 w-4" />
            Tạo yêu cầu
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-yellow-100 p-2 text-yellow-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {pendingReceived.length}
              </p>
              <p className="text-sm text-gray-500">Chờ xử lý</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-green-100 p-2 text-green-600">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {received.filter((cs) => cs.status === 'completed').length}
              </p>
              <p className="text-sm text-gray-500">Hoàn thành</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2 text-primary">
              <Handshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {received.length + sent.length}
              </p>
              <p className="text-sm text-gray-500">Tổng yêu cầu</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="received" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="received">
            Nhận được ({received.length})
          </TabsTrigger>
          <TabsTrigger value="sent">
            Đã gửi ({sent.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="received">
          {received.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {received.map((cs) => (
                <CrossSaleCard key={cs.id} cs={cs} type="received" />
              ))}
            </div>
          ) : (
            <Card className="p-8">
              <EmptyState
                icon={<Handshake className="h-12 w-12" />}
                title="Chưa có yêu cầu nào"
                description="Khi có người gửi yêu cầu cross-sale cho bạn, chúng sẽ hiện ở đây"
              />
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sent">
          {sent.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {sent.map((cs) => (
                <CrossSaleCard key={cs.id} cs={cs} type="sent" />
              ))}
            </div>
          ) : (
            <Card className="p-8">
              <EmptyState
                icon={<Handshake className="h-12 w-12" />}
                title="Chưa gửi yêu cầu nào"
                description="Tạo yêu cầu cross-sale để nhờ đồng nghiệp hỗ trợ close deal"
                action={{ label: 'Tạo yêu cầu', onClick: () => {} }}
              />
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
