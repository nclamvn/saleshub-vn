'use client';

import Link from 'next/link';
import {
  Users,
  TrendingUp,
  Building2,
  BookOpen,
  Coins,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

const features = [
  {
    icon: Users,
    title: 'CRM Cá nhân',
    description: 'Quản lý leads, pipeline và theo dõi tiến độ bán hàng của bạn',
  },
  {
    icon: TrendingUp,
    title: 'Cross-sale',
    description: 'Chia sẻ leads và nhận hoa hồng từ cộng đồng Sales',
  },
  {
    icon: Building2,
    title: 'Employer Database',
    description: 'Đánh giá và tìm hiểu về các nhà tuyển dụng uy tín',
  },
  {
    icon: BookOpen,
    title: 'Knowledge Hub',
    description: 'Học hỏi và chia sẻ kiến thức bán hàng với cộng đồng',
  },
  {
    icon: Coins,
    title: 'Coin Economy',
    description: 'Kiếm và sử dụng coin để mở khóa nội dung premium',
  },
];

const stats = [
  { value: '10,000+', label: 'Sales đang hoạt động' },
  { value: '50,000+', label: 'Leads được tạo' },
  { value: '₫5B+', label: 'Giá trị deal' },
  { value: '1,000+', label: 'Doanh nghiệp' },
];

const testimonials = [
  {
    name: 'Nguyễn Văn A',
    role: 'Senior Sales Manager',
    company: 'FPT Software',
    content: 'SalesHub giúp tôi quản lý pipeline hiệu quả hơn 50%. Cross-sale feature là game changer!',
    avatar: 'NV',
  },
  {
    name: 'Trần Thị B',
    role: 'Business Development',
    company: 'VNG Corporation',
    content: 'Cộng đồng Sales ở đây rất chất lượng. Tôi đã học được rất nhiều từ các bài viết.',
    avatar: 'TT',
  },
  {
    name: 'Lê Văn C',
    role: 'Account Executive',
    company: 'Momo',
    content: 'Coin system khuyến khích tôi chia sẻ nhiều hơn. Win-win cho cả community!',
    avatar: 'LV',
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white">
            S
          </div>
          <span className="text-xl font-bold text-gray-900">SalesHub VN</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost">Đăng nhập</Button>
          </Link>
          <Link href="/register">
            <Button>Đăng ký miễn phí</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mx-auto max-w-4xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
          Nền tảng <span className="text-primary">SaaS</span> dành cho
          <br />
          cộng đồng <span className="text-primary">Sales</span> Việt Nam
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
          CRM cá nhân, Cross-sale, Knowledge Hub và Coin Economy - Tất cả trong một nền tảng giúp bạn bán hàng hiệu quả hơn.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="gap-2">
              Bắt đầu miễn phí
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="outline">
              Xem Demo
            </Button>
          </Link>
        </div>

        {/* Demo Credentials */}
        <div className="mx-auto mt-8 max-w-md rounded-lg bg-white/50 p-4 backdrop-blur">
          <p className="mb-2 text-sm font-medium text-gray-700">Demo Accounts:</p>
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
            <div>sales@demo.com</div>
            <div>recruiter@demo.com</div>
            <div>employee@demo.com</div>
            <div>admin@demo.com</div>
          </div>
          <p className="mt-2 text-xs text-gray-500">Password: demo123</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-gray-200 bg-white py-12">
        <div className="container mx-auto grid grid-cols-2 gap-8 px-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Tính năng nổi bật
          </h2>
          <p className="mt-4 text-gray-600">
            Mọi thứ bạn cần để trở thành Sales xuất sắc
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} hover className="p-6">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-20 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Cách hoạt động
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                step: '1',
                title: 'Đăng ký tài khoản',
                desc: 'Tạo tài khoản miễn phí trong 30 giây',
              },
              {
                step: '2',
                title: 'Thêm leads & bắt đầu bán',
                desc: 'Quản lý pipeline và theo dõi tiến độ',
              },
              {
                step: '3',
                title: 'Kiếm coin & mở rộng',
                desc: 'Cross-sale, chia sẻ kiến thức để kiếm coin',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Người dùng nói gì?
          </h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="p-6">
              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-4 w-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="mb-4 text-gray-600">&ldquo;{item.content}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-medium text-primary">
                  {item.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.role} @ {item.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white">
            Sẵn sàng nâng cấp sự nghiệp Sales?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Tham gia cùng hàng ngàn Sales đang sử dụng SalesHub VN để bán hàng hiệu quả hơn.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-gray-100">
                Đăng ký ngay - Miễn phí
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-bold text-white">
                S
              </div>
              <span className="font-bold text-gray-900">SalesHub VN</span>
            </div>
            <p className="text-sm text-gray-500">
              © 2025 SalesHub VN. Made with ❤️ for Vietnam Sales Community.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
