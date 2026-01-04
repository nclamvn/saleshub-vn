'use client';

import React from 'react';
import { Coins, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/page-header';
import { useAuthStore } from '@/stores/auth-store';
import { transactions as allTransactions } from '@/data/transactions';
import { formatRelativeTime, transactionLabels, formatNumber } from '@/lib/utils';
import { Transaction } from '@/types';

export default function WalletPage() {
  const { user } = useAuthStore();
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);

  React.useEffect(() => {
    const userTx = allTransactions
      .filter((tx) => tx.userId === user?.id)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    setTransactions(userTx);
  }, [user]);

  const totalEarned = transactions
    .filter((tx) => tx.amount > 0)
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalSpent = transactions
    .filter((tx) => tx.amount < 0)
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  return (
    <div>
      <PageHeader
        title="Ví Coin"
        description="Quản lý số dư và giao dịch coin của bạn"
      />

      {/* Balance Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="bg-gradient-to-br from-primary to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Số dư hiện tại</p>
                <p className="mt-2 text-4xl font-bold">{formatNumber(user?.wallet || 0)}</p>
                <p className="mt-1 text-sm text-blue-100">coin</p>
              </div>
              <Coins className="h-12 w-12 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Tổng đã kiếm</p>
                <p className="mt-2 text-3xl font-bold text-green-600">+{formatNumber(totalEarned)}</p>
                <p className="mt-1 text-sm text-gray-400">coin</p>
              </div>
              <div className="rounded-full bg-green-100 p-3 text-green-600">
                <TrendingUp className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">Tổng đã chi</p>
                <p className="mt-2 text-3xl font-bold text-red-600">-{formatNumber(totalSpent)}</p>
                <p className="mt-1 text-sm text-gray-400">coin</p>
              </div>
              <div className="rounded-full bg-red-100 p-3 text-red-600">
                <TrendingDown className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* How to earn */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cách kiếm coin</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: 'Cross-sale', desc: 'Hỗ trợ đồng nghiệp close deal', coin: '10-200' },
              { title: 'Viết bài', desc: 'Chia sẻ kiến thức bán hàng', coin: '20-100' },
              { title: 'Đánh giá', desc: 'Review công ty bạn đã làm', coin: '15-30' },
              { title: 'Hoàn thành hồ sơ', desc: 'Cập nhật đầy đủ thông tin', coin: '20' },
            ].map((item) => (
              <div key={item.title} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white">{item.title}</h4>
                <p className="mt-1 text-sm text-gray-500">{item.desc}</p>
                <p className="mt-2 text-sm font-semibold text-primary">+{item.coin} coin</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4 dark:border-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        tx.amount > 0
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {tx.amount > 0 ? (
                        <ArrowDownLeft className="h-5 w-5" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transactionLabels[tx.type] || tx.type}
                      </p>
                      <p className="text-sm text-gray-500">{tx.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        tx.amount > 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {tx.amount > 0 ? '+' : ''}{tx.amount} coin
                    </p>
                    <p className="text-xs text-gray-400">
                      {formatRelativeTime(tx.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-gray-500">
                Chưa có giao dịch nào
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
