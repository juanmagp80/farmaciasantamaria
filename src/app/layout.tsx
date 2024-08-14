// src/app/layout.tsx
"use client";
import { NextUIProvider } from '@nextui-org/react';
import { SessionProvider } from "next-auth/react";
import { Inter } from 'next/font/google';
import React from 'react';
import ContactHeader from './components/ContactHeader/ContactHeader';
import MainHeader from './components/MainHeader/MainHeader';
import './globals.css';


const inter = Inter({ subsets: ['latin'] });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <NextUIProvider>
          <ContactHeader />
          <MainHeader />
          <SessionProvider>{children}</SessionProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
