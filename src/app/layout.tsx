// src/app/layout.tsx
"use client"
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import '../../src/app/globals.css';
import ContactHeader from './components/ContactHeader/ContactHeader';
import Footer from './components/Footer/Footer';
import MainHeader from './components/MainHeader/MainHeader';

const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <ContactHeader />
          <MainHeader className="main-header-solid" />
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
