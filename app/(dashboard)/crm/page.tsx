'use client';

import React from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Mail } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select } from '@/components/ui/select';
import { Modal } from '@/components/ui/modal';
import { PageHeader } from '@/components/shared/page-header';
import { EmptyState } from '@/components/shared/empty-state';
import { useAuthStore } from '@/stores/auth-store';
import { leads as allLeads } from '@/data/leads';
import { stageLabels, stageColors, formatCurrency, formatRelativeTime } from '@/lib/utils';
import { LEAD_STAGES, INDUSTRIES } from '@/lib/constants';
import { Lead } from '@/types';

export default function CRMPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [stageFilter, setStageFilter] = React.useState('all');
  const [showAddModal, setShowAddModal] = React.useState(false);
  const [leads, setLeads] = React.useState<Lead[]>([]);

  React.useEffect(() => {
    const userLeads = allLeads.filter((l) => l.ownerId === user?.id);
    setLeads(userLeads);
  }, [user]);

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStage = stageFilter === 'all' || lead.stage === stageFilter;
    return matchesSearch && matchesStage;
  });

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.stage === 'new').length,
    inProgress: leads.filter((l) => ['contacted', 'qualified', 'negotiation'].includes(l.stage)).length,
    closed: leads.filter((l) => ['closed_won', 'closed_lost'].includes(l.stage)).length,
  };

  return (
    <div>
      <PageHeader
        title="CRM - Quản lý Lead"
        description={`Bạn đang có ${leads.length} leads`}
        action={
          <Button onClick={() => setShowAddModal(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Thêm Lead
          </Button>
        }
      />

      <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          <p className="text-sm text-gray-500">Tổng leads</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-blue-600">{stats.new}</p>
          <p className="text-sm text-gray-500">Mới</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.inProgress}</p>
          <p className="text-sm text-gray-500">Đang xử lý</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.closed}</p>
          <p className="text-sm text-gray-500">Đã đóng</p>
        </Card>
      </div>

      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm theo tên công ty, liên hệ..."
              icon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select
              options={[{ value: 'all', label: 'Tất cả giai đoạn' }, ...LEAD_STAGES.map((s) => ({ value: s.value, label: s.label }))]}
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="w-40"
            />
            <Link href="/crm/pipeline">
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Pipeline
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {filteredLeads.length > 0 ? (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Công ty</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Liên hệ</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Giai đoạn</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Giá trị</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Cập nhật</th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4">
                      <Link href={`/crm/${lead.id}`}>
                        <p className="font-medium text-gray-900 hover:text-primary dark:text-white">{lead.company}</p>
                        <p className="text-sm text-gray-500">{lead.industry}</p>
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-gray-900 dark:text-white">{lead.contact}</p>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />{lead.email}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <Badge className={stageColors[lead.stage]}>{stageLabels[lead.stage]}</Badge>
                    </td>
                    <td className="px-4 py-4 text-gray-900 dark:text-white">{formatCurrency(lead.value)}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{formatRelativeTime(lead.updatedAt)}</td>
                    <td className="px-4 py-4 text-right">
                      <Link href={`/crm/${lead.id}`}>
                        <Button variant="ghost" size="sm">Xem</Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card className="p-8">
          <EmptyState
            title="Chưa có lead nào"
            description="Bắt đầu thêm leads để quản lý pipeline"
            action={{ label: 'Thêm Lead', onClick: () => setShowAddModal(true) }}
          />
        </Card>
      )}

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Thêm Lead mới" size="lg">
        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Tên công ty *" placeholder="VD: FPT Software" required />
            <Input label="Người liên hệ *" placeholder="VD: Nguyễn Văn A" required />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Input label="Email" type="email" placeholder="email@company.com" />
            <Input label="Số điện thoại" placeholder="0901234567" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Select label="Ngành nghề" options={INDUSTRIES.map((i) => ({ value: i, label: i }))} />
            <Input label="Giá trị deal (VND)" type="number" placeholder="500000000" />
          </div>
          <Input label="Nguồn" placeholder="VD: LinkedIn, Hội thảo..." />
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>Hủy</Button>
            <Button type="submit">Tạo Lead</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
