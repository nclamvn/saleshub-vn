import { create } from 'zustand';
import { Transaction } from '@/types';
import { transactions as mockTransactions } from '@/data/transactions';

interface WalletState {
  transactions: Transaction[];
  isLoading: boolean;
  loadTransactions: (userId: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'createdAt'>) => void;
}

export const useWalletStore = create<WalletState>((set, get) => ({
  transactions: [],
  isLoading: false,

  loadTransactions: (userId: string) => {
    set({ isLoading: true });
    setTimeout(() => {
      const userTransactions = mockTransactions.filter((t) => t.userId === userId).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      set({ transactions: userTransactions, isLoading: false });
    }, 300);
  },

  addTransaction: (transaction) => {
    const newTransaction: Transaction = { ...transaction, id: `txn_${Date.now()}`, createdAt: new Date().toISOString() };
    set((state) => ({ transactions: [newTransaction, ...state.transactions] }));
  },
}));
