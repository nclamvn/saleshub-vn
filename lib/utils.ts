import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

// Merge classnames with Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency VND
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(amount);
}

// Format number with commas
export function formatNumber(num: number): string {
  return new Intl.NumberFormat('vi-VN').format(num);
}

// Format coin
export function formatCoin(amount: number): string {
  return `${formatNumber(amount)} coin`;
}

// Format date
export function formatDate(date: string | Date): string {
  return format(new Date(date), 'dd/MM/yyyy', { locale: vi });
}

// Format datetime
export function formatDateTime(date: string | Date): string {
  return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: vi });
}

// Format relative time
export function formatRelativeTime(date: string | Date): string {
  return formatDistanceToNow(new Date(date), { addSuffix: true, locale: vi });
}

// Generate unique ID
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

// Truncate text
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
}

// Stage colors
export const stageColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  contacted: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
  qualified: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300',
  negotiation: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  closed_won: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  closed_lost: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300',
};

// Stage labels
export const stageLabels: Record<string, string> = {
  new: 'Mới',
  contacted: 'Đã liên hệ',
  qualified: 'Đủ điều kiện',
  negotiation: 'Đang đàm phán',
  closed_won: 'Thành công',
  closed_lost: 'Thất bại',
};

// Transaction type labels
export const transactionLabels: Record<string, string> = {
  earn_crosssale: 'Hoa hồng Cross-sale',
  earn_content: 'Thưởng nội dung',
  earn_reward: 'Thưởng hệ thống',
  earn_rating: 'Thưởng đánh giá',
  spend_content: 'Mua nội dung',
  spend_profile: 'Mở khóa hồ sơ',
  spend_unlock: 'Mở khóa',
};

// Role labels
export const roleLabels: Record<string, string> = {
  sales: 'Sales',
  recruiter: 'Recruiter',
  employee: 'Employee',
  admin: 'Admin',
};

// Role colors
export const roleColors: Record<string, string> = {
  sales: 'bg-blue-100 text-blue-800',
  recruiter: 'bg-purple-100 text-purple-800',
  employee: 'bg-green-100 text-green-800',
  admin: 'bg-red-100 text-red-800',
};
