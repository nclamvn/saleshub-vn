'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/page-header';
import { useAuthStore } from '@/stores/auth-store';
import { leads as allLeads } from '@/data/leads';
import { stageLabels, formatCurrency, formatRelativeTime, cn } from '@/lib/utils';
import { Lead, LeadStage } from '@/types';

const PIPELINE_STAGES: { key: LeadStage; label: string; color: string }[] = [
  { key: 'new', label: 'Mới', color: 'border-t-blue-500' },
  { key: 'contacted', label: 'Đã liên hệ', color: 'border-t-yellow-500' },
  { key: 'qualified', label: 'Đủ điều kiện', color: 'border-t-purple-500' },
  { key: 'negotiation', label: 'Đàm phán', color: 'border-t-orange-500' },
  { key: 'closed_won', label: 'Thành công', color: 'border-t-green-500' },
  { key: 'closed_lost', label: 'Thất bại', color: 'border-t-red-500' },
];

export default function PipelinePage() {
  const { user } = useAuthStore();
  const [leads, setLeads] = React.useState<Lead[]>([]);

  React.useEffect(() => {
    const userLeads = allLeads.filter((l) => l.ownerId === user?.id);
    setLeads(userLeads);
  }, [user]);

  const getLeadsByStage = (stage: LeadStage) => leads.filter((l) => l.stage === stage);

  const handleDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDrop = (e: React.DragEvent, newStage: LeadStage) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData('leadId');
    setLeads((prev) =>
      prev.map((lead) =>
        lead.id === leadId
          ? { ...lead, stage: newStage, updatedAt: new Date().toISOString() }
          : lead
      )
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <PageHeader
        title="Pipeline View"
        description="Kéo thả lead để cập nhật giai đoạn"
        breadcrumbs={[
          { label: 'CRM', href: '/crm' },
          { label: 'Pipeline' },
        ]}
      >
        <Link href="/crm">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Quay lại
          </Button>
        </Link>
      </PageHeader>

      {/* Pipeline Board */}
      <div className="flex gap-4 overflow-x-auto pb-4">
        {PIPELINE_STAGES.map((stage) => {
          const stageLeads = getLeadsByStage(stage.key);
          const totalValue = stageLeads.reduce((sum, l) => sum + l.value, 0);

          return (
            <div
              key={stage.key}
              className="w-72 shrink-0"
              onDrop={(e) => handleDrop(e, stage.key)}
              onDragOver={handleDragOver}
            >
              {/* Column Header */}
              <div className={cn('mb-3 rounded-t-lg border-t-4 bg-white p-3 dark:bg-gray-800', stage.color)}>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {stage.label}
                  </h3>
                  <Badge variant="secondary">{stageLeads.length}</Badge>
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  {formatCurrency(totalValue)}
                </p>
              </div>

              {/* Cards Container */}
              <div className="min-h-[400px] space-y-3 rounded-b-lg bg-gray-100 p-2 dark:bg-gray-900">
                {stageLeads.map((lead) => (
                  <Link key={lead.id} href={`/crm/${lead.id}`}>
                    <Card
                      draggable
                      onDragStart={(e) => handleDragStart(e, lead.id)}
                      className="cursor-grab p-3 transition-shadow hover:shadow-md active:cursor-grabbing"
                    >
                      <h4 className="mb-1 font-medium text-gray-900 dark:text-white">
                        {lead.company}
                      </h4>
                      <p className="mb-2 text-sm text-gray-500">{lead.contact}</p>

                      <div className="flex flex-wrap gap-2 text-xs text-gray-400">
                        {lead.industry && (
                          <span className="flex items-center gap-1">
                            <Building2 className="h-3 w-3" />
                            {lead.industry}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-gray-200 pt-2 dark:border-gray-700">
                        <span className="text-sm font-medium text-primary">
                          {formatCurrency(lead.value)}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatRelativeTime(lead.updatedAt)}
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}

                {stageLeads.length === 0 && (
                  <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
                    <p className="text-sm text-gray-400">Kéo lead vào đây</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
