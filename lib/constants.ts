// App info
export const APP_NAME = 'SalesHub VN';
export const APP_DESCRIPTION = 'Nền tảng SaaS hỗ trợ cộng đồng Sales tại Việt Nam';

// Navigation items
export const NAV_ITEMS = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: 'LayoutDashboard',
  },
  {
    title: 'CRM',
    href: '/crm',
    icon: 'Users',
    children: [
      { title: 'Danh sách Lead', href: '/crm' },
      { title: 'Pipeline', href: '/crm/pipeline' },
    ],
  },
  {
    title: 'Cross-sale',
    href: '/cross-sale',
    icon: 'Handshake',
  },
  {
    title: 'Nhà tuyển dụng',
    href: '/employers',
    icon: 'Building2',
  },
  {
    title: 'Kiến thức',
    href: '/content',
    icon: 'BookOpen',
  },
  {
    title: 'Ví coin',
    href: '/wallet',
    icon: 'Wallet',
  },
  {
    title: 'Thông báo',
    href: '/notifications',
    icon: 'Bell',
  },
];

export const BOTTOM_NAV_ITEMS = [
  {
    title: 'Cài đặt',
    href: '/settings',
    icon: 'Settings',
  },
  {
    title: 'Hồ sơ',
    href: '/profile',
    icon: 'User',
  },
];

export const ADMIN_NAV_ITEMS = [
  {
    title: 'Admin Dashboard',
    href: '/admin',
    icon: 'Shield',
  },
  {
    title: 'Quản lý Users',
    href: '/admin/users',
    icon: 'UserCog',
  },
  {
    title: 'Duyệt nội dung',
    href: '/admin/content',
    icon: 'FileCheck',
  },
];

// Lead stages
export const LEAD_STAGES = [
  { value: 'new', label: 'Mới', color: 'blue' },
  { value: 'contacted', label: 'Đã liên hệ', color: 'yellow' },
  { value: 'qualified', label: 'Đủ điều kiện', color: 'purple' },
  { value: 'negotiation', label: 'Đang đàm phán', color: 'orange' },
  { value: 'closed_won', label: 'Thành công', color: 'green' },
  { value: 'closed_lost', label: 'Thất bại', color: 'red' },
];

// Industries
export const INDUSTRIES = [
  'Công nghệ thông tin',
  'Tài chính - Ngân hàng',
  'Bất động sản',
  'Sản xuất',
  'Bán lẻ',
  'Y tế - Dược phẩm',
  'Giáo dục',
  'Logistics',
  'F&B',
  'Marketing',
  'Khác',
];

// Company sizes
export const COMPANY_SIZES = [
  '1-10 nhân viên',
  '11-50 nhân viên',
  '51-200 nhân viên',
  '201-500 nhân viên',
  '500+ nhân viên',
];

// Content types
export const CONTENT_TYPES = [
  { value: 'article', label: 'Bài viết' },
  { value: 'course', label: 'Khóa học' },
];

// Commission rates
export const COMMISSION_RATES = [
  { value: 0.05, label: '5%' },
  { value: 0.1, label: '10%' },
  { value: 0.15, label: '15%' },
  { value: 0.2, label: '20%' },
];
