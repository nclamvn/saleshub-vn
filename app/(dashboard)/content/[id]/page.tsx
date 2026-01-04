'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, ThumbsUp, Share2, Bookmark, Calendar, Clock, Coins } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/page-header';
import { contents } from '@/data/content';
import { formatDate, formatRelativeTime } from '@/lib/utils';

export default function ContentDetailPage() {
  const params = useParams();
  const article = contents.find((c) => c.id === params.id);

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Không tìm thấy nội dung</h2>
        <p className="text-gray-500 mb-4">Nội dung này không tồn tại hoặc đã bị xóa</p>
        <Link href="/content"><Button><ArrowLeft className="w-4 h-4 mr-2" />Quay lại danh sách</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <PageHeader title="" description="" action={<Link href="/content"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button></Link>} />

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Badge variant={article.type === 'article' ? 'default' : 'secondary'}>{article.type === 'article' ? 'Bài viết' : 'Khóa học'}</Badge>
          {article.priceCoin === 0 ? <Badge className="bg-green-100 text-green-800">Miễn phí</Badge> : <Badge className="bg-amber-100 text-amber-800"><Coins className="w-3 h-3 mr-1" />{article.priceCoin} coin</Badge>}
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{article.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">{article.excerpt}</p>

        <div className="flex items-center justify-between flex-wrap gap-4 py-4 border-y border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar name={article.authorName} size="md" />
            <div>
              <p className="font-medium">{article.authorName}</p>
              <div className="flex items-center gap-3 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />{formatDate(article.createdAt)}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" />5 phút đọc</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm"><ThumbsUp className="w-4 h-4 mr-1" />{article.votes}</Button>
            <Button variant="ghost" size="sm"><Eye className="w-4 h-4 mr-1" />{article.views}</Button>
            <Button variant="ghost" size="sm"><Bookmark className="w-4 h-4" /></Button>
            <Button variant="ghost" size="sm"><Share2 className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {article.body.split('\n\n').map((paragraph, index) => <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>)}
          </div>
        </CardContent>
      </Card>

      {article.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Tags:</span>
          {article.tags.map((tag) => <Badge key={tag} variant="secondary">#{tag}</Badge>)}
        </div>
      )}

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button><ThumbsUp className="w-4 h-4 mr-2" />Thích bài viết</Button>
              <Button variant="secondary"><Share2 className="w-4 h-4 mr-2" />Chia sẻ</Button>
            </div>
            <Button variant="ghost"><Bookmark className="w-4 h-4 mr-2" />Lưu lại</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
