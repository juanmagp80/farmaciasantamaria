// src/app/layout.tsx
"use client"
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { ReactNode, useEffect } from 'react';
import Modal from 'react-modal';
import '../../src/app/globals.css';
import ContactHeader from './components/ContactHeader/ContactHeader';
import Footer from './components/Footer/Footer';
import GoogleReviewsWidget from './components/GoogleReviewsWidget/GoogleReviewsWidget';
import MainHeader from './components/MainHeader/MainHeader';


const inter = Inter({ subsets: ['latin'] });

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <ContactHeader />
          <MainHeader className="main-header-transparent" />
          {children}
          <GoogleReviewsWidget />
          <Footer />

        </body>
      </html>
    </SessionProvider>
  );
}