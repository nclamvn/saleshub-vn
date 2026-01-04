'use client';

import React from 'react';
import { Bell, Lock, User, Moon, Sun } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageHeader } from '@/components/shared/page-header';
import { useAuthStore } from '@/stores/auth-store';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div>
      <PageHeader
        title="Cài đặt"
        description="Quản lý tài khoản và preferences"
      />

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {isDark ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              Giao diện
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Chế độ tối</p>
                <p className="text-sm text-gray-500">Bật/tắt giao diện dark mode</p>
              </div>
              <Button
                variant="outline"
                onClick={toggleTheme}
                className="gap-2"
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Thông báo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: 'Email thông báo', desc: 'Nhận thông báo qua email' },
              { label: 'Cross-sale', desc: 'Thông báo khi có yêu cầu cross-sale mới' },
              { label: 'Nội dung', desc: 'Thông báo khi có bài viết mới từ người bạn follow' },
              { label: 'Giao dịch', desc: 'Thông báo khi có giao dịch coin' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex cursor-pointer items-center">
                  <input type="checkbox" defaultChecked className="peer sr-only" />
                  <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none dark:bg-gray-700"></div>
                </label>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Bảo mật
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="mb-3 font-medium text-gray-900 dark:text-white">Đổi mật khẩu</p>
              <div className="space-y-3">
                <Input type="password" placeholder="Mật khẩu hiện tại" />
                <Input type="password" placeholder="Mật khẩu mới" />
                <Input type="password" placeholder="Xác nhận mật khẩu mới" />
              </div>
              <Button className="mt-4">Cập nhật mật khẩu</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="text-red-600">Vùng nguy hiểm</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Xóa tài khoản</p>
                <p className="text-sm text-gray-500">
                  Xóa vĩnh viễn tài khoản và tất cả dữ liệu
                </p>
              </div>
              <Button variant="danger">Xóa tài khoản</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
