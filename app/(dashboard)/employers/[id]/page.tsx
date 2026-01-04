'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, MapPin, Users, Globe, Star, ThumbsUp, ThumbsDown, MessageSquare, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/shared/page-header';
import { employers } from '@/data/employers';
import { formatRelativeTime } from '@/lib/utils';

export default function EmployerDetailPage() {
  const params = useParams();
  const [newReview, setNewReview] = useState({ pros: '', cons: '', comment: '', rating: 5 });
  const employer = employers.find((e) => e.id === params.id);

  if (!employer) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Không tìm thấy công ty</h2>
        <p className="text-gray-500 mb-4">Công ty này không tồn tại hoặc đã bị xóa</p>
        <Link href="/employers"><Button><ArrowLeft className="w-4 h-4 mr-2" />Quay lại danh sách</Button></Link>
      </div>
    );
  }

  const renderStars = (rating: number) => [...Array(5)].map((_, i) => <Star key={i} className={`w-5 h-5 ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />);

  return (
    <div className="space-y-6">
      <PageHeader title="" description="" action={<Link href="/employers"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button></Link>} />

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-24 h-24 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center">
              <Building2 className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold mb-2">{employer.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1"><Building2 className="w-4 h-4" />{employer.industry}</span>
                <span className="flex items-center gap-1"><Users className="w-4 h-4" />{employer.size}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{employer.location}</span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1">{renderStars(employer.ratingAvg)}</div>
                <span className="font-semibold text-lg">{employer.ratingAvg.toFixed(1)}</span>
                <span className="text-gray-500">({employer.ratingCount} đánh giá)</span>
              </div>
            </div>
          </div>
          {employer.description && <div className="mt-6 pt-6 border-t"><h3 className="font-semibold mb-2">Giới thiệu</h3><p className="text-gray-600 dark:text-gray-400">{employer.description}</p></div>}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" />Đánh giá ({employer.reviews.length})</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {employer.reviews.length === 0 ? <p className="text-center text-gray-500 py-8">Chưa có đánh giá nào</p> : employer.reviews.map((review) => (
                <div key={review.id} className="p-4 bg-gray-50 dark:bg-slate-800 rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name={review.isAnonymous ? 'A' : 'User'} size="sm" />
                      <div>
                        <p className="font-medium">{review.isAnonymous ? 'Ẩn danh' : 'Nhân viên'}</p>
                        {review.position && <p className="text-sm text-gray-500">{review.position}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-medium mb-1"><ThumbsUp className="w-4 h-4" />Ưu điểm</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.pros}</p>
                    </div>
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-400 font-medium mb-1"><ThumbsDown className="w-4 h-4" />Nhược điểm</div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{review.cons}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400">{formatRelativeTime(review.createdAt)}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Viết đánh giá</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Đánh giá</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} type="button" onClick={() => setNewReview({ ...newReview, rating: star })} className="p-1">
                      <Star className={`w-6 h-6 ${star <= newReview.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2"><ThumbsUp className="w-4 h-4 inline mr-1 text-green-600" />Ưu điểm</label>
                <Textarea placeholder="Những điểm tốt của công ty..." value={newReview.pros} onChange={(e) => setNewReview({ ...newReview, pros: e.target.value })} rows={2} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2"><ThumbsDown className="w-4 h-4 inline mr-1 text-red-600" />Nhược điểm</label>
                <Textarea placeholder="Những điểm cần cải thiện..." value={newReview.cons} onChange={(e) => setNewReview({ ...newReview, cons: e.target.value })} rows={2} />
              </div>
              <Button className="w-full"><Send className="w-4 h-4 mr-2" />Gửi đánh giá (+5 coin)</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
