'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Plus, BookOpen, FileText, Eye, ThumbsUp, Coins } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Avatar } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/page-header';
import { contents } from '@/data/content';
import { formatRelativeTime, formatNumber } from '@/lib/utils';

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeTab, setActiveTab] = React.useState('all');

  const filteredContent = contents.filter((content) => {
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = activeTab === 'all' || content.type === activeTab;
    return matchesSearch && matchesType;
  });

  const articles = contents.filter((c) => c.type === 'article');
  const courses = contents.filter((c) => c.type === 'course');

  return (
    <div>
      <PageHeader
        title="Kiến thức"
        description="Học hỏi và chia sẻ kinh nghiệm bán hàng"
        action={
          <Link href="/content/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Viết bài mới
            </Button>
          </Link>
        }
      />

      {/* Search */}
      <Card className="mb-6 p-4">
        <Input
          placeholder="Tìm kiếm bài viết, khóa học..."
          icon={<Search className="h-4 w-4" />}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            Tất cả ({contents.length})
          </TabsTrigger>
          <TabsTrigger value="article">
            <FileText className="mr-2 h-4 w-4" />
            Bài viết ({articles.length})
          </TabsTrigger>
          <TabsTrigger value="course">
            <BookOpen className="mr-2 h-4 w-4" />
            Khóa học ({courses.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredContent.map((content) => (
              <Link key={content.id} href={`/content/${content.id}`}>
                <Card hover className="h-full overflow-hidden">
                  {/* Cover Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {content.type === 'course' ? (
                      <BookOpen className="h-12 w-12 text-primary/50" />
                    ) : (
                      <FileText className="h-12 w-12 text-primary/50" />
                    )}
                  </div>

                  <div className="p-4">
                    {/* Type & Price */}
                    <div className="mb-2 flex items-center gap-2">
                      <Badge variant={content.type === 'course' ? 'purple' : 'info'}>
                        {content.type === 'course' ? 'Khóa học' : 'Bài viết'}
                      </Badge>
                      {content.priceCoin > 0 ? (
                        <Badge variant="warning" className="gap-1">
                          <Coins className="h-3 w-3" />
                          {content.priceCoin}
                        </Badge>
                      ) : (
                        <Badge variant="success">Miễn phí</Badge>
                      )}
                    </div>

                    {/* Title */}
                    <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 dark:text-white">
                      {content.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mb-4 line-clamp-2 text-sm text-gray-500">
                      {content.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-2">
                      <Avatar name={content.authorName} size="sm" />
                      <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {content.authorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatRelativeTime(content.createdAt)}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-4 flex items-center gap-4 border-t border-gray-200 pt-4 text-sm text-gray-500 dark:border-gray-700">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {formatNumber(content.views)}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {formatNumber(content.votes)}
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          {filteredContent.length === 0 && (
            <Card className="p-8 text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <p className="mt-4 text-gray-500">Không tìm thấy nội dung phù hợp</p>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
