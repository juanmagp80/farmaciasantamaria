// src/app/layout.tsx
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import ClientWrapper from './components/ClientWrapper';
import ContactHeader from './components/ContactHeader/ContactHeader';
import Footer from './components/Footer/Footer';
import GoogleReviewsWidget from './components/GoogleReviewsWidget/GoogleReviewsWidget';
import MainHeader from './components/MainHeader/MainHeader';
import './globals.css';

export const metadata: Metadata = {
  title: 'Farmacia Santa María',
  description: 'Farmacia Santa María - Tu farmacia de confianza',
  icons: {
    icon: '/favicon.ico',
  },
};

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface LayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${poppins.className} antialiased bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen`}
        style={{
          margin: 0,
          padding: 0,
          minHeight: '100vh',
          backgroundColor: '#f8fafc',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <ClientWrapper>
          <div
            className="flex flex-col min-h-screen"
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '100vh'
            }}
          >
            <ContactHeader />
            <MainHeader className="main-header-transparent" />
            <main
              className="flex-grow"
              style={{
                flex: '1 1 0%'
              }}
            >
              {children}
            </main>
            <GoogleReviewsWidget />
            <Footer />
          </div>
        </ClientWrapper>
      </body>
    </html>
  );
}