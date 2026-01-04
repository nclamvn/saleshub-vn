'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Building2, User, Phone, Mail, Calendar, DollarSign, Edit, Trash2, MessageSquare, Clock, Plus, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { PageHeader } from '@/components/shared/page-header';
import { leads } from '@/data/leads';
import { formatCurrency, formatDate, formatRelativeTime, stageColors, stageLabels } from '@/lib/utils';

export default function LeadDetailPage() {
  const params = useParams();
  const [newNote, setNewNote] = useState('');
  const lead = leads.find((l) => l.id === params.id);

  if (!lead) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Không tìm thấy lead</h2>
        <p className="text-gray-500 mb-4">Lead này không tồn tại hoặc đã bị xóa</p>
        <Link href="/crm"><Button><ArrowLeft className="w-4 h-4 mr-2" />Quay lại danh sách</Button></Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader title={lead.company} description={`Lead #${lead.id.slice(-6)}`} action={
        <div className="flex gap-2">
          <Link href="/crm"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button></Link>
          <Button variant="secondary"><Edit className="w-4 h-4 mr-2" />Chỉnh sửa</Button>
          <Button variant="danger"><Trash2 className="w-4 h-4 mr-2" />Xóa</Button>
        </div>
      } />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2"><Building2 className="w-5 h-5" />Thông tin liên hệ</CardTitle>
                <Badge className={stageColors[lead.stage]}>{stageLabels[lead.stage]}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <User className="w-5 h-5 text-gray-400" />
                  <div><p className="text-sm text-gray-500">Người liên hệ</p><p className="font-medium">{lead.contact}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <Phone className="w-5 h-5 text-gray-400" />
                  <div><p className="text-sm text-gray-500">Số điện thoại</p><p className="font-medium">{lead.phone}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <div><p className="text-sm text-gray-500">Email</p><p className="font-medium">{lead.email}</p></div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                  <div><p className="text-sm text-gray-500">Giá trị</p><p className="font-medium text-green-600">{formatCurrency(lead.value)}</p></div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><MessageSquare className="w-5 h-5" />Ghi chú ({lead.notes.length})</CardTitle></CardHeader>
            <CardContent>
              <div className="flex gap-2 mb-4">
                <Textarea placeholder="Thêm ghi chú mới..." value={newNote} onChange={(e) => setNewNote(e.target.value)} rows={2} className="flex-1" />
                <Button disabled={!newNote.trim()}><Send className="w-4 h-4" /></Button>
              </div>
              <div className="space-y-3">
                {lead.notes.length === 0 ? <p className="text-center text-gray-500 py-4">Chưa có ghi chú nào</p> : lead.notes.map((note) => (
                  <div key={note.id} className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-sm">{note.content}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatRelativeTime(note.createdAt)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Thao tác nhanh</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <Button variant="secondary" className="w-full justify-start"><Phone className="w-4 h-4 mr-2" />Gọi điện</Button>
              <Button variant="secondary" className="w-full justify-start"><Mail className="w-4 h-4 mr-2" />Gửi email</Button>
              <Button variant="secondary" className="w-full justify-start"><Calendar className="w-4 h-4 mr-2" />Đặt lịch hẹn</Button>
              <Button variant="secondary" className="w-full justify-start"><Plus className="w-4 h-4 mr-2" />Tạo cross-sale</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Clock className="w-5 h-5" />Lịch sử</CardTitle></CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div><p className="text-sm font-medium">Lead được tạo</p><p className="text-xs text-gray-500">{formatDate(lead.createdAt)}</p></div>
                </div>
                {lead.updatedAt !== lead.createdAt && (
                  <div className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                    <div><p className="text-sm font-medium">Cập nhật gần nhất</p><p className="text-xs text-gray-500">{formatDate(lead.updatedAt)}</p></div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
