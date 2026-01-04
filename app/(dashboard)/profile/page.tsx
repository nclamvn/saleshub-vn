'use client';

import React from 'react';
import Link from 'next/link';
import { Edit, Mail, Phone, Building2, Coins, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/page-header';
import { useAuthStore } from '@/stores/auth-store';
import { roleLabels, roleColors, formatDate, formatNumber } from '@/lib/utils';

export default function ProfilePage() {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <div>
      <PageHeader
        title="Hồ sơ cá nhân"
        action={
          <Link href="/profile/edit">
            <Button>
              <Edit className="mr-2 h-4 w-4" />
              Chỉnh sửa
            </Button>
          </Link>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <Avatar name={user.name} size="xl" />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.name}
                  </h2>
                  <div className="mt-2 flex flex-wrap items-center justify-center gap-2 sm:justify-start">
                    <Badge className={roleColors[user.role]}>
                      {roleLabels[user.role]}
                    </Badge>
                    <Badge variant="secondary" className="gap-1">
                      <Coins className="h-3 w-3" />
                      {formatNumber(user.wallet)} coin
                    </Badge>
                  </div>
                  {user.bio && (
                    <p className="mt-4 text-gray-600 dark:text-gray-400">
                      {user.bio}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <Phone className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Điện thoại</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.phone}</p>
                    </div>
                  </div>
                )}
                {user.company && (
                  <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                    <Building2 className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm text-gray-500">Công ty</p>
                      <p className="font-medium text-gray-900 dark:text-white">{user.company}</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Tham gia</p>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {formatDate(user.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Wallet Summary */}
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white">
            <CardContent className="p-6">
              <p className="text-blue-100">Số dư coin</p>
              <p className="mt-2 text-4xl font-bold">{formatNumber(user.wallet)}</p>
              <Link href="/wallet">
                <Button variant="secondary" className="mt-4 w-full bg-white/20 hover:bg-white/30">
                  Xem chi tiết
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Thao tác nhanh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/profile/edit" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Chỉnh sửa hồ sơ
                </Button>
              </Link>
              <Link href="/settings" className="block">
                <Button variant="outline" className="w-full justify-start">
                  Cài đặt tài khoản
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
