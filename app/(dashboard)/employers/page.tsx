'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Star, MapPin, Users, Building2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/page-header';
import { employers } from '@/data/employers';
import { INDUSTRIES } from '@/lib/constants';

export default function EmployersPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [industryFilter, setIndustryFilter] = React.useState('all');

  const filteredEmployers = employers.filter((emp) => {
    const matchesSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = industryFilter === 'all' || emp.industry === industryFilter;
    return matchesSearch && matchesIndustry;
  });

  return (
    <div>
      <PageHeader
        title="Nhà tuyển dụng"
        description={`${employers.length} công ty đã được đánh giá`}
      />

      {/* Filters */}
      <Card className="mb-6 p-4">
        <div className="flex flex-col gap-4 md:flex-row">
          <div className="flex-1">
            <Input
              placeholder="Tìm kiếm công ty..."
              icon={<Search className="h-4 w-4" />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select
            options={[
              { value: 'all', label: 'Tất cả ngành' },
              ...INDUSTRIES.map((i) => ({ value: i, label: i })),
            ]}
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value)}
            className="md:w-48"
          />
        </div>
      </Card>

      {/* Employers Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredEmployers.map((employer) => (
          <Link key={employer.id} href={`/employers/${employer.id}`}>
            <Card hover className="h-full p-5 transition-all">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-xl font-bold text-gray-600 dark:bg-gray-800">
                  {employer.name.charAt(0)}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                    {employer.name}
                  </h3>
                  <p className="text-sm text-gray-500">{employer.industry}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-gray-900 dark:text-white">
                    {employer.ratingAvg.toFixed(1)}
                  </span>
                  <span>({employer.ratingCount})</span>
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {employer.size}
                </span>
              </div>

              <div className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                <MapPin className="h-4 w-4" />
                {employer.location}
              </div>

              {employer.description && (
                <p className="mt-3 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
                  {employer.description}
                </p>
              )}

              <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-700">
                <Badge variant="secondary">{employer.ratingCount} đánh giá</Badge>
                <span className="text-sm text-primary">Xem chi tiết →</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filteredEmployers.length === 0 && (
        <Card className="p-8 text-center">
          <Building2 className="mx-auto h-12 w-12 text-gray-400" />
          <p className="mt-4 text-gray-500">Không tìm thấy công ty phù hợp</p>
        </Card>
      )}
    </div>
  );
}
