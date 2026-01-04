'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save, Eye, Image, Tag } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/shared/page-header';

export default function CreateContentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ title: '', type: 'article', excerpt: '', body: '', priceCoin: 0, tags: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    router.push('/content');
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Tạo nội dung mới" description="Chia sẻ kiến thức và kiếm coin" action={<Link href="/content"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button></Link>} />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Thông tin cơ bản</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tiêu đề</label>
                <Input placeholder="Nhập tiêu đề bài viết..." value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Loại nội dung</label>
                <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-slate-800">
                  <option value="article">Bài viết</option>
                  <option value="course">Khóa học</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Mô tả ngắn</label>
                <Textarea placeholder="Mô tả tóm tắt nội dung..." value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} rows={3} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nội dung</label>
                <Textarea placeholder="Viết nội dung chi tiết ở đây..." value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} rows={15} required />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Cài đặt xuất bản</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Giá (coin)</label>
                <Input type="number" min="0" placeholder="0 = miễn phí" value={formData.priceCoin} onChange={(e) => setFormData({ ...formData, priceCoin: parseInt(e.target.value) || 0 })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2"><Tag className="w-4 h-4 inline mr-1" />Tags</label>
                <Input placeholder="sales, tips, career..." value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 space-y-2">
              <Button type="submit" className="w-full" disabled={isSubmitting}><Save className="w-4 h-4 mr-2" />{isSubmitting ? 'Đang lưu...' : 'Xuất bản'}</Button>
              <Button type="button" variant="secondary" className="w-full"><Eye className="w-4 h-4 mr-2" />Xem trước</Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
