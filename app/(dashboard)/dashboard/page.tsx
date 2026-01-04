'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  TrendingUp,
  Coins,
  Bell,
  ArrowUpRight,
  Plus,
  Handshake,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { StatsCard } from '@/components/shared/stats-card';
import { PageHeader } from '@/components/shared/page-header';
import { useAuthStore } from '@/stores/auth-store';
import { useNotificationStore } from '@/stores/notification-store';
import { leads } from '@/data/leads';
import { crossSales } from '@/data/cross-sales';
import { stageLabels, stageColors, formatCurrency, formatRelativeTime } from '@/lib/utils';

// Chart data
const monthlyData = [
  { name: 'T7', leads: 12, deals: 3 },
  { name: 'T8', leads: 18, deals: 5 },
  { name: 'T9', leads: 15, deals: 4 },
  { name: 'T10', leads: 22, deals: 7 },
  { name: 'T11', leads: 28, deals: 9 },
  { name: 'T12', leads: 35, deals: 12 },
];

const pipelineData = [
  { name: 'Mới', value: 8 },
  { name: 'Liên hệ', value: 12 },
  { name: 'Đủ ĐK', value: 6 },
  { name: 'Đàm phán', value: 4 },
  { name: 'Thành công', value: 15 },
];

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  // Filter data for current user
  const userLeads = leads.filter((l) => l.ownerId === user?.id);
  const pendingCrossSales = crossSales.filter(
    (cs) => cs.toUserId === user?.id && cs.status === 'pending'
  );
  const recentLeads = userLeads.slice(0, 5);

  // Stats
  const totalLeads = userLeads.length;
  const closedWon = userLeads.filter((l) => l.stage === 'closed_won').length;
  const conversionRate = totalLeads > 0 ? Math.round((closedWon / totalLeads) * 100) : 0;
  const totalValue = userLeads
    .filter((l) => l.stage === 'closed_won')
    .reduce((sum, l) => sum + l.value, 0);

  return (
    <div>
      <PageHeader
        title={`Chào ${user?.name?.split(' ').pop() || 'bạn'}! 👋`}
        description="Đây là tổng quan hoạt động bán hàng của bạn"
      />

      {/* Stats Grid */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Tổng Leads"
          value={totalLeads}
          icon={<Users className="h-5 w-5" />}
          change={{ value: 12, label: 'so với tháng trước' }}
        />
        <StatsCard
          title="Tỷ lệ chuyển đổi"
          value={`${conversionRate}%`}
          icon={<TrendingUp className="h-5 w-5" />}
          change={{ value: 5 }}
        />
        <StatsCard
          title="Số dư Coin"
          value={user?.wallet || 0}
          icon={<Coins className="h-5 w-5" />}
          change={{ value: 20 }}
        />
        <StatsCard
          title="Cross-sale chờ"
          value={pendingCrossSales.length}
          icon={<Handshake className="h-5 w-5" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-6 flex flex-wrap gap-3">
        <Link href="/crm">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm Lead mới
          </Button>
        </Link>
        <Link href="/cross-sale">
          <Button variant="outline" className="gap-2">
            <Handshake className="h-4 w-4" />
            Tạo Cross-sale
          </Button>
        </Link>
        <Link href="/content/create">
          <Button variant="outline">Viết bài</Button>
        </Link>
      </div>

      {/* Charts Row */}
      <div className="mb-6 grid gap-6 lg:grid-cols-2">
        {/* Lead Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Xu hướng Lead theo tháng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis dataKey="name" stroke="#6B7280" fontSize={12} />
                  <YAxis stroke="#6B7280" fontSize={12} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="leads"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={{ fill: '#2563EB' }}
                    name="Leads"
                  />
                  <Line
                    type="monotone"
                    dataKey="deals"
                    stroke="#22C55E"
                    strokeWidth={2}
                    dot={{ fill: '#22C55E' }}
                    name="Deals"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Pipeline */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pipelineData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                  <XAxis type="number" stroke="#6B7280" fontSize={12} />
                  <YAxis
                    type="category"
                    dataKey="name"
                    stroke="#6B7280"
                    fontSize={12}
                    width={80}
                  />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2563EB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Leads */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Leads gần đây</CardTitle>
            <Link href="/crm">
              <Button variant="ghost" size="sm" className="gap-1">
                Xem tất cả
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.length > 0 ? (
                recentLeads.map((lead) => (
                  <Link
                    key={lead.id}
                    href={`/crm/${lead.id}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {lead.company}
                      </p>
                      <p className="text-sm text-gray-500">{lead.contact}</p>
                    </div>
                    <div className="text-right">
                      <Badge className={stageColors[lead.stage]}>
                        {stageLabels[lead.stage]}
                      </Badge>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatRelativeTime(lead.updatedAt)}
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="py-4 text-center text-gray-500">
                  Chưa có lead nào. Tạo lead đầu tiên!
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Pending Cross-sales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Cross-sale chờ xử lý</CardTitle>
            <Link href="/cross-sale">
              <Button variant="ghost" size="sm" className="gap-1">
                Xem tất cả
                <ArrowUpRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingCrossSales.length > 0 ? (
                pendingCrossSales.map((cs) => (
                  <Link
                    key={cs.id}
                    href={`/cross-sale/${cs.id}`}
                    className="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {cs.leadName}
                      </p>
                      <p className="text-sm text-gray-500">
                        Từ: {cs.fromUserName}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge variant="warning">Chờ duyệt</Badge>
                      <p className="mt-1 text-xs text-gray-400">
                        {Math.round(cs.commissionRate * 100)}% hoa hồng
                      </p>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="py-4 text-center text-gray-500">
                  Không có yêu cầu cross-sale nào
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
