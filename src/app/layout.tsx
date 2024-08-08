// src/app/layout.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { Inter, Montserrat } from 'next/font/google';
import React from 'react';
import ContactHeader from './components/ContactHeader/ContactHeader';
import MainHeader from './components/MainHeader/MainHeader';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'], weight: ['400', '700'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} ${inter.className}`}>
        <ContactHeader />
        <MainHeader />
        <SessionProvider>{children}</SessionProvider>      </body>
    </html>
  );
}
