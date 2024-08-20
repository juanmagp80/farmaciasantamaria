// src/app/layout.tsx
"use client";
import { SessionProvider } from 'next-auth/react';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import '../../styles/globals.css';
import ContactHeader from './components/ContactHeader/ContactHeader';
import Footer from './components/Footer/Footer';
import MainHeader from './components/MainHeader/MainHeader';


const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <ContactHeader />
        <MainHeader />
        <SessionProvider>{children}</SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
