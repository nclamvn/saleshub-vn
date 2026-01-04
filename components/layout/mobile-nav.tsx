'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, Users, Handshake, Building2, BookOpen, Wallet, Bell, Settings, User, LogOut, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/auth-store';
import { useNotificationStore } from '@/stores/notification-store';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'CRM', href: '/crm' },
  { icon: Handshake, label: 'Cross-sale', href: '/cross-sale' },
  { icon: Building2, label: 'Employers', href: '/employers' },
  { icon: BookOpen, label: 'Content', href: '/content' },
  { icon: Wallet, label: 'Wallet', href: '/wallet' },
  { icon: Bell, label: 'Notifications', href: '/notifications' },
  { icon: Settings, label: 'Settings', href: '/settings' },
  { icon: User, label: 'Profile', href: '/profile' },
];

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();

  return (
    <>
      <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsOpen(true)}><Menu className="w-6 h-6" /></Button>

      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} />}

      <div className={cn('fixed top-0 left-0 h-full w-72 bg-white dark:bg-slate-900 z-50 transform transition-transform lg:hidden', isOpen ? 'translate-x-0' : '-translate-x-full')}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><span className="text-white font-bold text-sm">SH</span></div>
            <span className="font-bold text-lg">SalesHub</span>
          </Link>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}><X className="w-5 h-5" /></Button>
        </div>

        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-3">
              <Avatar name={user.name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{user.name}</p>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge className="bg-amber-100 text-amber-800">{user.wallet} coin</Badge>
              <Badge variant="secondary">{user.role}</Badge>
            </div>
          </div>
        )}

        <nav className="p-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className={cn('flex items-center gap-3 px-4 py-3 rounded-lg transition-colors', isActive ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800')}>
                <item.icon className="w-5 h-5" />
                <span className="flex-1">{item.label}</span>
                {item.href === '/notifications' && unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs">{unreadCount}</Badge>}
              </Link>
            );
          })}
          {user?.role === 'admin' && (
            <>
              <div className="h-px bg-gray-200 dark:bg-gray-700 my-2" />
              <Link href="/admin" onClick={() => setIsOpen(false)} className={cn('flex items-center gap-3 px-4 py-3 rounded-lg transition-colors', pathname.startsWith('/admin') ? 'bg-primary/10 text-primary' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800')}>
                <Shield className="w-5 h-5" /><span>Admin</span>
              </Link>
            </>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => { logout(); setIsOpen(false); }}>
            <LogOut className="w-5 h-5 mr-3" />Đăng xuất
          </Button>
        </div>
      </div>
    </>
  );
}
