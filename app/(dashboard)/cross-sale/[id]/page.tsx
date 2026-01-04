'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, User, Calendar, Coins, CheckCircle, XCircle, Clock, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { PageHeader } from '@/components/shared/page-header';
import { crossSales } from '@/data/cross-sales';
import { leads } from '@/data/leads';
import { formatDate, formatCurrency, formatRelativeTime } from '@/lib/utils';

const statusConfig = {
  pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  accepted: { label: 'Đã chấp nhận', color: 'bg-blue-100 text-blue-800', icon: CheckCircle },
  rejected: { label: 'Đã từ chối', color: 'bg-red-100 text-red-800', icon: XCircle },
  completed: { label: 'Hoàn thành', color: 'bg-green-100 text-green-800', icon: CheckCircle },
};

export default function CrossSaleDetailPage() {
  const params = useParams();
  const crossSale = crossSales.find((cs) => cs.id === params.id);
  const lead = crossSale ? leads.find((l) => l.id === crossSale.leadId) : null;

  if (!crossSale) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h2 className="text-xl font-semibold mb-2">Không tìm thấy cross-sale</h2>
        <p className="text-gray-500 mb-4">Cross-sale này không tồn tại hoặc đã bị xóa</p>
        <Link href="/cross-sale"><Button><ArrowLeft className="w-4 h-4 mr-2" />Quay lại danh sách</Button></Link>
      </div>
    );
  }

  const status = statusConfig[crossSale.status];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      <PageHeader title={`Cross-sale #${crossSale.id.slice(-6)}`} description={crossSale.leadName} action={<Link href="/cross-sale"><Button variant="ghost"><ArrowLeft className="w-4 h-4 mr-2" />Quay lại</Button></Link>} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Badge className={`${status.color} px-4 py-2 text-sm`}><StatusIcon className="w-4 h-4 mr-2" />{status.label}</Badge>
                {crossSale.coinAmount && <div className="flex items-center gap-2 text-lg font-semibold text-amber-600"><Coins className="w-5 h-5" />{crossSale.coinAmount} coin</div>}
              </div>
              <div className="flex items-center justify-center gap-4 py-8 bg-gray-50 dark:bg-slate-800 rounded-xl">
                <div className="text-center">
                  <Avatar name={crossSale.fromUserName} size="lg" />
                  <p className="font-medium mt-2">{crossSale.fromUserName}</p>
                  <p className="text-sm text-gray-500">Người gửi</p>
                </div>
                <div className="flex flex-col items-center">
                  <ArrowRight className="w-8 h-8 text-primary" />
                  <p className="text-sm text-gray-500 mt-1">{crossSale.commissionRate}%</p>
                </div>
                <div className="text-center">
                  <Avatar name={crossSale.toUserName} size="lg" />
                  <p className="font-medium mt-2">{crossSale.toUserName}</p>
                  <p className="text-sm text-gray-500">Người nhận</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {lead && (
            <Card>
              <CardHeader><CardTitle>Thông tin Lead</CardTitle></CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"><p className="text-sm text-gray-500">Công ty</p><p className="font-medium">{lead.company}</p></div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"><p className="text-sm text-gray-500">Người liên hệ</p><p className="font-medium">{lead.contact}</p></div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"><p className="text-sm text-gray-500">Giá trị</p><p className="font-medium text-green-600">{formatCurrency(lead.value)}</p></div>
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-lg"><p className="text-sm text-gray-500">Ngành nghề</p><p className="font-medium">{lead.industry || 'N/A'}</p></div>
                </div>
                <div className="mt-4"><Link href={`/crm/${lead.id}`}><Button variant="secondary" className="w-full">Xem chi tiết lead<ArrowRight className="w-4 h-4 ml-2" /></Button></Link></div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          {crossSale.status === 'pending' && (
            <Card>
              <CardHeader><CardTitle>Thao tác</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full bg-green-600 hover:bg-green-700"><CheckCircle className="w-4 h-4 mr-2" />Chấp nhận</Button>
                <Button variant="danger" className="w-full"><XCircle className="w-4 h-4 mr-2" />Từ chối</Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader><CardTitle>Chi tiết</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3"><Calendar className="w-5 h-5 text-gray-400" /><div><p className="text-sm text-gray-500">Ngày tạo</p><p className="font-medium">{formatDate(crossSale.createdAt)}</p></div></div>
              <div className="flex items-center gap-3"><User className="w-5 h-5 text-gray-400" /><div><p className="text-sm text-gray-500">Tỷ lệ hoa hồng</p><p className="font-medium">{crossSale.commissionRate}%</p></div></div>
              {crossSale.coinAmount && <div className="flex items-center gap-3"><Coins className="w-5 h-5 text-gray-400" /><div><p className="text-sm text-gray-500">Coin thưởng</p><p className="font-medium text-amber-600">{crossSale.coinAmount} coin</p></div></div>}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
