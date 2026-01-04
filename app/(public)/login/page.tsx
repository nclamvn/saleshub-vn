'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/stores/auth-store';
import { demoCredentials } from '@/data/users';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading } = useAuthStore();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = await login(email, password);
    if (success) {
      router.push('/dashboard');
    } else {
      setError('Email hoặc mật khẩu không đúng');
    }
  };

  const handleDemoLogin = async (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demo123');
    const success = await login(demoEmail, 'demo123');
    if (success) {
      router.push('/dashboard');
    }
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
            <h1 className="text-2xl font-bold text-gray-900">Đăng nhập</h1>
            <p className="mt-2 text-gray-600">
              Chào mừng bạn quay trở lại!
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="you@example.com"
              icon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Mật khẩu"
              placeholder="••••••••"
              icon={<Lock className="h-4 w-4" />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-gray-300" />
                <span className="text-sm text-gray-600">Ghi nhớ đăng nhập</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm text-primary hover:underline"
              >
                Quên mật khẩu?
              </Link>
            </div>

            <Button type="submit" className="w-full" isLoading={isLoading}>
              Đăng nhập
            </Button>
          </form>

          {/* Demo Accounts */}
          <div className="mt-6 border-t border-gray-200 pt-6">
            <p className="mb-3 text-center text-sm text-gray-500">
              Đăng nhập nhanh với tài khoản demo:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {demoCredentials.map((cred) => (
                <Button
                  key={cred.email}
                  variant="outline"
                  size="sm"
                  onClick={() => handleDemoLogin(cred.email)}
                  className="text-xs"
                >
                  {cred.role}
                </Button>
              ))}
            </div>
          </div>

          {/* Register Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Đăng ký ngay
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
