import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';
import DialogProvider from '@/components/providers/dialog-providers';
import ReactQueryProvider from '@/components/providers/react-query-provider';
import SiteNavbar from '@/components/navbar/site-navbar';
import { Toaster } from 'sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'ExyUpdate News Blog',
  description: 'Get the latest news all over the world'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <SiteNavbar />
          <DialogProvider />
          <main>{children}</main>
          <Toaster richColors closeButton />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
