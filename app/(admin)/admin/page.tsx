'use client';

import { Users, FileText, TrendingUp, DollarSign, BarChart3, Activity } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from '@/components/shared/page-header';
import { StatsCard } from '@/components/shared/stats-card';
import { users } from '@/data/users';
import { leads } from '@/data/leads';
import { contents } from '@/data/content';
import { crossSales } from '@/data/cross-sales';

export default function AdminDashboardPage() {
  const stats = [
    { title: 'Tổng người dùng', value: users.length.toString(), icon: <Users className="w-6 h-6" />, change: { value: 12, label: 'so với tháng trước' } },
    { title: 'Tổng leads', value: leads.length.toString(), icon: <TrendingUp className="w-6 h-6" />, change: { value: 8, label: 'so với tháng trước' } },
    { title: 'Nội dung', value: contents.length.toString(), icon: <FileText className="w-6 h-6" />, change: { value: 5, label: 'so với tháng trước' } },
    { title: 'Cross-sales', value: crossSales.length.toString(), icon: <DollarSign className="w-6 h-6" />, change: { value: 15, label: 'so với tháng trước' } },
  ];

  const roleStats = [
    { role: 'Sales', count: users.filter(u => u.role === 'sales').length, color: 'bg-blue-500' },
    { role: 'Recruiter', count: users.filter(u => u.role === 'recruiter').length, color: 'bg-purple-500' },
    { role: 'Employee', count: users.filter(u => u.role === 'employee').length, color: 'bg-green-500' },
    { role: 'Admin', count: users.filter(u => u.role === 'admin').length, color: 'bg-red-500' },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Admin Dashboard" description="Tổng quan hệ thống SalesHub VN" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatsCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Phân bố người dùng theo vai trò
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roleStats.map((item) => (
                <div key={item.role} className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${item.color}`} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">{item.role}</span>
                      <span className="text-sm text-gray-500">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: `${(item.count / users.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Hoạt động gần đây
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'Người dùng mới đăng ký', user: 'Nguyễn Văn A', time: '5 phút trước' },
                { action: 'Nội dung mới được tạo', user: 'Trần Thị B', time: '15 phút trước' },
                { action: 'Cross-sale hoàn thành', user: 'Lê Văn C', time: '1 giờ trước' },
                { action: 'Lead mới được thêm', user: 'Phạm Thị D', time: '2 giờ trước' },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
