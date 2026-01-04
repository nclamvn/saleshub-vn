'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Camera, User, Mail, Phone, Building2, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/page-header';
import { useAuthStore } from '@/stores/auth-store';

export default function EditProfilePage() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', company: user?.company || '', bio: user?.bio || '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateUser(formData);
    setIsSubmitting(false);
    router.push('/profile');
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <PageHeader title="Chỉnh sửa hồ sơ" description="Cập nhật thông tin cá nhân của bạn" action={<Link href="/profile"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button></Link>} />

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Ảnh đại diện</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <div className="relative">
              <Avatar name={formData.name || user.name} size="xl" />
              <button type="button" className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full hover:bg-primary/90"><Camera className="w-4 h-4" /></button>
            </div>
            <p className="text-sm text-gray-500 mt-4 text-center">JPG, GIF hoặc PNG. Tối đa 2MB.</p>
            <Button type="button" variant="secondary" className="mt-4">Tải ảnh lên</Button>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Thông tin cá nhân</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2"><User className="w-4 h-4 inline mr-1" />Họ và tên</label>
                <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2"><Mail className="w-4 h-4 inline mr-1" />Email</label>
                <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2"><Phone className="w-4 h-4 inline mr-1" />Số điện thoại</label>
                <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2"><Building2 className="w-4 h-4 inline mr-1" />Công ty</label>
                <Input value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2"><FileText className="w-4 h-4 inline mr-1" />Giới thiệu bản thân</label>
              <Textarea value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} rows={4} />
            </div>
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Link href="/profile"><Button type="button" variant="ghost">Hủy</Button></Link>
              <Button type="submit" disabled={isSubmitting}><Save className="w-4 h-4 mr-2" />{isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}</Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
