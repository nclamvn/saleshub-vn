'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Sidebar } from '@/components/layout/sidebar';
import { Header } from '@/components/layout/header';
import { useAuthStore } from '@/stores/auth-store';
import { useNotificationStore } from '@/stores/notification-store';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { loadNotifications } = useNotificationStore();
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else if (user) {
      loadNotifications(user.id);
    }
  }, [isAuthenticated, user, router, loadNotifications]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Sidebar - Desktop */}
      <div className="hidden lg:block">
        <Sidebar collapsed={sidebarCollapsed} />
      </div>

      {/* Sidebar - Mobile */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-64">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`${sidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'} transition-all`}>
        <Header onMenuClick={() => setMobileMenuOpen(true)} />
        <main className="p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
