'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Handshake,
  Building2,
  BookOpen,
  Wallet,
  Bell,
  Settings,
  User,
  Shield,
  UserCog,
  FileCheck,
  ChevronDown,
  LogOut,
  Coins,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNotificationStore } from '@/stores/notification-store';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  Users,
  Handshake,
  Building2,
  BookOpen,
  Wallet,
  Bell,
  Settings,
  User,
  Shield,
  UserCog,
  FileCheck,
};

const NAV_ITEMS = [
  { title: 'Dashboard', href: '/dashboard', icon: 'LayoutDashboard' },
  {
    title: 'CRM',
    href: '/crm',
    icon: 'Users',
    children: [
      { title: 'Danh sách Lead', href: '/crm' },
      { title: 'Pipeline', href: '/crm/pipeline' },
    ],
  },
  { title: 'Cross-sale', href: '/cross-sale', icon: 'Handshake' },
  { title: 'Nhà tuyển dụng', href: '/employers', icon: 'Building2' },
  { title: 'Kiến thức', href: '/content', icon: 'BookOpen' },
  { title: 'Ví coin', href: '/wallet', icon: 'Wallet' },
  { title: 'Thông báo', href: '/notifications', icon: 'Bell' },
];

const BOTTOM_NAV_ITEMS = [
  { title: 'Cài đặt', href: '/settings', icon: 'Settings' },
  { title: 'Hồ sơ', href: '/profile', icon: 'User' },
];

const ADMIN_NAV_ITEMS = [
  { title: 'Admin', href: '/admin', icon: 'Shield' },
  { title: 'Quản lý Users', href: '/admin/users', icon: 'UserCog' },
  { title: 'Duyệt nội dung', href: '/admin/content', icon: 'FileCheck' },
];

interface SidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuthStore();
  const { unreadCount } = useNotificationStore();
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === '/crm') {
      return pathname === '/crm' || pathname.startsWith('/crm/');
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  const NavItem = ({
    item,
    isBottom = false,
  }: {
    item: (typeof NAV_ITEMS)[0];
    isBottom?: boolean;
  }) => {
    const Icon = iconMap[item.icon];
    const active = isActive(item.href);
    const hasChildren = 'children' in item && item.children;
    const isExpanded = expandedItem === item.title;

    const handleClick = () => {
      if (hasChildren) {
        setExpandedItem(isExpanded ? null : item.title);
      }
    };

    return (
      <div>
        <Link
          href={hasChildren ? '#' : item.href}
          onClick={hasChildren ? handleClick : undefined}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
            active
              ? 'bg-primary/10 text-primary'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white'
          )}
        >
          {Icon && <Icon className="h-5 w-5 shrink-0" />}
          {!collapsed && (
            <>
              <span className="flex-1">{item.title}</span>
              {item.title === 'Thông báo' && unreadCount > 0 && (
                <Badge variant="danger" className="h-5 min-w-5 justify-center">
                  {unreadCount}
                </Badge>
              )}
              {hasChildren && (
                <ChevronDown
                  className={cn(
                    'h-4 w-4 transition-transform',
                    isExpanded && 'rotate-180'
                  )}
                />
              )}
            </>
          )}
        </Link>

        {/* Children */}
        {hasChildren && isExpanded && !collapsed && (
          <div className="ml-8 mt-1 space-y-1">
            {item.children?.map((child) => (
              <Link
                key={child.href}
                href={child.href}
                className={cn(
                  'block rounded-lg px-3 py-1.5 text-sm transition-colors',
                  pathname === child.href
                    ? 'text-primary'
                    : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                )}
              >
                {child.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all dark:border-gray-700 dark:bg-gray-900',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-4 dark:border-gray-700">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-white font-bold">
          S
        </div>
        {!collapsed && (
          <span className="font-heading text-lg font-bold text-gray-900 dark:text-white">
            SalesHub VN
          </span>
        )}
      </div>

      {/* User Info */}
      {user && (
        <div className={cn('border-b border-gray-200 p-4 dark:border-gray-700', collapsed && 'px-2')}>
          <div className={cn('flex items-center gap-3', collapsed && 'justify-center')}>
            <Avatar name={user.name} size="md" />
            {!collapsed && (
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Coins className="h-3 w-3 text-accent" />
                  <span>{user.wallet} coin</span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}

        {/* Admin Section */}
        {user?.role === 'admin' && (
          <>
            <div className="my-4 border-t border-gray-200 dark:border-gray-700" />
            {!collapsed && (
              <p className="mb-2 px-3 text-xs font-semibold uppercase text-gray-400">
                Admin
              </p>
            )}
            {ADMIN_NAV_ITEMS.map((item) => (
              <NavItem key={item.href} item={item} />
            ))}
          </>
        )}
      </nav>

      {/* Bottom Navigation */}
      <div className="border-t border-gray-200 p-3 dark:border-gray-700">
        {BOTTOM_NAV_ITEMS.map((item) => (
          <NavItem key={item.href} item={item} isBottom />
        ))}
        <button
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span>Đăng xuất</span>}
        </button>
      </div>
    </aside>
  );
}
