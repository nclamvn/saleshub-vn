'use client';

import { useState } from 'react';
import { Search, Filter, MoreVertical, UserPlus, Mail, Shield } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/page-header';
import { users } from '@/data/users';
import { roleLabels, roleColors, formatDate } from '@/lib/utils';

export default function AdminUsersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Quản lý người dùng" description={`Tổng cộng ${users.length} người dùng`} action={<Button><UserPlus className="w-4 h-4 mr-2" />Thêm người dùng</Button>} />

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Tìm theo tên hoặc email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <div className="flex gap-2">
              <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
                <option value="all">Tất cả vai trò</option>
                <option value="sales">Sales</option>
                <option value="recruiter">Recruiter</option>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Người dùng</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Vai trò</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Công ty</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Coin</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Ngày tạo</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={user.name} size="md" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge className={roleColors[user.role]}>{roleLabels[user.role]}</Badge></td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{user.company || '-'}</td>
                    <td className="px-6 py-4"><span className="font-medium text-amber-600">{user.wallet}</span></td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{formatDate(user.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm"><Mail className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><Shield className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredUsers.length === 0 && <div className="p-12 text-center"><p className="text-gray-500">Không tìm thấy người dùng phù hợp</p></div>}
        </CardContent>
      </Card>
    </div>
  );
}
