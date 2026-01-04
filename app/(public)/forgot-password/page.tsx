'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitted(true);
    setIsLoading(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Kiểm tra email của bạn
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Chúng tôi đã gửi hướng dẫn đặt lại mật khẩu đến <strong>{email}</strong>
              </p>
              <Link href="/login">
                <Button className="w-full">Quay lại đăng nhập</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary mb-4">
            <ArrowLeft className="w-4 h-4" />
            Quay lại đăng nhập
          </Link>
          <CardTitle className="text-2xl">Quên mật khẩu?</CardTitle>
          <CardDescription>Nhập email của bạn và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input id="email" type="email" placeholder="name@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Đang gửi...' : 'Gửi hướng dẫn'}
            </Button>
          </form>
          <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Nhớ mật khẩu?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">Đăng nhập</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
