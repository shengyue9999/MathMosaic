import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '数绘 · ShuHui',
  description: '把小学数学，拼成一本会发光的绘本',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
