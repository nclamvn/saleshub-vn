import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types';
import { users } from '@/data/users';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
  updateWallet: (amount: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        // Find user by email (demo: password = demo123)
        const foundUser = users.find(
          (u) => u.email === email && password === 'demo123'
        );

        if (foundUser) {
          set({
            user: foundUser,
            isAuthenticated: true,
            isLoading: false,
          });
          return true;
        }

        set({ isLoading: false });
        return false;
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },

      updateUser: (data: Partial<User>) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...data },
          });
        }
      },

      updateWallet: (amount: number) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: {
              ...currentUser,
              wallet: currentUser.wallet + amount,
            },
          });
        }
      },
    }),
    {
      name: 'saleshub-auth',
    }
  )
);
