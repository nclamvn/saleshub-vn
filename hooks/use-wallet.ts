'use client';

import { useMemo } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { useWalletStore } from '@/stores/wallet-store';
import { TransactionType } from '@/types';

export function useWallet() {
  const { user, updateWallet } = useAuthStore();
  const { transactions, isLoading, addTransaction } = useWalletStore();

  const balance = user?.wallet || 0;

  const stats = useMemo(() => {
    if (!user) return { earnedThisMonth: 0, spentThisMonth: 0, transactionCount: 0 };
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const userTransactions = transactions.filter((t) => t.userId === user.id);
    const thisMonthTransactions = userTransactions.filter((t) => new Date(t.createdAt) >= startOfMonth);
    const earnedThisMonth = thisMonthTransactions.filter((t) => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const spentThisMonth = Math.abs(thisMonthTransactions.filter((t) => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    return { earnedThisMonth, spentThisMonth, transactionCount: userTransactions.length };
  }, [user, transactions]);

  const recentTransactions = useMemo(() => {
    if (!user) return [];
    return transactions.filter((t) => t.userId === user.id).slice(0, 10);
  }, [user, transactions]);

  const earnCoins = (amount: number, type: TransactionType, description: string, relatedId?: string) => {
    if (!user || amount <= 0) return;
    addTransaction({ userId: user.id, amount, type, description, relatedId });
    updateWallet(amount);
  };

  const spendCoins = (amount: number, type: TransactionType, description: string, relatedId?: string): boolean => {
    if (!user || amount <= 0 || balance < amount) return false;
    addTransaction({ userId: user.id, amount: -amount, type, description, relatedId });
    updateWallet(-amount);
    return true;
  };

  return { balance, transactions: recentTransactions, isLoading, stats, earnCoins, spendCoins, canAfford: (amount: number) => balance >= amount };
}
