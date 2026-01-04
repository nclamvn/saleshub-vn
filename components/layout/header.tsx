'use client';

import React from 'react';
import { Search, Bell, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth-store';
import { useNotificationStore } from '@/stores/notification-store';

interface HeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export function Header({ onMenuClick, title }: HeaderProps) {
  const { user } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [isDark, setIsDark] = React.useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-700 dark:bg-gray-900 lg:px-6">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        {title && (
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h1>
        )}
      </div>

      {/* Center - Search */}
      <div className="hidden max-w-md flex-1 px-4 md:block">
        <Input
          placeholder="Tìm kiếm..."
          icon={<Search className="h-4 w-4" />}
          className="w-full"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-2">
        {/* Theme Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {isDark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-danger text-xs text-white">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>

        {/* User */}
        {user && (
          <div className="flex items-center gap-3 pl-2">
            <div className="hidden text-right md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {user.name}
              </p>
              <p className="text-xs text-gray-500">{user.role}</p>
            </div>
            <Avatar name={user.name} />
          </div>
        )}
      </div>
    </header>
  );
}
