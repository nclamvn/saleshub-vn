'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Building2, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Card } from '@/components/ui/card';

const roleOptions = [
  { value: 'sales', label: 'Sales - Tôi là nhân viên Sales' },
  { value: 'recruiter', label: 'Recruiter - Tôi là HR/Recruiter' },
  { value: 'employee', label: 'Employee - Tôi muốn chia sẻ trải nghiệm' },
];

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    role: 'sales',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate registration
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Redirect to login
    router.push('/login?registered=true');
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-xl font-bold text-white">
              S
            </div>
            <span className="text-2xl font-bold text-gray-900">SalesHub VN</span>
          </Link>
        </div>

        <Card className="p-8">
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">Đăng ký tài khoản</h1>
            <p className="mt-2 text-gray-600">
              Tham gia cộng đồng Sales lớn nhất Việt Nam
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="name"
              label="Họ và tên"
              placeholder="Nguyễn Văn A"
              icon={<User className="h-4 w-4" />}
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              icon={<Mail className="h-4 w-4" />}
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              name="phone"
              type="tel"
              label="Số điện thoại"
              placeholder="0901234567"
              icon={<Phone className="h-4 w-4" />}
              value={formData.phone}
              onChange={handleChange}
            />

            <Input
              name="company"
              label="Công ty (tùy chọn)"
              placeholder="Tên công ty của bạn"
              icon={<Building2 className="h-4 w-4" />}
              value={formData.company}
              onChange={handleChange}
            />

            <Select
              name="role"
              label="Bạn là?"
              options={roleOptions}
              value={formData.role}
              onChange={handleChange}
            />

            <Input
              name="password"
              type="password"
              label="Mật khẩu"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              value={formData.password}
              onChange={handleChange}
              required
            />

            <Input
              name="confirmPassword"
              type="password"
              label="Xác nhận mật khẩu"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                className="mt-1 rounded border-gray-300"
                required
              />
              <label htmlFor="terms" className="text-sm text-gray-600">
                Tôi đồng ý với{' '}
                <Link href="#" className="text-primary hover:underline">
                  Điều khoản sử dụng
                </Link>{' '}
                và{' '}
                <Link href="#" className="text-primary hover:underline">
                  Chính sách bảo mật
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Đăng ký
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Đã có tài khoản?{' '}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Đăng nhập
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
