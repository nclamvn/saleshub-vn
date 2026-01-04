# SalesHub VN - MVP

Nền tảng SaaS hỗ trợ cộng đồng Sales tại Việt Nam.

## 🚀 Tính năng

- **CRM & Lead Management**: Quản lý leads, pipeline kanban
- **Cross-sale**: Hợp tác với đồng nghiệp, chia sẻ hoa hồng
- **Employer Database**: Đánh giá công ty, tìm hiểu nhà tuyển dụng
- **Knowledge Hub**: Bài viết, khóa học về Sales
- **Coin Economy**: Kiếm và sử dụng coin trong hệ thống
- **Notifications**: Thông báo real-time

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **State**: Zustand
- **Charts**: Recharts
- **Icons**: Lucide React

## 📦 Cài đặt

```bash
# Clone project
cd saleshub-vn

# Cài dependencies
npm install

# Chạy development server
npm run dev

# Mở http://localhost:3000
```

## 🔑 Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Sales | sales@demo.com | demo123 |
| Recruiter | recruiter@demo.com | demo123 |
| Employee | employee@demo.com | demo123 |
| Admin | admin@demo.com | demo123 |

## 📁 Cấu trúc

```
saleshub-vn/
├── app/                  # Next.js App Router
│   ├── (public)/         # Public pages (landing, login, register)
│   ├── (dashboard)/      # Protected dashboard pages
│   └── (admin)/          # Admin pages
├── components/           # React components
│   ├── ui/               # Base UI components
│   ├── layout/           # Layout components
│   └── shared/           # Shared components
├── data/                 # Mock data
├── lib/                  # Utilities
├── stores/               # Zustand stores
└── types/                # TypeScript types
```

## 🎨 Design System

- **Colors**: Blue primary (#2563EB), Orange accent (#F97316)
- **Fonts**: Plus Jakarta Sans (headings), Inter (body)
- **Style**: Notion-inspired, clean, card-based

## 📱 Pages

### Public
- `/` - Landing page
- `/login` - Đăng nhập
- `/register` - Đăng ký

### Dashboard
- `/dashboard` - Tổng quan
- `/crm` - Danh sách leads
- `/crm/pipeline` - Pipeline kanban
- `/cross-sale` - Cross-sale requests
- `/employers` - Nhà tuyển dụng
- `/content` - Knowledge hub
- `/wallet` - Ví coin
- `/notifications` - Thông báo
- `/profile` - Hồ sơ cá nhân
- `/settings` - Cài đặt

## 🔮 Roadmap

- [ ] Real backend với MongoDB
- [ ] Real authentication (NextAuth)
- [ ] Real-time notifications (WebSocket)
- [ ] Payment integration
- [ ] AI features
- [ ] Mobile app

---

Made with ❤️ for Vietnam Sales Community
