'use client';

import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Eye, FileText, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PageHeader } from '@/components/shared/page-header';
import { contents } from '@/data/content';
import { formatDate, truncateText } from '@/lib/utils';

export default function AdminContentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');

  const filteredContent = contents.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Quản lý nội dung" description={`Tổng cộng ${contents.length} bài viết/khóa học`} />

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Tìm theo tiêu đề..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800 text-sm">
              <option value="all">Tất cả loại</option>
              <option value="article">Bài viết</option>
              <option value="course">Khóa học</option>
            </select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Nội dung</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Loại</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Tác giả</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Giá</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Lượt xem</th>
                  <th className="px-6 py-4 text-right text-sm font-medium text-gray-500">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredContent.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-slate-800/50">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.type === 'article' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-purple-100 dark:bg-purple-900'}`}>
                          {item.type === 'article' ? <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" /> : <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">{truncateText(item.title, 40)}</p>
                          <p className="text-sm text-gray-500">{truncateText(item.excerpt, 50)}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4"><Badge variant={item.type === 'article' ? 'default' : 'secondary'}>{item.type === 'article' ? 'Bài viết' : 'Khóa học'}</Badge></td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.authorName}</td>
                    <td className="px-6 py-4">{item.priceCoin === 0 ? <span className="text-green-600">Miễn phí</span> : <span className="font-medium text-amber-600">{item.priceCoin} coin</span>}</td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{item.views}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm" title="Xem"><Eye className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" title="Duyệt" className="text-green-600"><CheckCircle className="w-4 h-4" /></Button>
                        <Button variant="ghost" size="sm" title="Từ chối" className="text-red-600"><XCircle className="w-4 h-4" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
