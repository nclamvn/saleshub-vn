import { create } from 'zustand';
import { Notification } from '@/types';
import { notifications as mockNotifications } from '@/data/notifications';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  loadNotifications: (userId: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,

  loadNotifications: (userId: string) => {
    const userNotifications = mockNotifications
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    
    const unread = userNotifications.filter((n) => !n.isRead).length;
    
    set({
      notifications: userNotifications,
      unreadCount: unread,
    });
  },

  markAsRead: (id: string) => {
    const notifications = get().notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    );
    const unreadCount = notifications.filter((n) => !n.isRead).length;
    
    set({ notifications, unreadCount });
  },

  markAllAsRead: () => {
    const notifications = get().notifications.map((n) => ({
      ...n,
      isRead: true,
    }));
    
    set({ notifications, unreadCount: 0 });
  },

  addNotification: (notification) => {
    const newNotification: Notification = {
      ...notification,
      id: `noti_${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      notifications: [newNotification, ...state.notifications],
      unreadCount: state.unreadCount + (notification.isRead ? 0 : 1),
    }));
  },
}));
