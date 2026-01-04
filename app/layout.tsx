import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SalesHub VN - Nền tảng hỗ trợ Sales Việt Nam',
  description: 'CRM, Cross-sale, Knowledge Hub và Coin Economy cho cộng đồng Sales tại Việt Nam',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
