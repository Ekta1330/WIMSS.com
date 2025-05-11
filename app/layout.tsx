import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { MainLayout } from '@/components/layout/main-layout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BizDash - Business Management Dashboard',
  description: 'A comprehensive business management dashboard',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}