'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
import { useNotificationStore } from '@/stores/notification-store';
import { useWalletStore } from '@/stores/wallet-store';

export function useAuth(requireAuth = true) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, login, logout, updateUser, updateWallet } = useAuthStore();
  const { loadNotifications } = useNotificationStore();
  const { loadTransactions } = useWalletStore();

  useEffect(() => {
    if (!isLoading && requireAuth && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, requireAuth, router]);

  useEffect(() => {
    if (user) {
      loadNotifications(user.id);
      loadTransactions(user.id);
    }
  }, [user, loadNotifications, loadTransactions]);

  const handleLogin = async (email: string, password: string): Promise<boolean> => {
    const success = await login(email, password);
    if (success) router.push('/dashboard');
    return success;
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return { user, isAuthenticated, isLoading, login: handleLogin, logout: handleLogout, updateUser, updateWallet };
}
