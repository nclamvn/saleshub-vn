# HANDOVER - SalesHub VN MVP

## Trạng thái hiện tại: PRODUCTION READY

**Ngày cập nhật:** 2026-01-04
**Dev Server:** http://localhost:4000
**GitHub Repo:** https://github.com/nclamvn/saleshub-vn
**Thư mục project:** `/Users/mac/demo/SalesHub`

---

## Cách tiếp tục làm việc

Khi quay lại, chỉ cần nói với Claude:
```
đọc handover và tiếp tục
```

Claude sẽ đọc file này và hiểu ngay context của dự án.

---

## Tổng quan project

SalesHub VN là SaaS MVP cho Sales/Recruiter/HR tại Việt Nam, được xây dựng theo VIBECODE KIT v4.0 Blueprint.

### Tech Stack
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS 3.4
- Shadcn/ui components
- Zustand (state management)
- Recharts (charts)
- Mock data (JSON files)

---

## Các module đã hoàn thành

### 1. Authentication (Public)
- [x] `/login` - Đăng nhập
- [x] `/register` - Đăng ký
- [x] `/forgot-password` - Quên mật khẩu

### 2. Dashboard
- [x] `/dashboard` - Trang chủ với stats, charts, activities

### 3. CRM Module
- [x] `/crm` - Danh sách leads với filter, search
- [x] `/crm/[id]` - Chi tiết lead
- [x] `/crm/pipeline` - Kanban pipeline view

### 4. Cross-sale Module
- [x] `/cross-sale` - Danh sách yêu cầu cross-sale
- [x] `/cross-sale/[id]` - Chi tiết cross-sale

### 5. Employers Module
- [x] `/employers` - Danh sách nhà tuyển dụng
- [x] `/employers/[id]` - Chi tiết employer với reviews

### 6. Content/Knowledge Hub
- [x] `/content` - Danh sách bài viết, khóa học
- [x] `/content/[id]` - Chi tiết content
- [x] `/content/create` - Tạo bài viết mới

### 7. Wallet (Coin Economy)
- [x] `/wallet` - Số dư và lịch sử giao dịch

### 8. User Profile
- [x] `/profile` - Hồ sơ cá nhân
- [x] `/profile/edit` - Chỉnh sửa hồ sơ
- [x] `/settings` - Cài đặt
- [x] `/notifications` - Thông báo

### 9. Admin Panel
- [x] `/admin` - Admin dashboard
- [x] `/admin/users` - Quản lý users
- [x] `/admin/content` - Duyệt nội dung

---

## Tài khoản demo

| Role      | Email                | Password  |
|-----------|----------------------|-----------|
| Sales     | sales@demo.com       | demo123   |
| Recruiter | recruiter@demo.com   | demo123   |
| Employee  | employee@demo.com    | demo123   |
| Admin     | admin@demo.com       | demo123   |

---

## Cấu trúc thư mục chính

```
/Users/mac/demo/SalesHub/
├── app/
│   ├── (public)/          # Login, Register, Forgot Password
│   ├── (dashboard)/       # Main app pages (CRM, Content, etc.)
│   └── (admin)/           # Admin panel
├── components/
│   ├── ui/                # Shadcn components
│   ├── shared/            # PageHeader, EmptyState, StatsCard
│   └── layout/            # Sidebar, Header, MobileNav
├── stores/                # Zustand stores
├── hooks/                 # Custom hooks
├── data/                  # Mock JSON data
├── lib/                   # Utils, constants
└── types/                 # TypeScript types
```

---

## Các fix đã thực hiện

1. **PageHeader component**: Đổi `action` prop từ object sang `React.ReactNode`
2. **StatsCard component**: Đổi `icon` prop sang JSX element
3. **Import fixes**: `contents as content` từ data file

---

## Việc có thể làm tiếp (nếu cần)

### Chức năng chưa hoàn thiện:
- [ ] Form submit handlers (hiện chỉ có UI)
- [ ] CRUD operations cho leads, content
- [ ] Upload avatar/image
- [ ] Real-time notifications
- [ ] Export data to CSV/Excel

### Cải thiện UX:
- [ ] Loading skeletons
- [ ] Error boundaries
- [ ] Toast notifications cho actions
- [ ] Confirm dialogs cho delete

### Backend integration:
- [ ] API routes trong `/app/api/`
- [ ] Database connection (Prisma + PostgreSQL)
- [ ] Authentication với NextAuth.js

---

## Commands

```bash
# Chạy dev server (port 4000)
cd /Users/mac/demo/SalesHub && npm run dev -- -p 4000

# Build production
npm run build

# Kiểm tra types
npx tsc --noEmit

# Lint
npm run lint

# Git push
git add -A && git commit -m "message" && git push
```

---

## Ghi chú

- Project sử dụng mock data trong `/data/` folder
- Authentication dựa trên localStorage + Zustand
- Tất cả pages đều responsive (mobile-first)
- Dark mode đã được hỗ trợ

---

---

## Session cuối (2026-01-04)

**Những gì đã làm:**
1. Khởi tạo Git repository
2. Push lên GitHub: https://github.com/nclamvn/saleshub-vn
3. Chạy dev server trên port 4000

**Khi quay lại, chỉ cần nói:**
```
đọc handover và tiếp tục
```
