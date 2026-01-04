// ============================================
// USER & AUTH
// ============================================
export type UserRole = 'sales' | 'recruiter' | 'employee' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  wallet: number;
  phone?: string;
  bio?: string;
  company?: string;
  createdAt: string;
}

// ============================================
// LEAD & CRM
// ============================================
export type LeadStage = 'new' | 'contacted' | 'qualified' | 'negotiation' | 'closed_won' | 'closed_lost';

export interface LeadNote {
  id: string;
  content: string;
  createdAt: string;
}

export interface Lead {
  id: string;
  company: string;
  contact: string;
  phone: string;
  email: string;
  stage: LeadStage;
  value: number;
  ownerId: string;
  notes: LeadNote[];
  reminder?: string;
  source?: string;
  industry?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// CROSS-SALE
// ============================================
export type CrossSaleStatus = 'pending' | 'accepted' | 'rejected' | 'completed';

export interface CrossSale {
  id: string;
  leadId: string;
  leadName: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  commissionRate: number;
  status: CrossSaleStatus;
  coinAmount?: number;
  message?: string;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// EMPLOYER & RATING
// ============================================
export interface Review {
  id: string;
  userId: string;
  rating: number;
  pros: string;
  cons: string;
  comment: string;
  position?: string;
  isAnonymous: boolean;
  createdAt: string;
}

export interface Employer {
  id: string;
  name: string;
  industry: string;
  size: string;
  location: string;
  website?: string;
  logo?: string;
  description?: string;
  ratingAvg: number;
  ratingCount: number;
  reviews: Review[];
}

// ============================================
// CONTENT / KNOWLEDGE HUB
// ============================================
export type ContentType = 'article' | 'course';

export interface Content {
  id: string;
  title: string;
  type: ContentType;
  excerpt: string;
  body: string;
  coverImage?: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  priceCoin: number;
  votes: number;
  views: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// WALLET & TRANSACTIONS
// ============================================
export type TransactionType = 
  | 'earn_crosssale' 
  | 'earn_content' 
  | 'earn_reward' 
  | 'earn_rating'
  | 'spend_content' 
  | 'spend_profile'
  | 'spend_unlock';

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: TransactionType;
  description: string;
  relatedId?: string;
  createdAt: string;
}

// ============================================
// NOTIFICATIONS
// ============================================
export type NotificationType = 
  | 'system' 
  | 'reward' 
  | 'crosssale' 
  | 'content' 
  | 'reminder'
  | 'transaction';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

// ============================================
// DASHBOARD STATS
// ============================================
export interface DashboardStats {
  totalLeads: number;
  leadsThisMonth: number;
  conversionRate: number;
  totalCoin: number;
  coinEarnedThisMonth: number;
  pendingCrossSales: number;
  unreadNotifications: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  value2?: number;
}
